'use client';

import { useEffect, useState } from 'react';
import { useSession } from '@/lib/auth-client';
import { getPostComments, createComment } from '@/lib/api';
import CommentItem from './CommentItem';

export default function CommentSection({ postId }) {
  const { data: session } = useSession();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    getPostComments(postId).then(setComments);
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
    } catch (err) {
      alert(err.message || 'Failed to post comment.');
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

  return (
    <div className="mt-10">
      <h2 className="font-serif text-xl font-semibold text-text">
        Comments ({comments.filter(c => !c.isDeleted).length})
      </h2>

      {session ? (
        <div className="mt-4 flex gap-2">
          <input
            type="text"
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 rounded-md border border-border px-3 py-2 text-sm focus:outline-none"
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

      <div className="mt-4 divide-y divide-border">
        {topLevel.map(comment => (
          <CommentItem
            key={comment._id}
            comment={comment}
            replies={repliesFor(comment._id)}
            onReply={handleReply}
            onDeleted={handleDeleted}
          />
        ))}
      </div>
    </div>
  );
}
