'use client';

import type { IUser } from '@repo/validation';

import { useState } from 'react';
import { toast } from 'sonner';

export default function ReferButtonCopy({ user }: { user: IUser }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(`${currentUrl}/signup?r=${user.userName}`);
    setCopied(true);
    toast.success('Link has been copied!. Please share it with your friends!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button onClick={handleCopy} type="button" className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition transform hover:scale-105">
      {copied ? 'Copied!' : 'Start Referring Now'}
    </button>
  );
}
