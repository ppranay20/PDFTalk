import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center">
        {/* 404 Icon */}
        <div className="flex justify-center mb-4">
          <AlertCircle className="w-16 h-16 text-yellow-500" />
        </div>

        {/* 404 Message */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-4">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        {/* Navigation Options */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Go to Homepage
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}