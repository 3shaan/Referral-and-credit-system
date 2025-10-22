import SignupForm from "@/features/signup/signup-form";
import { Gift } from "lucide-react";



export default async function SignUp({ searchParams }: { searchParams: Promise<{ r?: string }> }) {
  const referCode = (await searchParams).r
  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg mb-4">
              <Gift className="w-8 h-8 text-purple-600" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">RewardShop</h1>
            <p className="text-purple-100">Join and start earning rewards today!</p>
          </div>
          <SignupForm referCode={referCode} />

          <p className="mt-6 text-center text-sm text-purple-100">
            By signing up, you agree to our Terms and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  )
}
