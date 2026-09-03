'use client';

import { useEffect, useState } from 'react';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { toast } from 'sonner';
import { useSession } from '@/lib/auth-client';
import { toggleReaction, getPostReactions, getPostComments } from '@/lib/api';

export default function ReactionBar({ postId }) {
  const { data: session } = useSession();
  const [counts, setCounts] = useState({});
  const [userReaction, setUserReaction] = useState(null);
  const [commentCount, setCommentCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPostReactions(postId).then(data => {
      setCounts(data.counts);
      setUserReaction(data.userReaction);
    });
    getPostComments(postId).then(data => {
      setCommentCount(data.filter(c => !c.isDeleted).length);
    });
  }, [postId]);

  const totalLikes = Object.values(counts).reduce((sum, n) => sum + n, 0);

  const handleShare = async () => {
    if (typeof window === 'undefined' || typeof navigator === 'undefined')
      return;

    const shareData = {
      title: document.title,
      url: window.location.href,
    };

    if (window.navigator && window.navigator.share) {
      try {
        await window.navigator.share(shareData);
      } catch (err) {
        if (err.name !== 'AbortError') {
          toast.error('Failed to share.');
        }
      }
    } else if (window.navigator && window.navigator.clipboard) {
      window.navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const handleLike = async () => {
    if (!session) {
      toast.error('Please sign in to like this post.');
      return;
    }

    setLoading(true);
    const prevReaction = userReaction;
    const wasLiked = prevReaction === 'like';

    setUserReaction(wasLiked ? null : 'like');
    setCounts(prev => ({
      ...prev,
      like: (prev.like || 0) + (wasLiked ? -1 : 1),
    }));

    try {
      await toggleReaction(postId, 'like');
    } catch (err) {
      console.error('Reaction error:', err);
      setUserReaction(prevReaction);
      setCounts(prev => ({
        ...prev,
        like: (prev.like || 0) + (wasLiked ? 1 : -1),
      }));
      toast.error(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-6 border-y border-border py-4">
      <button
        onClick={handleLike}
        disabled={loading}
        className={`flex items-center gap-2 text-sm ${
          userReaction === 'like'
            ? 'text-accent'
            : 'text-text-muted hover:text-text'
        }`}
      >
        <Heart
          size={20}
          fill={userReaction === 'like' ? 'currentColor' : 'none'}
        />
        {totalLikes > 0 && totalLikes}
      </button>

      <div className="flex items-center gap-2 text-sm text-text-muted">
        <MessageCircle size={20} />
        {commentCount > 0 && commentCount}
      </div>

      <button
        onClick={handleShare}
        className="flex items-center gap-2 text-sm text-text-muted hover:text-text"
      >
        <Share2 size={20} />
      </button>
    </div>
  );
}
