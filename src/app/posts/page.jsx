import Link from 'next/link';
import Container from '@/components/layout/Container';
import { getAllPosts } from '@/lib/api';

export const metadata = {
  title: 'Posts | Thirsty for Knowledge',
  description: 'Original writing on ideas worth exploring.',
};

export default async function PostsPage() {
  const posts = await getAllPosts();

  return (
    <Container className="py-8 sm:py-12">
      <h1 className="font-serif text-2xl font-semibold text-text sm:text-3xl">
        Posts
      </h1>

      {posts.length === 0 ? (
        <p className="mt-8 text-text-muted">No posts published yet.</p>
      ) : (
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map(post => (
            <Link
              key={post.slug}
              href={`/posts/${post.slug}`}
              className="group flex flex-col gap-2"
            >
              {post.coverImage && (
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="mb-2 h-36 w-full rounded-lg object-cover sm:h-40"
                />
              )}
              <span className="text-xs text-text-muted">
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
              <h3 className="font-serif text-base font-semibold text-text group-hover:text-accent sm:text-lg">
                {post.title}
              </h3>
              <p className="line-clamp-2 text-sm text-text-muted">
                {post.excerpt}
              </p>
            </Link>
          ))}
        </div>
      )}
    </Container>
  );
}
