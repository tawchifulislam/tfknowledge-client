"use client";

import { signIn } from "@/lib/auth-client";

export default function SignInButtons() {
  const handleGoogleSignIn = () => {
    signIn.social({
      provider: "google",
      callbackURL: `${window.location.origin}/`,
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={handleGoogleSignIn}
        className="rounded-full border border-border px-4 py-2.5 text-sm font-medium text-text hover:bg-gray-50"
      >
        Continue with Google
      </button>
    </div>
  );
}