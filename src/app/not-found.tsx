import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <p className="text-muted-foreground text-sm font-medium">Error 404</p>

      <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
        Page not found
      </h1>

      <p className="text-muted-foreground mt-4 max-w-md">
        The page you are looking for does not exist or may have been moved.
      </p>

      <Link
        href="/"
        className="bg-primary text-primary-foreground mt-8 rounded-md px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-90"
      >
        Return home
      </Link>
    </main>
  );
}
