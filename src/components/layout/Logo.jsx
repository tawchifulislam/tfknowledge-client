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
      />
      {showText && (
        <span className="font-serif leading-none text-text">
          <span className="block text-xs font-medium tracking-wide text-text/70">
            Thirsty For
          </span>
          <span className="mt-0.5 block text-sm font-semibold tracking-tight">
            Knowledge
          </span>
        </span>
      )}
    </Link>
  );
}
