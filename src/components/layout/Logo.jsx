import Link from 'next/link';
import Image from 'next/image';

export default function Logo({ showText = true }) {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image
        src="/images/tfk_logo.svg"
        alt="Thirsty for Knowledge logo"
        width={28}
        height={28}
        priority
        className="h-6 w-6 sm:h-7 sm:w-7"
      />
      {showText && (
        <span className="font-serif leading-none text-text">
          <span className="hidden text-xs font-medium tracking-wide text-text/70 sm:block">
            Thirsty For
          </span>
          <span className="block text-sm font-semibold tracking-tight">
            Knowledge
          </span>
        </span>
      )}
    </Link>
  );
}
