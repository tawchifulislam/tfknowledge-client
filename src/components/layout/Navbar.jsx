'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useSession } from '@/lib/auth-client';
import Logo from './Logo';
import Container from './Container';
import ProfileMenu from './ProfileMenu';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/feed', label: 'Feed' },
  { href: '/requests', label: 'Requests' },
];

export default function Navbar() {
  const { data: session, isPending } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
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
          {!isPending &&
            (session ? (
              <ProfileMenu />
            ) : (
              <Link
                href="/sign-in"
                className="rounded-full bg-text px-3 py-1.5 text-xs text-bg hover:bg-accent sm:px-4 sm:text-sm"
              >
                Sign in
              </Link>
            ))}

          <button
            onClick={() => setMobileOpen(prev => !prev)}
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-50 sm:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </Container>

      {mobileOpen && (
        <nav className="flex flex-col gap-1 border-t border-border px-4 py-3 text-sm sm:hidden">
          {navLinks.map(link => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={
                  isActive
                    ? 'rounded-md bg-gray-100 px-2 py-2 font-medium text-text'
                    : 'rounded-md px-2 py-2 text-text-muted hover:bg-gray-50 hover:text-text'
                }
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
