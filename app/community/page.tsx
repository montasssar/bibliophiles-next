import Link from 'next/link';
import CommunityFeed from 'components/writings/CommunityFeed';

export default function CommunityPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
          📚 Community Writings
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400 text-lg">
          Discover original thoughts, poems, and reflections by fellow Bibliophiles.
        </p>

        <Link
          href="/community/submit"
          className="mt-6 inline-block px-5 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl shadow-md transition"
        >
          ✍️ Share Your Writing
        </Link>
      </div>

      <CommunityFeed />
    </main>
  );
}
