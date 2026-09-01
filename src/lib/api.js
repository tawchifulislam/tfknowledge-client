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
export const toggleReaction = async (postId, type) => {
  const res = await fetch(`${SERVER_URL}/api/reactions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ postId, type }),
  });

  if (!res.ok) {
    throw new Error('Failed to react');
  }

  return res.json();
};

export const getPostReactions = async postId => {
  const res = await fetch(`${SERVER_URL}/api/reactions/${postId}`, {
    credentials: 'include',
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch reactions');
  }

  return res.json();
};

export const getPostComments = async postId => {
  const res = await fetch(`${SERVER_URL}/api/comments/${postId}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch comments');
  }

  return res.json();
};

export const createComment = async (postId, content, parentCommentId) => {
  const res = await fetch(`${SERVER_URL}/api/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ postId, content, parentCommentId }),
  });

  if (!res.ok) {
    throw new Error('Failed to post comment');
  }

  return res.json();
};

export const deleteComment = async commentId => {
  const res = await fetch(`${SERVER_URL}/api/comments/${commentId}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Failed to delete comment');
  }

  return res.json();
};
