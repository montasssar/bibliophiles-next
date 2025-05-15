'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function SignIn() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(email, password);
      router.push('/home');
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to sign in.';
      setError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="backdrop-blur-lg bg-white/70 dark:bg-zinc-900/60 border border-white/40 dark:border-zinc-700 shadow-2xl rounded-2xl p-6 md:p-8"
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-red-600 tracking-tight">
        Welcome Back
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg bg-white/80 dark:bg-zinc-800 border-gray-300 dark:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg bg-white/80 dark:bg-zinc-800 border-gray-300 dark:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
          />
        </div>

        {error && <p className="text-sm text-red-600 -mt-2">{error}</p>}

        <motion.button
          whileTap={{ scale: 0.97 }}
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50"
        >
          {loading ? 'Signing you in...' : 'Sign In'}
        </motion.button>
      </form>

      <p className="mt-6 text-sm text-center text-gray-600 dark:text-gray-400">
        New here?{' '}
        <Link href="/signup" className="text-red-600 font-medium hover:underline">
          Create an account
        </Link>
      </p>
    </motion.div>
  );
}
