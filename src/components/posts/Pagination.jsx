import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ currentPage, totalPages }) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-10 flex items-center justify-center gap-4">
      <Link
        href={`/posts?page=${currentPage - 1}`}
        aria-disabled={currentPage <= 1}
        className={`flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-sm ${
          currentPage <= 1
            ? 'pointer-events-none opacity-40'
            : 'text-text hover:bg-gray-50'
        }`}
      >
        <ChevronLeft size={14} />
        Prev
      </Link>

      <span className="text-sm text-text-muted">
        Page {currentPage} of {totalPages}
      </span>

      <Link
        href={`/posts?page=${currentPage + 1}`}
        aria-disabled={currentPage >= totalPages}
        className={`flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-sm ${
          currentPage >= totalPages
            ? 'pointer-events-none opacity-40'
            : 'text-text hover:bg-gray-50'
        }`}
      >
        Next
        <ChevronRight size={14} />
      </Link>
    </div>
  );
}
