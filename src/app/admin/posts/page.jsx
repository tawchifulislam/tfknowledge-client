'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from '@/lib/auth-client';
import { getAllPostsForAdmin, deletePost } from '@/lib/api';
import Container from '@/components/layout/Container';
import { Pencil, Trash2 } from 'lucide-react';

export default function ManagePostsPage() {
  const { data: session, isPending } = useSession();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleDelete = async id => {
    if (!confirm('Delete this post permanently?')) return;
    try {
      await deletePost(id);
      setPosts(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      alert('Failed to delete post.');
    }
  };

  return (
    <Container className="max-w-3xl py-12">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl font-semibold text-text">
          Manage posts
        </h1>
        <Link
          href="/admin/write"
          className="rounded-full bg-text px-4 py-2 text-sm font-medium text-bg hover:bg-accent"
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
                className="flex items-center justify-between rounded-xl border border-border bg-white p-4"
              >
                <div>
                  <h3 className="font-medium text-text">{post.title}</h3>
                  <div className="mt-1 flex items-center gap-2 text-xs text-text-muted">
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

                <div className="flex items-center gap-3">
                  <Link
                    href={`/admin/edit/${post._id}`}
                    className="text-text-muted hover:text-text"
                  >
                    <Pencil size={16} />
                  </Link>
                  <button
                    onClick={() => handleDelete(post._id)}
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
    </Container>
  );
}
