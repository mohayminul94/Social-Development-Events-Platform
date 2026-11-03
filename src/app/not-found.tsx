import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
      <div className="text-8xl mb-6">ðŸŒ¿</div>
      <h1 className="text-5xl font-extrabold mb-4 text-green-600">404</h1>
      <h2 className="text-2xl font-bold mb-3">Page Not Found</h2>
      <p className="text-base-content/60 max-w-md mb-8">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/" className="btn bg-green-600 hover:bg-green-700 text-white border-none">
        Go to Home
      </Link>
    </div>
  );
}
