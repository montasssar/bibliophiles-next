import SignIn from '@/components/forms/SignIn';

export default function SignInPage() {
  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-black">

      {/* Animated Background */}
      <div
        className="absolute inset-0 z-0 bg-[url('/images/background.png')] bg-repeat bg-[length:300px] opacity-50 dark:opacity-60 animate-subtleZoomPan"
        aria-hidden="true"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-white/40 dark:bg-black/30 z-0" />

      {/* Glassmorphic Card */}
      <div className="relative z-10 w-full max-w-md p-4 sm:p-6 md:p-8">
        <SignIn />
      </div>
    </main>
  );
}
