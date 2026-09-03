'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, User, PenLine, FileText, LogOut } from 'lucide-react';
import { useSession, signOut } from '@/lib/auth-client';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/posts', label: 'Posts' },
  { href: '/requests', label: 'Requests' },
];

export default function MobileMenu() {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isAdmin = session?.user?.role === 'admin';

  const go = href => {
    setOpen(false);
    router.push(href);
  };

  const handleSignOut = () => {
    setOpen(false);
    signOut();
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-50 sm:hidden">
        <Menu size={18} />
      </SheetTrigger>

      <SheetContent side="right" className="w-72 bg-bg">
        <SheetHeader>
          <SheetTitle className="font-serif text-left">Menu</SheetTitle>
        </SheetHeader>

        <nav className="mt-6 flex flex-col gap-1 px-4">
          {navLinks.map(link => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-md px-3 py-2.5 text-sm ${
                  isActive
                    ? 'bg-gray-100 font-medium text-text'
                    : 'text-text-muted hover:bg-gray-50 hover:text-text'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-4 border-t border-border px-4 pt-4">
          {session ? (
            <div className="flex flex-col gap-1">
              <button
                onClick={() => go('/profile')}
                className="flex items-center gap-2 rounded-md px-3 py-2.5 text-left text-sm text-text-muted hover:bg-gray-50 hover:text-text"
              >
                <User size={16} />
                Profile
              </button>

              {isAdmin && (
                <>
                  <button
                    onClick={() => go('/admin/write')}
                    className="flex items-center gap-2 rounded-md px-3 py-2.5 text-left text-sm text-text-muted hover:bg-gray-50 hover:text-text"
                  >
                    <PenLine size={16} />
                    Write
                  </button>
                  <button
                    onClick={() => go('/admin/posts')}
                    className="flex items-center gap-2 rounded-md px-3 py-2.5 text-left text-sm text-text-muted hover:bg-gray-50 hover:text-text"
                  >
                    <FileText size={16} />
                    Manage Posts
                  </button>
                </>
              )}

              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 rounded-md px-3 py-2.5 text-left text-sm text-destructive hover:bg-red-50"
              >
                <LogOut size={16} />
                Sign out
              </button>
            </div>
          ) : (
            <button
              onClick={() => go('/sign-in')}
              className="w-full rounded-full bg-text px-4 py-2.5 text-sm font-medium text-bg hover:bg-accent"
            >
              Sign in
            </button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
