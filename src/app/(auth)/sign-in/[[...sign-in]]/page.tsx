import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center overflow-hidden">
      {/* Subtle Background Decorations */}
      <div className="absolute inset-0 z-0">
        <div className="w-96 h-96 bg-blue-200 opacity-50 rounded-full filter blur-2xl absolute -top-10 -left-20"></div>
        <div className="w-96 h-96 bg-pink-200 opacity-50 rounded-full filter blur-2xl absolute bottom-20 right-10"></div>
      </div>

      {/* Sign-In Card */}
      <div className="z-10 bg-white bg-opacity-95 rounded-xl shadow-lg p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-extrabold text-gray-700 mb-4">
          Welcome back!
        </h1>
        <p className="text-gray-600 mb-6">
          Sign in to your account and continue your journey with us.
        </p>
        <div className="mb-6">
          <SignIn />
        </div>
        <p className="text-sm text-gray-500">
          Don't have an account?{' '}
          <a
            href="/sign-up"
            className="text-blue-500 font-medium hover:underline"
          >
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
}
