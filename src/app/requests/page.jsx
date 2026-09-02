'use client';

import { useEffect, useState } from 'react';
import { useSession } from '@/lib/auth-client';
import { getAllTopicRequests, createTopicRequest } from '@/lib/api';
import Container from '@/components/layout/Container';
import TopicRequestCard from '@/components/requests/TopicRequestCard';

export default function RequestsPage() {
  const { data: session } = useSession();
  const [topics, setTopics] = useState([]);
  const [title, setTitle] = useState('');
  const [reason, setReason] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllTopicRequests()
      .then(setTopics)
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async () => {
    if (!title.trim() || !reason.trim()) return;

    setSubmitting(true);
    try {
      const created = await createTopicRequest(title, reason);
      setTopics(prev => [created, ...prev]);
      setTitle('');
      setReason('');
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleted = id => {
    setTopics(prev => prev.filter(t => t._id !== id));
  };

  return (
    <Container className="max-w-2xl py-12">
      <div className="text-center">
        <h1 className="font-serif text-3xl font-semibold text-text sm:text-4xl">
          Request a topic
        </h1>
        <p className="mx-auto mt-3 max-w-md text-text-muted">
          Ask for what you want to read next, and vote on ideas from other
          readers.
        </p>
      </div>

      {session ? (
        <div className="mt-10 space-y-3 rounded-xl border border-border bg-white p-5 shadow-sm">
          <input
            type="text"
            placeholder="What should we write about?"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full rounded-md border border-border p-2.5 text-sm focus:border-accent focus:outline-none"
          />
          <textarea
            placeholder="Why do you want this topic covered?"
            value={reason}
            onChange={e => setReason(e.target.value)}
            rows={3}
            className="w-full resize-none rounded-md border border-border p-2.5 text-sm focus:border-accent focus:outline-none"
          />
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="rounded-full bg-text px-5 py-2 text-sm font-medium text-bg hover:bg-accent disabled:opacity-50"
            >
              {submitting ? 'Submitting...' : 'Submit request'}
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-10 rounded-xl border border-dashed border-border p-6 text-center text-sm text-text-muted">
          Sign in to request a topic.
        </div>
      )}

      <div className="mt-12">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-lg font-semibold text-text">
            {loading
              ? 'Loading requests...'
              : `${topics.length} ${
                  topics.length === 1 ? 'request' : 'requests'
                }`}
          </h2>
        </div>

        <div className="mt-4">
          {loading ? null : topics.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border py-12 text-center">
              <p className="text-text-muted">No topic requests yet.</p>
              <p className="mt-1 text-sm text-text-muted/70">
                Be the first to suggest what we should write about.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {topics.map(topic => (
                <TopicRequestCard
                  key={topic._id}
                  topic={topic}
                  onDeleted={handleDeleted}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}
