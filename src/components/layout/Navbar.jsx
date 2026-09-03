'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from '@/lib/auth-client';
import Logo from './Logo';
import Container from './Container';
import ProfileMenu from './ProfileMenu';
import MobileMenu from './MobileMenu';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/posts', label: 'Posts' },
  { href: '/requests', label: 'Requests' },
];

export default function Navbar() {
  const { data: session, isPending } = useSession();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg">
      <Container className="flex items-center justify-between py-3 sm:py-4">
        <Logo />

        <nav className="hidden flex-1 justify-center gap-8 text-sm sm:flex">
          {navLinks.map(link => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  isActive
                    ? 'font-medium text-text'
                    : 'text-text-muted hover:text-text'
                }
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          {!isPending && (
            <div className="hidden sm:block">
              {session ? (
                <ProfileMenu />
              ) : (
                <Link
                  href="/sign-in"
                  className="rounded-full bg-text px-4 py-1.5 text-sm text-bg hover:bg-accent"
                >
                  Sign in
                </Link>
              )}
            </div>
          )}

          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
