'use client';

import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useSession } from '@/lib/auth-client';
import { deleteComment } from '@/lib/api';

export default function CommentItem({ comment, replies, onReply, onDeleted }) {
  const { data: session } = useSession();
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [deleting, setDeleting] = useState(false);

  const isOwner = session?.user?.id === comment.authorId;
  const isAdmin = session?.user?.role === 'admin';
  const canDelete = isOwner || isAdmin;

  const handleDelete = async id => {
    if (!confirm('Delete this comment?')) return;
    setDeleting(true);
    try {
      await deleteComment(id);
      onDeleted(id);
    } catch (err) {
      alert(err.message);
    } finally {
      setDeleting(false);
    }
  };

  const handleReplySubmit = async () => {
    if (!replyText.trim()) return;
    await onReply(replyText, comment._id);
    setReplyText('');
    setShowReplyBox(false);
  };

  return (
    <div className="py-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-text">
            {comment.authorName || 'Unknown'}
          </p>
          <p className="mt-1 text-sm text-text-muted">
            {comment.isDeleted ? (
              <span className="italic">This comment was deleted.</span>
            ) : (
              comment.content
            )}
          </p>
        </div>

        {!comment.isDeleted && canDelete && (
          <button
            onClick={() => handleDelete(comment._id)}
            disabled={deleting}
            className="text-text-muted hover:text-destructive"
          >
            <Trash2 size={14} />
          </button>
        )}
      </div>

      {!comment.isDeleted && session && (
        <button
          onClick={() => setShowReplyBox(prev => !prev)}
          className="mt-1 text-xs text-text-muted hover:text-text"
        >
          Reply
        </button>
      )}

      {showReplyBox && (
        <div className="mt-2 flex gap-2">
          <input
            type="text"
            value={replyText}
            onChange={e => setReplyText(e.target.value)}
            placeholder="Write a reply..."
            className="flex-1 rounded-md border border-border px-3 py-1.5 text-sm focus:outline-none"
          />
          <button
            onClick={handleReplySubmit}
            className="rounded-md bg-text px-3 py-1.5 text-xs text-bg hover:bg-accent"
          >
            Post
          </button>
        </div>
      )}

      {replies.length > 0 && (
        <div className="ml-6 mt-3 space-y-3 border-l border-border pl-4">
          {replies.map(reply => {
            const canDeleteReply =
              session?.user?.id === reply.authorId ||
              session?.user?.role === 'admin';

            return (
              <div key={reply._id} className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-text">
                    {reply.authorName || 'Unknown'}
                  </p>
                  <p className="mt-1 text-sm text-text-muted">
                    {reply.isDeleted ? (
                      <span className="italic">This comment was deleted.</span>
                    ) : (
                      reply.content
                    )}
                  </p>
                </div>

                {!reply.isDeleted && canDeleteReply && (
                  <button
                    onClick={() => handleDelete(reply._id)}
                    className="text-text-muted hover:text-destructive"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
