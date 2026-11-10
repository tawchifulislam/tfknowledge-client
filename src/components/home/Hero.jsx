import Image from 'next/image';
import Link from 'next/link';
import bookIllustration from '@/assets/animations/tfk_book.svg';

export default function Hero() {
  return (
    <section className="grid items-center gap-10 py-10 sm:py-12 lg:grid-cols-2 lg:py-14">
      <div className="text-center lg:text-left">
        <h1 className="mx-auto max-w-xl font-serif text-4xl font-semibold leading-tight tracking-tight text-text sm:text-5xl lg:mx-0">
          A quiet corner for curious minds
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-base text-text-muted sm:text-lg lg:mx-0">
          Original writing on ideas worth exploring. Ask for what you want to
          read, and vote on what comes next.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
          <Link
            href="/posts"
            className="rounded-full bg-text px-6 py-2.5 text-sm font-medium text-bg transition-transform hover:bg-accent active:scale-95"
          >
            Explore posts
          </Link>
          <Link
            href="/requests"
            className="rounded-full border border-border px-6 py-2.5 text-sm font-medium text-text transition-transform hover:bg-gray-50 active:scale-95"
          >
            Request a topic
          </Link>
        </div>
      </div>

      <div className="mx-auto flex h-72 w-full max-w-md items-center justify-center sm:h-80 lg:h-96 lg:max-w-lg">
        <Image
          src={bookIllustration}
          alt="An open book"
          priority
          className="h-full w-full object-contain"
        />
      </div>
    </section>
  );
}
