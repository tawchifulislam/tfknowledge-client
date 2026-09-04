import { notFound } from 'next/navigation';
import Link from 'next/link';
import Container from '@/components/layout/Container';
import { getPostBySlug } from '@/lib/api';
import { getReadingTime } from '@/lib/readingTime';
import ReactionBar from '@/components/posts/ReactionBar';
import CommentSection from '@/components/posts/CommentSection';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: 'Post not found' };
  }

  return {
    title: `${post.title} | Thirsty for Knowledge`,
    description: post.excerpt || '',
    openGraph: {
      title: post.title,
      description: post.excerpt || '',
      ...(post.coverImage && { images: [post.coverImage] }),
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || '',
      ...(post.coverImage && { images: [post.coverImage] }),
    },
  };
}

export default async function SinglePostPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const tags = post.tags || [];
  const content = post.content || '';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt || '',
    image: post.coverImage || undefined,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Organization',
      name: 'Thirsty for Knowledge',
    },
  };

  return (
    <Container className="max-w-3xl py-8 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {post.coverImage && (
        <img
          src={post.coverImage}
          alt={post.title}
          className="mb-6 h-48 w-full rounded-xl object-cover sm:mb-8 sm:h-72"
        />
      )}

      <div className="flex items-center gap-2 text-sm text-text-muted">
        <span>
          {post.publishedAt
            ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })
            : ''}
        </span>
        {content && (
          <>
            <span>·</span>
            <span>{getReadingTime(content)}</span>
          </>
        )}
      </div>

      <h1 className="mt-2 font-serif text-2xl font-semibold leading-tight text-text sm:text-3xl md:text-4xl">
        {post.title}
      </h1>

      {tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map(tag => (
            <Link
              key={tag}
              href={`/posts?tag=${encodeURIComponent(tag)}`}
              className="rounded-full bg-gray-100 px-3 py-1 text-xs text-text-muted hover:bg-gray-200 hover:text-text"
            >
              {tag}
            </Link>
          ))}
        </div>
      )}

      <div
        className="prose prose-neutral mt-8 max-w-none font-sans text-base leading-relaxed text-text prose-headings:font-serif prose-img:rounded-lg"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      <ReactionBar postId={post._id} />

      <CommentSection postId={post._id} />
    </Container>
  );
}
