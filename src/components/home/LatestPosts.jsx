import Link from 'next/link';
import { getAllPosts } from '@/lib/api';

export default async function LatestPosts() {
  const { posts } = await getAllPosts(1, 3);

  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="pb-16 pt-4">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="font-serif text-2xl font-semibold text-text">
          Latest posts
        </h2>
        <Link href="/posts" className="text-sm text-text-muted hover:text-text">
          View all
        </Link>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map(post => (
          <Link
            key={post.slug}
            href={`/posts/${post.slug}`}
            className="group flex flex-col gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
          >
            {post.coverImage && (
              <div className="mb-2 h-36 overflow-hidden rounded-lg sm:h-40">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            )}
            <span className="text-xs text-text-muted">
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric',
              })}
            </span>
            <h3 className="w-fit font-serif text-lg font-semibold text-text transition-colors duration-200 group-hover:text-accent">
              {post.title}
            </h3>
            <p className="line-clamp-2 text-sm text-text-muted">
              {post.excerpt}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
