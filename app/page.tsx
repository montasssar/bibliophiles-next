// app/page.tsx
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bibliophiles | Thoughts & Pen',
  description: 'Sign up to read or write all that’s on your mind.',
};

export default function LandingPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-red-50 px-4">
      <div className="max-w-2xl w-full bg-white shadow-xl rounded-2xl p-10 text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-red-600 tracking-tight">
          Bibliophiles
        </h1>
        <p className="text-zinc-700 text-lg md:text-xl">
          SIGN UP TO READ OR WRITE ALL WHAT'S ON YOUR MIND.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <Link
            href="/signup"
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl shadow transition font-semibold text-sm tracking-wide"
          >
            Sign Up
          </Link>
          <Link
            href="/home"
            className="border border-zinc-300 hover:border-red-600 hover:text-red-600 text-zinc-700 px-6 py-2 rounded-xl transition font-semibold text-sm tracking-wide"
          >
            Explore
          </Link>
        </div>
      </div>
    </main>
  );
}
