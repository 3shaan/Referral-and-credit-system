'use client';

import { signup } from '@/action/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { userRegisterPayload, UserRegisterPayload } from '@repo/validation';
import { Gift, Lock, Mail, User, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Activity } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';


export default function SignupForm() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserRegisterPayload>({
    resolver: zodResolver(userRegisterPayload),
  });

  const onSubmit = async (data: UserRegisterPayload) => {
    const result = await signup(data)
    if (result.success) {
      toast.success(result.message)
      router.push("/")
    } else {
      toast.error(result.message)
    }

  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Account</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              {...register('name')}
              id="name"
              type="text"
              className={`w-full text-black pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition ${errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="John Doe"
            />
          </div>
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        {/* Username Field */}
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
            Username
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <UserPlus className="h-5 w-5 text-gray-400" />
            </div>
            <input
              {...register('userName')}
              id="userName"
              type="text"
              className={`w-full text-black pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition ${errors.username ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="johndoe123"
            />
          </div>
          <Activity mode={errors.userName ? "visible" : "hidden"}>
            <p className="mt-1 text-sm text-red-600">{errors.userName?.message}</p>
          </Activity>
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              {...register('email')}
              id="email"
              type="email"
              className={`w-full text-black pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition ${errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="john@example.com"
            />
          </div>
          <Activity mode={errors.email ? "visible" : "hidden"}>
            <p className="mt-1 text-sm text-red-600">{errors.email?.message}</p>
          </Activity>
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              {...register('password')}
              id="password"
              type="password"
              className={`w-full text-black pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition ${errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="••••••••"
            />
          </div>

          <Activity mode={errors.password ? "visible" : "hidden"}>
            <p className="mt-1 text-sm text-red-600">{errors.password?.message}</p>
          </Activity>
        </div>

        {/* Referrer Name Field (Optional) */}
        <div>
          <label htmlFor="referrerName" className="block text-sm font-medium text-gray-700 mb-2">
            Referred By  <span className="text-gray-400 text-xs">(Optional)</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Gift className="h-5 w-5 text-gray-400" />
            </div>
            <input
              {...register('referredBy')}
              id="referrerName"
              type="text"
              className="w-full text-black pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              placeholder="Who referred you?"
            />
          </div>

          <Activity mode={errors.referredBy ? "visible" : "hidden"}>
            <p className="mt-1 text-sm text-red-600">{errors.referredBy?.message}</p>
          </Activity>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Activity mode={isSubmitting ? "visible" : "hidden"}>

            <span className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Creating Account...
            </span>

          </Activity>
          <Activity mode={isSubmitting ? "hidden" : "visible"}>
            <span>
              Create Account
            </span>
          </Activity>
        </button>
      </form>

      {/* Sign In Link */}
      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link href="/signin" className="font-medium text-purple-600 hover:text-purple-500">
          Sign in
        </Link>
      </p>
    </div>
  );
}
