'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import AdminDashboard from 'components/writings/AdminDashboard';

export default function AdminPostsPage() {
  const [admin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // 🔐 Optional: Replace this check with a proper admin claim or UID list
      const adminUIDs = ['YOUR_ADMIN_UID_HERE'];
      setAdmin(user ? adminUIDs.includes(user.uid) : false);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 text-zinc-500 dark:text-zinc-400">
        Loading admin access...
      </div>
    );
  }

  if (!admin) {
    return (
      <div className="text-center py-20 text-zinc-600 dark:text-zinc-400">
        🔒 Access denied. Admins only.
      </div>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-8">
        🛠 Pending Post Moderation
      </h1>
      <AdminDashboard />
    </main>
  );
}
