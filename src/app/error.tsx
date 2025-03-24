'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function HomeError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Homepage Error:', error, 'Digest:', error.digest);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center">
        {/* Error Icon */}
        <div className="flex justify-center mb-4">
          <AlertCircle className="w-16 h-16 text-red-500" />
        </div>

        {/* Error Message */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Something Went Wrong on the Homepage</h2>
        <p className="text-gray-600 mb-4">
          We encountered an issue while loading the homepage. Let’s get you back on track.
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
        </div>
      </div>
    </div>
  );
}