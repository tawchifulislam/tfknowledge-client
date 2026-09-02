import SignInButtons from '@/components/auth/SignInButtons';
import Container from '@/components/layout/Container';

export default function SignInPage() {
  return (
    <Container className="flex min-h-[70vh] items-center justify-center">
      <div className="w-full max-w-sm text-center">
        <h1 className="font-serif text-2xl font-semibold text-text">
          Welcome back
        </h1>
        <p className="mt-2 text-sm text-text-muted">
          Sign in to like posts, leave comments, and request topics.
        </p>

        <div className="mt-8">
          <SignInButtons />
        </div>
      </div>
    </Container>
  );
}
