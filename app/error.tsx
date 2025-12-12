"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">500</h1>
        <p className="text-xl mb-4">Something went wrong</p>
        <button onClick={reset} className="px-4 py-2 bg-blue-500 text-white rounded">
          Try again
        </button>
      </div>
    </div>
  );
}
