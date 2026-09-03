export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/sign-in', '/api/'],
      },
    ],
    sitemap: 'https://tfknowledge.vercel.app/sitemap.xml',
  };
}
