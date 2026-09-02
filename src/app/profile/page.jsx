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
  const [topics, setTopics] = useState(null);

  const isAdmin = session?.user?.role === 'admin';
  const isTopicsLoading = !!session && !isAdmin && topics === null;

  useEffect(() => {
    if (!session || isAdmin) {
      return;
    }

    let isMounted = true;

    getMyTopicRequests()
      .then(data => {
        if (isMounted) {
          setTopics(data);
        }
      })
      .catch(() => {
        if (isMounted) {
          setTopics([]);
        }
      });

    return () => {
      isMounted = false;
    };
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
    <Container className="max-w-2xl py-12">
      <div className="flex items-center gap-4">
        {session.user.image ? (
          <img
            src={session.user.image}
            alt={session.user.name}
            referrerPolicy="no-referrer"
            className="h-16 w-16 shrink-0 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gray-100 text-lg font-medium text-text-muted">
            {session.user.name?.charAt(0).toUpperCase() || <User size={24} />}
          </div>
        )}
        <div>
          <h1 className="font-serif text-2xl font-semibold text-text">
            {session.user.name}
          </h1>
          <p className="text-sm text-text-muted">{session.user.email}</p>
        </div>
      </div>

      {!isAdmin && (
        <div className="mt-10">
          <h2 className="font-serif text-lg font-semibold text-text">
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
                      <h3 className="font-medium text-text">{topic.title}</h3>
                      <span
                        className={`whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${
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
