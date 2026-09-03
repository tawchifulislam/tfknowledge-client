import Container from '@/components/layout/Container';
import Skeleton from '@/components/shared/Skeleton';

export default function PostsLoading() {
  return (
    <Container className="py-8 sm:py-12">
      <Skeleton className="h-8 w-32" />

      <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="flex flex-col gap-2">
            <Skeleton className="mb-2 h-36 w-full sm:h-40" />
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-full" />
          </div>
        ))}
      </div>
    </Container>
  );
}
