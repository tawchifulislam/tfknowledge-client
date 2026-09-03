import Link from 'next/link';
import Container from '@/components/layout/Container';

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <span className="font-serif text-6xl font-semibold text-text-muted/40">
        404
      </span>
      <h1 className="mt-4 font-serif text-2xl font-semibold text-text">
        This page went missing
      </h1>
      <p className="mt-2 max-w-sm text-text-muted">
        The page you&apos;re looking for doesn&apos;t exist or may have been
        moved.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-full bg-text px-5 py-2 text-sm font-medium text-bg hover:bg-accent"
      >
        Back to home
      </Link>
    </Container>
  );
}
