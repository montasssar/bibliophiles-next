'use client';

import { useState } from 'react';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { User } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import DOMPurify from 'dompurify';

interface Props {
  user: User;
}

export default function PostEditor({ user }: Props) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert('Title and content are required.');
      return;
    }

    try {
      setSubmitting(true);

      const sanitized = DOMPurify.sanitize(content);

      await addDoc(collection(db, 'posts'), {
        title: title.trim(),
        content: sanitized,
        authorId: user.uid,
        authorName: user.displayName || user.email || 'Anonymous',
        status: 'pending',
        createdAt: Timestamp.now(),
      });

      alert('✅ Post submitted for review.');
      router.push('/community');
    } catch (err) {
      console.error('Error submitting post:', err);
      alert('Something went wrong. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Title
        </label>
        <input
          type="text"
          className="mt-1 block w-full px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 dark:focus:ring-red-600"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={100}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Your Writing
        </label>
        <textarea
          rows={10}
          className="mt-1 block w-full px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 dark:focus:ring-red-600"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your poem, thought, or reflection here..."
          required
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex items-center px-6 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold shadow-md disabled:opacity-50 transition"
      >
        {submitting ? 'Submitting...' : 'Submit for Review'}
      </button>
    </form>
  );
}
