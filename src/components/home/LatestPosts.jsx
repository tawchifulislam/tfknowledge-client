import Link from 'next/link';

const placeholderPosts = [
  {
    slug: 'why-curiosity-compounds',
    title: 'Why curiosity compounds like interest',
    excerpt:
      'Small habits of asking questions build up over years into something far bigger than any single insight.',
    date: 'Aug 2026',
  },
  {
    slug: 'the-art-of-slow-reading',
    title: 'The art of slow reading',
    excerpt:
      'In a world of skimming, reading deliberately is becoming a quiet act of resistance.',
    date: 'Aug 2026',
  },
  {
    slug: 'learning-in-public',
    title: 'Learning in public, one post at a time',
    excerpt:
      'Sharing half-formed ideas is uncomfortable, but it is often the fastest way to refine them.',
    date: 'Jul 2026',
  },
];

export default function LatestPosts() {
  return (
    <section className="py-16">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="font-serif text-2xl font-semibold text-text">
          Latest posts
        </h2>
        <Link href="/feed" className="text-sm text-text-muted hover:text-text">
          View all
        </Link>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {placeholderPosts.map(post => (
          <Link
            key={post.slug}
            href={`/feed/${post.slug}`}
            className="group flex flex-col gap-2"
          >
            <span className="text-xs text-text-muted">{post.date}</span>
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
