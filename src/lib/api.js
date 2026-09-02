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
    const error = await res.json();
    throw new Error(error.message || 'Failed to post comment');
  }

  return res.json();
};

export const deleteComment = async commentId => {
  const res = await fetch(`${SERVER_URL}/api/comments/${commentId}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || `Failed with status ${res.status}`);
  }

  return res.json();
};

export const getAllTopicRequests = async () => {
  const res = await fetch(`${SERVER_URL}/api/topic-requests`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch topic requests');
  }

  return res.json();
};

export const createTopicRequest = async (title, reason) => {
  const res = await fetch(`${SERVER_URL}/api/topic-requests`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ title, reason }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to submit request');
  }

  return res.json();
};

export const deleteTopicRequest = async topicRequestId => {
  const res = await fetch(
    `${SERVER_URL}/api/topic-requests/${topicRequestId}`,
    {
      method: 'DELETE',
      credentials: 'include',
    },
  );

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to delete request');
  }

  return res.json();
};

export const castVote = async (topicRequestId, value) => {
  const res = await fetch(`${SERVER_URL}/api/votes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ topicRequestId, value }),
  });

  if (!res.ok) {
    throw new Error('Failed to vote');
  }

  return res.json();
};

export const getUserVote = async topicRequestId => {
  const res = await fetch(`${SERVER_URL}/api/votes/${topicRequestId}`, {
    credentials: 'include',
    cache: 'no-store',
  });

  if (!res.ok) {
    return { value: 0 };
  }

  return res.json();
};
export const updateTopicStatus = async (topicRequestId, status) => {
  const res = await fetch(
    `${SERVER_URL}/api/topic-requests/${topicRequestId}/status`,
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ status }),
    },
  );

  if (!res.ok) {
    throw new Error('Failed to update status');
  }

  return res.json();
};
