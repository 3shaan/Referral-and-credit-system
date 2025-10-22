'use client';
import type { UserLoginPayload } from '@repo/validation';

import { zodResolver } from '@hookform/resolvers/zod';
import { userloginPayload } from '@repo/validation';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { Activity, useState } from 'react';
import { useForm } from 'react-hook-form';
import { login } from '@/action/auth';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },

  } = useForm<UserLoginPayload>({
    mode: 'onBlur',
    resolver: zodResolver(userloginPayload),
  });

  const onSubmit = async (data: UserLoginPayload) => {
    const result = await login(data.email, data.password);
    if (result.success) {
      toast.success(result.message)
      router.push("/")
    } else {
      toast.error(result.message)
    }


  };

  return (

    <div className="bg-white rounded-2xl shadow-2xl p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Sign In</h2>

      <div className="space-y-6">
        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            {...register('email', {
              required: 'Email is required',
            })}
            className={`w-full text-black px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition ${errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            placeholder="you@example.com"
          />
          <Activity mode={errors.email ? 'visible' : 'hidden'}>
            <p className="mt-1 text-sm text-red-600">{errors?.email?.message}</p>
          </Activity>

        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              {...register('password', {
                required: 'Password is required',
              })}
              className={`w-full text-black px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition pr-12 ${errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <Activity mode={showPassword ? 'visible' : 'hidden'}>
                <Eye />
              </Activity>
              <Activity mode={showPassword ? 'hidden' : 'visible'}>
                <EyeOff />
              </Activity>

            </button>
          </div>
          <Activity mode={errors.password ? 'visible' : 'hidden'}>
            <p className="mt-1 text-sm text-red-600">{errors?.password?.message}</p>
          </Activity>

        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-end">
          {/* <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              {...register('remember')}
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <span className="ml-2 text-sm text-gray-700">Remember me</span>
          </label> */}
          <Link href="#" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
            Forgot password?
          </Link>
        </div>

        {/* Submit Button */}
        <button
          type="button"
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >

          <Activity mode={isSubmitting ? 'visible' : 'hidden'}>
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing in...
            </span>
          </Activity>
          <Activity mode={isSubmitting ? 'hidden' : 'visible'}>
            <span className="flex items-center justify-center">
              Sign In
            </span>
          </Activity>
        </button>
      </div>

      {/* Sign Up Link */}
      <p className="mt-6 text-center text-sm text-gray-600">
        Don't have an account?
        {' '}
        <Link href="/signup" className="text-indigo-600 hover:text-indigo-700 font-medium">
          Sign up for free
        </Link>
      </p>
    </div>

  );
}
