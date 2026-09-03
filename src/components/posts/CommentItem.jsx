'use client';

import { useState } from 'react';
import { Trash2, Pencil, X, Check } from 'lucide-react';
import { toast } from 'sonner';
import { useSession } from '@/lib/auth-client';
import { deleteComment, updateComment } from '@/lib/api';
import ConfirmDialog from '@/components/shared/ConfirmDialog';

export default function CommentItem({
  comment,
  replies,
  onReply,
  onDeleted,
  onEdited,
}) {
  const { data: session } = useSession();
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [confirmTarget, setConfirmTarget] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(comment.content);

  const isOwner = session?.user?.id === comment.authorId;
  const isAdmin = session?.user?.role === 'admin';
  const canDelete = isOwner || isAdmin;

  const handleDelete = async () => {
    if (!confirmTarget) return;
    setDeleting(true);
    try {
      await deleteComment(confirmTarget);
      onDeleted(confirmTarget);
      toast.success('Comment deleted.');
    } catch (err) {
      toast.error(err.message || 'Failed to delete comment.');
    } finally {
      setDeleting(false);
      setConfirmTarget(null);
    }
  };

  const handleEditSave = async () => {
    if (!editText.trim()) return;
    try {
      const updated = await updateComment(comment._id, editText);
      onEdited(comment._id, updated.content);
      setEditing(false);
      toast.success('Comment updated.');
    } catch (err) {
      toast.error(err.message || 'Failed to update comment.');
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
        <div className="flex-1">
          <p className="text-sm font-medium text-text">
            {comment.authorName || 'Unknown'}
          </p>

          {editing ? (
            <div className="mt-1 flex flex-col gap-2 sm:flex-row">
              <input
                type="text"
                value={editText}
                onChange={e => setEditText(e.target.value)}
                className="flex-1 rounded-md border border-border px-3 py-1.5 text-sm focus:outline-none"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleEditSave}
                  className="flex h-8 w-8 items-center justify-center rounded-md bg-text text-bg hover:bg-accent"
                >
                  <Check size={14} />
                </button>
                <button
                  onClick={() => {
                    setEditing(false);
                    setEditText(comment.content);
                  }}
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-text-muted hover:bg-gray-50"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          ) : (
            <p className="mt-1 text-sm text-text-muted">
              {comment.isDeleted ? (
                <span className="italic">This comment was deleted.</span>
              ) : (
                <>
                  {comment.content}
                  {comment.isEdited && (
                    <span className="ml-1 text-xs text-text-muted/60">
                      (edited)
                    </span>
                  )}
                </>
              )}
            </p>
          )}
        </div>

        {!comment.isDeleted && !editing && (
          <div className="flex items-center gap-2">
            {isOwner && (
              <button
                onClick={() => setEditing(true)}
                className="text-text-muted hover:text-text"
              >
                <Pencil size={14} />
              </button>
            )}
            {canDelete && (
              <button
                onClick={() => setConfirmTarget(comment._id)}
                disabled={deleting}
                className="text-text-muted hover:text-destructive"
              >
                <Trash2 size={14} />
              </button>
            )}
          </div>
        )}
      </div>

      {!comment.isDeleted && session && !editing && (
        <button
          onClick={() => setShowReplyBox(prev => !prev)}
          className="mt-1 text-xs text-text-muted hover:text-text"
        >
          Reply
        </button>
      )}

      {showReplyBox && (
        <div className="mt-2 flex flex-col gap-2 sm:flex-row">
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
        <div className="ml-4 mt-3 space-y-3 border-l border-border pl-3 sm:ml-6 sm:pl-4">
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
                    onClick={() => setConfirmTarget(reply._id)}
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

      <ConfirmDialog
        open={!!confirmTarget}
        onOpenChange={open => !open && setConfirmTarget(null)}
        title="Delete comment?"
        description="This comment will be marked as deleted and can't be recovered."
        onConfirm={handleDelete}
      />
    </div>
  );
}
