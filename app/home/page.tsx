// app/home/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home | Bibliophiles',
  description: 'Search books, preview them, and enjoy curated literary quotes.',
};

export default function HomePage() {
  return (
    <section className="min-h-screen bg-white px-4 py-16">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-5xl font-extrabold text-red-600">Welcome to Bibliophiles</h1>
          <p className="text-lg md:text-xl text-zinc-600">
            Search and preview books, explore inspiring literary quotes, and build your personal library.
          </p>
        </div>

        {/* Placeholder for future content */}
        <div className="bg-zinc-50 border border-dashed border-zinc-300 rounded-xl p-8 text-center shadow-sm text-zinc-500">
          🚧 Search & Quote Feed Under Construction...
        </div>
      </div>
    </section>
  );
}
