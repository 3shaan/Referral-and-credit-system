import SignInForm from '@/features/signin/sign-in-form';

export default function SignInPage() {
  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo/Brand */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">RewardShop</h1>
            <p className="text-indigo-100">Welcome back! Sign in to your account</p>
          </div>
          <SignInForm />
          {/* Footer Text */}
          <p className="mt-8 text-center text-sm text-indigo-100">
            © 2025 RewardShop. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
