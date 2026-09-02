'use client';

import { useEffect, useState } from 'react';
import { ChevronUp, ChevronDown, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useSession } from '@/lib/auth-client';
import {
  castVote,
  getUserVote,
  deleteTopicRequest,
  updateTopicStatus,
} from '@/lib/api';

const STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending' },
  { value: 'in-progress', label: 'Being written' },
  { value: 'written', label: 'Published' },
];

const STATUS_STYLES = {
  pending: 'bg-gray-100 text-text-muted',
  'in-progress': 'bg-amber-100 text-amber-800',
  written: 'bg-emerald-100 text-emerald-800',
};

export default function TopicRequestCard({ topic, onDeleted }) {
  const { data: session } = useSession();
  const [score, setScore] = useState(topic.voteScore);
  const [userVote, setUserVote] = useState(0);
  const [status, setStatus] = useState(topic.status);
  const [voting, setVoting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [statusMenuOpen, setStatusMenuOpen] = useState(false);

  useEffect(() => {
    if (session) {
      getUserVote(topic._id).then(data => setUserVote(data.value));
    }
  }, [session, topic._id]);

  const isOwner = session?.user?.id === topic.requestedBy;
  const isAdmin = session?.user?.role === 'admin';
  const canDelete = isOwner || isAdmin;

  const handleVote = async value => {
    if (!session) {
      toast.error('Please sign in to vote.');
      return;
    }

    setVoting(true);
    const prevVote = userVote;
    const prevScore = score;

    const newVote = prevVote === value ? 0 : value;
    const scoreDiff = newVote - prevVote;

    setUserVote(newVote);
    setScore(prevScore + scoreDiff);

    try {
      await castVote(topic._id, value);
    } catch (err) {
      setUserVote(prevVote);
      setScore(prevScore);
      toast.error('Failed to vote.');
    } finally {
      setVoting(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Delete this topic request?')) return;
    setDeleting(true);
    try {
      await deleteTopicRequest(topic._id);
      onDeleted(topic._id);
      toast.success('Request deleted.');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setDeleting(false);
    }
  };

  const handleStatusChange = async newStatus => {
    setStatusMenuOpen(false);
    if (newStatus === status) return;

    const prevStatus = status;
    setStatus(newStatus);

    try {
      await updateTopicStatus(topic._id, newStatus);
      toast.success('Status updated.');
    } catch (err) {
      setStatus(prevStatus);
      toast.error('Failed to update status.');
    }
  };

  const currentStatusLabel = STATUS_OPTIONS.find(
    opt => opt.value === status,
  )?.label;

  const timeAgo = getTimeAgo(topic.createdAt);

  return (
    <div className="flex gap-3 rounded-xl border border-border bg-white p-4 sm:gap-4 sm:p-5">
      <div className="flex flex-col items-center gap-1">
        <button
          onClick={() => handleVote(1)}
          disabled={voting}
          className={`rounded-md p-1 ${
            userVote === 1 ? 'text-accent' : 'text-text-muted hover:bg-gray-100'
          }`}
        >
          <ChevronUp size={20} />
        </button>
        <span className="text-sm font-medium text-text">{score}</span>
        <button
          onClick={() => handleVote(-1)}
          disabled={voting}
          className={`rounded-md p-1 ${
            userVote === -1
              ? 'text-destructive'
              : 'text-text-muted hover:bg-gray-100'
          }`}
        >
          <ChevronDown size={20} />
        </button>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2 sm:gap-3">
          <h3 className="wrap-break-word font-serif text-base font-semibold text-text sm:text-lg">
            {topic.title}
          </h3>
          <div className="relative flex shrink-0 items-center gap-2 sm:gap-3">
            {isAdmin ? (
              <button
                onClick={() => setStatusMenuOpen(prev => !prev)}
                className={`whitespace-nowrap rounded-full px-2 py-1 text-xs font-medium hover:opacity-80 sm:px-2.5 ${STATUS_STYLES[status]}`}
              >
                {currentStatusLabel}
              </button>
            ) : (
              status !== 'pending' && (
                <span
                  className={`whitespace-nowrap rounded-full px-2 py-1 text-xs font-medium sm:px-2.5 ${STATUS_STYLES[status]}`}
                >
                  {currentStatusLabel}
                </span>
              )
            )}

            {statusMenuOpen && (
              <div className="absolute right-0 top-8 z-10 w-36 rounded-md border border-border bg-white py-1 shadow-md">
                {STATUS_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => handleStatusChange(opt.value)}
                    className={`block w-full px-3 py-1.5 text-left text-xs hover:bg-gray-50 ${
                      opt.value === status
                        ? 'font-medium text-text'
                        : 'text-text-muted'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}

            {canDelete && (
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="text-text-muted hover:text-destructive"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        </div>
        <p className="mt-1 text-sm text-text-muted">{topic.reason}</p>
        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-text-muted">
          <span>{topic.requestedByName}</span>
          <span>·</span>
          <span>{timeAgo}</span>
        </div>
      </div>
    </div>
  );
}

function getTimeAgo(dateString) {
  const date = new Date(dateString);
  const seconds = Math.floor((new Date() - date) / 1000);

  const intervals = [
    { label: 'y', secs: 31536000 },
    { label: 'mo', secs: 2592000 },
    { label: 'd', secs: 86400 },
    { label: 'h', secs: 3600 },
    { label: 'm', secs: 60 },
  ];

  for (const { label, secs } of intervals) {
    const count = Math.floor(seconds / secs);
    if (count >= 1) return `${count}${label} ago`;
  }

  return 'just now';
}
