'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { useSession } from '@/lib/auth-client';
import { getAllPostsForAdmin, deletePost } from '@/lib/api';
import Container from '@/components/layout/Container';
import ConfirmDialog from '@/components/shared/ConfirmDialog';
import { Pencil, Trash2 } from 'lucide-react';

export default function ManagePostsPage() {
  const { data: session, isPending } = useSession();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmTarget, setConfirmTarget] = useState(null);

  useEffect(() => {
    if (session?.user?.role === 'admin') {
      getAllPostsForAdmin()
        .then(setPosts)
        .finally(() => setLoading(false));
    }
  }, [session]);

  if (isPending) return null;

  if (!session || session.user.role !== 'admin') {
    return (
      <Container className="py-20 text-center">
        <p className="text-text-muted">You do not have access to this page.</p>
      </Container>
    );
  }

  const handleDelete = async () => {
    if (!confirmTarget) return;
    try {
      await deletePost(confirmTarget);
      setPosts(prev => prev.filter(p => p._id !== confirmTarget));
      toast.success('Post deleted.');
    } catch (err) {
      toast.error('Failed to delete post.');
    } finally {
      setConfirmTarget(null);
    }
  };

  return (
    <Container className="max-w-3xl py-8 sm:py-12">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-serif text-xl font-semibold text-text sm:text-2xl">
          Manage posts
        </h1>
        <Link
          href="/admin/write"
          className="inline-block rounded-full bg-text px-4 py-2 text-center text-sm font-medium text-bg hover:bg-accent"
        >
          New post
        </Link>
      </div>

      <div className="mt-8">
        {loading ? (
          <p className="text-text-muted">Loading...</p>
        ) : posts.length === 0 ? (
          <p className="text-text-muted">No posts yet.</p>
        ) : (
          <div className="space-y-3">
            {posts.map(post => (
              <div
                key={post._id}
                className="flex items-center justify-between gap-3 rounded-xl border border-border bg-white p-4"
              >
                <div className="min-w-0">
                  <h3 className="truncate font-medium text-text">
                    {post.title}
                  </h3>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-text-muted">
                    <span
                      className={`rounded-full px-2 py-0.5 ${
                        post.status === 'published'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-gray-100 text-text-muted'
                      }`}
                    >
                      {post.status}
                    </span>
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-3">
                  <Link
                    href={`/admin/edit/${post._id}`}
                    className="text-text-muted hover:text-text"
                  >
                    <Pencil size={16} />
                  </Link>
                  <button
                    onClick={() => setConfirmTarget(post._id)}
                    className="text-text-muted hover:text-destructive"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ConfirmDialog
        open={!!confirmTarget}
        onOpenChange={open => !open && setConfirmTarget(null)}
        title="Delete this post?"
        description="This post will be permanently deleted and can't be recovered."
        onConfirm={handleDelete}
      />
    </Container>
  );
}
