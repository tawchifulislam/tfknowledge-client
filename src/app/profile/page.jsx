'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from '@/lib/auth-client';
import { getMyTopicRequests } from '@/lib/api';
import Container from '@/components/layout/Container';
import { User } from 'lucide-react';

const STATUS_STYLES = {
  pending: 'bg-gray-100 text-text-muted',
  'in-progress': 'bg-amber-100 text-amber-800',
  written: 'bg-emerald-100 text-emerald-800',
};

const STATUS_LABELS = {
  pending: 'Pending',
  'in-progress': 'Being written',
  written: 'Published',
};

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  const isAdmin = session?.user?.role === 'admin';

  useEffect(() => {
    if (!session || isAdmin) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false);
      return;
    }

    getMyTopicRequests()
      .then(setTopics)
      .finally(() => setLoading(false));
  }, [session, isAdmin]);

  if (isPending) return null;

  if (!session) {
    return (
      <Container className="py-20 text-center">
        <p className="text-text-muted">Please sign in to view your profile.</p>
      </Container>
    );
  }

  return (
    <Container className="max-w-2xl py-8 sm:py-12">
      <div className="flex items-center gap-4">
        {session.user.image ? (
          <img
            src={session.user.image}
            alt={session.user.name}
            referrerPolicy="no-referrer"
            className="h-14 w-14 shrink-0 rounded-full object-cover sm:h-16 sm:w-16"
          />
        ) : (
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gray-100 text-lg font-medium text-text-muted sm:h-16 sm:w-16">
            {session.user.name?.charAt(0).toUpperCase() || <User size={24} />}
          </div>
        )}
        <div className="min-w-0">
          <h1 className="truncate font-serif text-xl font-semibold text-text sm:text-2xl">
            {session.user.name}
          </h1>
          <p className="truncate text-sm text-text-muted">
            {session.user.email}
          </p>
        </div>
      </div>

      {!isAdmin && (
        <div className="mt-8 sm:mt-10">
          <h2 className="font-serif text-base font-semibold text-text sm:text-lg">
            Your topic requests
          </h2>

          <div className="mt-4">
            {loading ? (
              <p className="text-text-muted">Loading...</p>
            ) : topics.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border py-10 text-center">
                <p className="text-text-muted">
                  You haven&apos;t requested any topics yet.
                </p>
                <Link
                  href="/requests"
                  className="mt-2 inline-block text-sm text-accent hover:underline"
                >
                  Request a topic
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {topics.map(topic => (
                  <div
                    key={topic._id}
                    className="rounded-xl border border-border bg-white p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="wrap-break-word font-medium text-text">
                        {topic.title}
                      </h3>
                      <span
                        className={`shrink-0 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${
                          STATUS_STYLES[topic.status]
                        }`}
                      >
                        {STATUS_LABELS[topic.status]}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-text-muted">
                      {topic.reason}
                    </p>
                    <p className="mt-2 text-xs text-text-muted">
                      {topic.voteScore} votes
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </Container>
  );
}
