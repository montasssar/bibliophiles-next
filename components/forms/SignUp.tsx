'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { FcGoogle } from 'react-icons/fc';

export default function SignUp() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      router.push('/home');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push('/home');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSignUp}
      className="space-y-6 w-full max-w-md bg-white p-8 rounded-2xl shadow-xl mx-auto mt-10"
    >
      <h2 className="text-2xl font-bold text-center text-red-600">Create your account</h2>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      <button
        type="button"
        onClick={handleGoogleSignIn}
        className="w-full border border-zinc-300 rounded-xl py-2 px-4 flex items-center justify-center gap-2 hover:bg-zinc-50 transition"
        disabled={loading}
      >
        <FcGoogle className="text-xl" />
        <span className="font-medium text-sm">Continue with Google</span>
      </button>

      <div className="text-center text-sm text-zinc-400">or</div>

      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full border border-zinc-300 rounded-xl px-4 py-2"
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full border border-zinc-300 rounded-xl px-4 py-2"
      />

      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border border-zinc-300 rounded-xl px-4 py-2 pr-12"
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute inset-y-0 right-3 text-sm text-red-600 font-medium"
        >
          {showPassword ? 'Hide' : 'Show'}
        </button>
      </div>

      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        className="w-full border border-zinc-300 rounded-xl px-4 py-2"
      />

      <button
        type="submit"
        disabled={loading}
        className={`w-full bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl px-4 py-2 transition ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {loading ? 'Creating Account...' : 'Sign Up'}
      </button>

      <p className="text-sm text-zinc-600 text-center">
        <span className="text-zinc-500">✨</span> Join{' '}
        <span className="font-semibold text-red-600">Home</span> — your space to read & write freely.
      </p>

      <p className="text-sm text-zinc-600 text-center">
        Already have an account?{' '}
        <a href="/signin" className="text-red-600 underline">
          Sign in
        </a>
      </p>
    </form>
  );
}
