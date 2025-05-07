import SignUp from '@/components/forms/SignUp';

export default function SignUpPage() {
  return (
    <main className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* 🔄 Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-red-100 animate-pulse-fast opacity-60 z-0" />
      
      {/* 🧾 Form content */}
      <div className="z-10 w-full px-4">
        <SignUp />
      </div>
    </main>
  );
}
