'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, X, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';

export default function PostsGrid({ posts, activeTag }) {
  const [query, setQuery] = useState('');
  const [showAllTags, setShowAllTags] = useState(false);

  const allTags = useMemo(() => {
    const tagSet = new Set();
    posts.forEach(post => (post.tags || []).forEach(t => tagSet.add(t)));
    return Array.from(tagSet);
  }, [posts]);

  const visibleTags = showAllTags ? allTags : allTags.slice(0, 8);

  const filtered = useMemo(() => {
    let result = posts;

    if (activeTag) {
      result = result.filter(post => (post.tags || []).includes(activeTag));
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        post =>
          post.title.toLowerCase().includes(q) ||
          (post.excerpt || '').toLowerCase().includes(q),
      );
    }

    return result;
  }, [posts, activeTag, query]);

  return (
    <div>
      <div className="relative mt-6">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
        />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search posts..."
          className="w-full rounded-full border border-border py-2 pl-9 pr-4 text-sm focus:border-accent focus:outline-none"
        />
      </div>

      {allTags.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Link
            href="/posts"
            className={`rounded-full px-3 py-1 text-xs ${
              !activeTag
                ? 'bg-text text-bg'
                : 'bg-gray-100 text-text-muted hover:bg-gray-200'
            }`}
          >
            All
          </Link>
          {visibleTags.map(tag => (
            <Link
              key={tag}
              href={`/posts?tag=${encodeURIComponent(tag)}`}
              className={`rounded-full px-3 py-1 text-xs ${
                activeTag === tag
                  ? 'bg-text text-bg'
                  : 'bg-gray-100 text-text-muted hover:bg-gray-200'
              }`}
            >
              {tag}
            </Link>
          ))}
          {allTags.length > 8 && (
            <button
              onClick={() => setShowAllTags(prev => !prev)}
              className="flex items-center gap-1 rounded-full px-3 py-1 text-xs text-accent hover:bg-gray-100"
            >
              {showAllTags ? (
                <>
                  Show less <ChevronUp size={12} />
                </>
              ) : (
                <>
                  +{allTags.length - 8} more <ChevronDown size={12} />
                </>
              )}
            </button>
          )}
        </div>
      )}

      {activeTag && (
        <div className="mt-3 flex items-center gap-2 text-sm text-text-muted">
          Filtering by{' '}
          <span className="font-medium text-text">{activeTag}</span>
          <Link href="/posts" className="text-accent hover:underline">
            <X size={14} className="inline" /> Clear
          </Link>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="mt-12 flex flex-col items-center gap-3 py-12 text-center">
          <BookOpen size={32} className="text-text-muted/40" />
          <p className="text-text-muted">No posts found.</p>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(post => (
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
              <h3 className="w-fit font-serif text-base font-semibold text-text transition-colors duration-200 group-hover:text-accent sm:text-lg">
                {post.title}
              </h3>
              <p className="line-clamp-2 text-sm text-text-muted">
                {post.excerpt}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
