import Link from 'next/link';
import Image from 'next/image';
import Container from '@/components/layout/Container';
import { getAllPosts } from '@/lib/api';

export default async function PostsPage() {
  const posts = await getAllPosts();

  return (
    <Container className="py-12">
      <h1 className="font-serif text-3xl font-semibold text-text">Posts</h1>

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
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  width={400}
                  height={160}
                  className="mb-2 h-40 w-full rounded-lg object-cover"
                />
              )}
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
      )}
    </Container>
  );
}
