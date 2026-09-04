'use client';

import { useEffect } from 'react';

export default function LangSetter({ lang }) {
  useEffect(() => {
    const prevLang = document.documentElement.lang;
    document.documentElement.lang = lang;

    return () => {
      document.documentElement.lang = prevLang;
    };
  }, [lang]);

  return null;
}
