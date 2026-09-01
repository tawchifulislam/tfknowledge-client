const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const createPost = async postData => {
  const res = await fetch(`${SERVER_URL}/api/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(postData),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to create post');
  }

  return res.json();
};

export const getAllPosts = async () => {
  const res = await fetch(`${SERVER_URL}/api/posts`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }

  return res.json();
};

export const getPostBySlug = async slug => {
  const res = await fetch(`${SERVER_URL}/api/posts/${slug}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
};
