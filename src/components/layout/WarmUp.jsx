'use client';

import { useEffect } from 'react';

// Fire-and-forget ping: starts waking the Render server the moment someone
// opens any page, so comments, reactions and sign-in are ready sooner.
export default function WarmUp() {
  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SERVER_URL;
    if (!url) return;
    fetch(`${url}/api/health`, { mode: 'no-cors', cache: 'no-store' }).catch(
      () => {},
    );
  }, []);

  return null;
}
