import Container from '@/components/layout/Container';
import PostsGrid from '@/components/post/PostsGrid';
import { getAllPosts } from '@/lib/api';

export const metadata = {
  title: 'Posts | Thirsty for Knowledge',
  description: 'Original writing on ideas worth exploring.',
};

export default async function PostsPage({ searchParams }) {
  const params = await searchParams;
  const posts = await getAllPosts();

  return (
    <Container className="py-8 sm:py-12">
      <h1 className="font-serif text-2xl font-semibold text-text sm:text-3xl">
        Posts
      </h1>

      <PostsGrid posts={posts} activeTag={params?.tag || null} />
    </Container>
  );
}
