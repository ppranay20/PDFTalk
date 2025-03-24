'use client';

import { useEffect } from 'react';

import { AlertCircle, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Error:', error, 'Digest:', error.digest);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center">
        {/* Error Icon */}
        <div className="flex justify-center mb-4">
          <AlertCircle className="w-16 h-16 text-red-500" />
        </div>

        {/* Error Message */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something Went Wrong</h2>
        <p className="text-gray-600 mb-4">
          An unexpected error occurred. We’re sorry for the inconvenience.
        </p>
        {error.message && (
          <p className="text-sm text-gray-500 mb-4">
            Error: {error.message}
            {error.digest && <span> (Digest: {error.digest})</span>}
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={() => reset()}
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </Button>
          <Link href="/">
            <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-100">
              Go to Homepage
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}