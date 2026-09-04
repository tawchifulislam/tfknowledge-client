import { getAllPosts } from '@/lib/api';

export default async function sitemap() {
  const baseUrl = 'https://tfknowledge.vercel.app';

  const { posts } = await getAllPosts(1, 100);

  const postUrls = posts.map(post => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: post.publishedAt,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const staticUrls = [
    { url: baseUrl, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/posts`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/requests`, changeFrequency: 'daily', priority: 0.6 },
  ];

  return [...staticUrls, ...postUrls];
}
