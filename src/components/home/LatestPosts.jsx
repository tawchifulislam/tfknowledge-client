import Link from 'next/link';
import { getAllPosts } from '@/lib/api';

export default async function LatestPosts() {
  const posts = await getAllPosts();
  const latestThree = posts.slice(0, 3);

  if (latestThree.length === 0) {
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
        {latestThree.map(post => (
          <Link
            key={post.slug}
            href={`/posts/${post.slug}`}
            className="group flex flex-col gap-2"
          >
            <span className="text-xs text-text-muted">
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric',
              })}
            </span>
            <h3 className="font-serif text-lg font-semibold text-text group-hover:text-accent">
              {post.title}
            </h3>
            <p className="text-sm text-text-muted">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
