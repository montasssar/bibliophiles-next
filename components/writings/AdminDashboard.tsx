'use client';

import { useEffect, useState } from 'react';
import { Post } from 'services/types/post';
import {
  getPostsByStatus,
  approvePost,
  rejectPost,
} from '@/services/sources/postService';

export default function AdminDashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const pending = await getPostsByStatus('pending');
      setPosts(pending);
      setLoading(false);
    };
    fetch();
  }, []);

  const handleApprove = async (postId: string) => {
    await approvePost(postId);
    setPosts((prev) => prev.filter((p) => p.id !== postId));
  };

  const handleReject = async (postId: string) => {
    const note = prompt('Optional rejection note:');
    await rejectPost(postId, note || '');
    setPosts((prev) => prev.filter((p) => p.id !== postId));
  };

  if (loading) {
    return <div className="text-zinc-500 dark:text-zinc-400">Loading posts...</div>;
  }

  if (posts.length === 0) {
    return <div className="text-zinc-500 dark:text-zinc-400">No pending posts found.</div>;
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl p-6 shadow-sm"
        >
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
            {post.title}
          </h2>
          <div
            className="prose prose-zinc dark:prose-invert max-w-none mb-4"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <div className="text-sm text-zinc-500 mb-4">By {post.authorName}</div>
          <div className="flex gap-3">
            <button
              onClick={() => handleApprove(post.id!)}
              className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white text-sm font-medium"
            >
              ✅ Approve
            </button>
            <button
              onClick={() => handleReject(post.id!)}
              className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-medium"
            >
              ❌ Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
