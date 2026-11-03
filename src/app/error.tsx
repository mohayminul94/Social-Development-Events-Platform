"use client";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
      <div className="text-7xl mb-6">âš ï¸</div>
      <h2 className="text-2xl font-bold mb-3">Something went wrong</h2>
      <p className="text-base-content/60 max-w-md mb-8">
        An unexpected error occurred. Please try again.
      </p>
      <button
        onClick={reset}
        className="btn bg-green-600 hover:bg-green-700 text-white border-none"
      >
        Try Again
      </button>
    </div>
  );
}
