'use client';

import { useSession, signOut } from '@/lib/auth-client';
import Link from 'next/link';
import Logo from './Logo';
import Container from './Container';

export default function Navbar() {
  const { data: session, isPending } = useSession();
  const isAdmin = session?.user?.role === 'admin';

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <Container className="flex items-center justify-between py-4">
        <Logo />

        <div className="flex items-center gap-6 text-sm">
          <Link href="/feed" className="text-gray-600 hover:text-black">
            Feed
          </Link>
          <Link href="/topics" className="text-gray-600 hover:text-black">
            Topics
          </Link>

          {isAdmin && (
            <Link
              href="/admin/write"
              className="text-gray-600 hover:text-black"
            >
              Write
            </Link>
          )}

          {!isPending && (
            <>
              {session ? (
                <button
                  onClick={() => signOut()}
                  className="rounded-full bg-black px-4 py-1.5 text-white hover:bg-gray-800"
                >
                  Sign out
                </button>
              ) : (
                <Link
                  href="/sign-in"
                  className="rounded-full bg-black px-4 py-1.5 text-white hover:bg-gray-800"
                >
                  Sign in
                </Link>
              )}
            </>
          )}
        </div>
      </Container>
    </header>
  );
}
