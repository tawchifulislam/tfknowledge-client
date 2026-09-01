'use client';

import { signIn } from '@/lib/auth-client';

export default function SignInButtons() {
  const handleGoogleSignIn = () => {
    signIn.social({
      provider: 'google',
      callbackURL: `${window.location.origin}/`,
    });
  };

  const handleFacebookSignIn = () => {
    signIn.social({
      provider: 'facebook',
      callbackURL: `${window.location.origin}/`,
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={handleGoogleSignIn}
        className="px-4 py-2 border rounded-lg hover:bg-gray-50"
      >
        Continue with Google
      </button>
      <button
        onClick={handleFacebookSignIn}
        className="px-4 py-2 border rounded-lg hover:bg-gray-50"
      >
        Continue with Facebook
      </button>
    </div>
  );
}
