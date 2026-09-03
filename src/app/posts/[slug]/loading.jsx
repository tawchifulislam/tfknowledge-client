import Container from '@/components/layout/Container';
import Skeleton from '@/components/shared/Skeleton';

export default function PostLoading() {
  return (
    <Container className="max-w-3xl py-8 sm:py-12">
      <Skeleton className="mb-6 h-48 w-full sm:mb-8 sm:h-72" />
      <Skeleton className="h-4 w-32" />
      <Skeleton className="mt-3 h-9 w-3/4" />
      <div className="mt-8 space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </Container>
  );
}
