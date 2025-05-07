'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/home');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSignUp} className="space-y-6 w-full max-w-md bg-white p-8 rounded-2xl shadow-xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center text-red-600">Create your account</h2>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full border border-zinc-300 rounded-xl px-4 py-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full border border-zinc-300 rounded-xl px-4 py-2"
      />
      <button
        type="submit"
        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl px-4 py-2 transition"
      >
        Sign Up
      </button>
    </form>
  );
}
