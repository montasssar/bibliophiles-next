'use client';

import { usePosts } from '@/hooks/usePosts';
import { motion } from 'framer-motion';

export default function CommunityFeed() {
  const { posts, loading } = usePosts({ status: 'approved' });

  if (loading) {
    return (
      <div className="text-center py-10 text-zinc-500 dark:text-zinc-400">
        Loading inspiring writings...
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-10 text-zinc-500 dark:text-zinc-400">
        No writings shared yet. Be the first to contribute!
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {posts.map((post, index) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl shadow-md p-6"
        >
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
            {post.title}
          </h2>
          <div
            className="prose prose-zinc dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
            — {post.authorName || 'Anonymous'}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
