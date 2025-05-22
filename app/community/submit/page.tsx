'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import PostEditor from 'components/writings/PostEditor';

export default function SubmitPostPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe(); // Clean up listener
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 text-zinc-500 dark:text-zinc-400">
        Loading your session...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-20 text-zinc-600 dark:text-zinc-400">
        🚫 You must be signed in to submit a post.<br />
        <span className="text-sm mt-2 block">Please log in to share your thoughts with the community.</span>
      </div>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">✍️ Submit Your Writing</h1>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-1">
          Your words matter — share your thoughts, poems, or reflections.
        </p>
      </div>

      <PostEditor user={user} />
    </main>
  );
}
