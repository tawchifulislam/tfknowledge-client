'use client';

import { useRouter } from 'next/navigation';
import { User, PenLine, FileText, LogOut } from 'lucide-react';
import { useSession, signOut } from '@/lib/auth-client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function ProfileMenu() {
  const router = useRouter();
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === 'admin';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex h-9 w-9 items-center justify-center rounded-full border border-border hover:bg-gray-50">
        <User size={16} className="text-text" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8} className="w-40 p-1">
        <DropdownMenuItem
          onClick={() => router.push('/profile')}
          className="flex items-center gap-2 py-1.5 text-sm focus:bg-gray-100 focus:text-text"
        >
          <User size={14} />
          Profile
        </DropdownMenuItem>

        {isAdmin && (
          <>
            <DropdownMenuItem
              onClick={() => router.push('/admin/write')}
              className="flex items-center gap-2 py-1.5 text-sm focus:bg-gray-100 focus:text-text"
            >
              <PenLine size={14} />
              Write
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => router.push('/admin/posts')}
              className="flex items-center gap-2 py-1.5 text-sm focus:bg-gray-100 focus:text-text"
            >
              <FileText size={14} />
              Manage Posts
            </DropdownMenuItem>
          </>
        )}

        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => signOut()}
          className="flex items-center gap-2 py-1.5 text-sm text-destructive focus:bg-red-50 focus:text-destructive"
        >
          <LogOut size={14} />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
