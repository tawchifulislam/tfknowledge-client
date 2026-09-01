import Container from '@/components/layout/Container';
import Hero from '@/components/home/Hero';
import LatestPosts from '@/components/home/LatestPosts';

export default function Home() {
  return (
    <Container>
      <Hero />
      <LatestPosts />
    </Container>
  );
}
