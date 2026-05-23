'use client';

import Link from 'next/link';
import { UserNav } from './user-nav';

export function Navbar() {
  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              Finance Dashboard
            </Link>
          </div>
          <UserNav />
        </div>
      </div>
    </nav>
  );
}
