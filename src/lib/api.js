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
