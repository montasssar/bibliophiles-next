'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <header className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-50 shadow-sm">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        {/* Left section: Logo + subtitle */}
        <div>
          <Link href="/" className="text-2xl md:text-3xl font-extrabold text-red-600 tracking-tight">
            Bibliophiles
          </Link>
          <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1">Thoughts & Pen</p>
        </div>

        {/* Middle section: Nav links */}
        <ul className="hidden md:flex space-x-6 text-sm font-medium text-gray-700 dark:text-gray-200">
          <li><Link href="/home" className="hover:text-red-600">Home</Link></li>
          <li><Link href="/community" className="hover:text-red-600">Community</Link></li>
          <li><Link href="/library" className="hover:text-red-600">Library</Link></li>
        </ul>

        {/* Right section: Auth */}
        <div>
          {currentUser ? (
            <button
              onClick={handleLogout}
              className="text-sm font-medium border border-gray-300 dark:border-gray-600 px-3 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800"
            >
              Sign Out
            </button>
          ) : (
            <Link
              href="/signin"
              className="text-sm font-medium border border-gray-300 dark:border-gray-600 px-3 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800"
            >
              Sign In
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
