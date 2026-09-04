'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useSession } from '@/lib/auth-client';
import { getPostComments, createComment } from '@/lib/api';
import CommentItem from './CommentItem';
import Skeleton from '@/components/shared/Skeleton';

export default function CommentSection({ postId }) {
  const { data: session } = useSession();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [posting, setPosting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPostComments(postId)
      .then(setComments)
      .finally(() => setLoading(false));
  }, [postId]);

  const topLevel = comments.filter(c => !c.parentCommentId);
  const repliesFor = commentId =>
    comments.filter(c => c.parentCommentId === commentId);

  const handleSubmit = async () => {
    if (!newComment.trim()) return;
    setPosting(true);
    try {
      const created = await createComment(postId, newComment, null);
      setComments(prev => [...prev, created]);
      setNewComment('');
      toast.success('Comment posted.');
    } catch (err) {
      toast.error(err.message || 'Failed to post comment.');
    } finally {
      setPosting(false);
    }
  };

  const handleReply = async (content, parentCommentId) => {
    const created = await createComment(postId, content, parentCommentId);
    setComments(prev => [...prev, created]);
  };

  const handleDeleted = commentId => {
    setComments(prev =>
      prev.map(c =>
        c._id === commentId ? { ...c, isDeleted: true, content: '' } : c,
      ),
    );
  };

  const handleEdited = (commentId, newContent) => {
    setComments(prev =>
      prev.map(c =>
        c._id === commentId ? { ...c, content: newContent, isEdited: true } : c,
      ),
    );
  };

  return (
    <div className="mt-10">
      <h2 className="font-serif text-xl font-semibold text-text">
        {loading
          ? 'Comments'
          : `Comments (${comments.filter(c => !c.isDeleted).length})`}
      </h2>

      {session ? (
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <input
            type="text"
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 rounded-md border border-border px-3 py-2 text-sm focus:border-accent focus:outline-none"
          />
          <button
            onClick={handleSubmit}
            disabled={posting}
            className="rounded-md bg-text px-4 py-2 text-sm text-bg hover:bg-accent disabled:opacity-50"
          >
            Post
          </button>
        </div>
      ) : (
        <p className="mt-4 text-sm text-text-muted">
          Sign in to leave a comment.
        </p>
      )}

      <div className="mt-4">
        {loading ? (
          <div className="space-y-4 divide-y divide-border">
            {[1, 2].map(i => (
              <div key={i} className="py-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="mt-2 h-4 w-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="divide-y divide-border">
            {topLevel.map(comment => (
              <CommentItem
                key={comment._id}
                comment={comment}
                replies={repliesFor(comment._id)}
                onReply={handleReply}
                onDeleted={handleDeleted}
                onEdited={handleEdited}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
