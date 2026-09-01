'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useSession } from '@/lib/auth-client';
import { uploadImage } from '@/lib/uploadImage';
import { createPost } from '@/lib/api';
import Editor from '@/components/admin/Editor';
import Container from '@/components/layout/Container';
import { ImagePlus, X } from 'lucide-react';

export default function WritePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [tags, setTags] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (isPending) return null;

  if (!session || session.user.role !== 'admin') {
    return (
      <Container>
        <p className="py-20 text-center text-text-muted">
          You do not have access to this page.
        </p>
      </Container>
    );
  }

  const handleImageUpload = async e => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setError('');
    try {
      const url = await uploadImage(file);
      setCoverImage(url);
    } catch (err) {
      setError('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async status => {
    if (!title.trim() || !excerpt.trim() || !content.trim()) {
      setError('Title, excerpt, and content are required.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const post = await createPost({
        title,
        excerpt,
        content,
        coverImage,
        tags: tags
          .split(',')
          .map(tag => tag.trim())
          .filter(Boolean),
        status,
      });

      router.push(`/posts/${post.slug}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="max-w-3xl py-10">
      <h1 className="font-serif text-2xl font-semibold text-text">
        Write a new post
      </h1>

      {error && (
        <p className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="mt-6 space-y-5">
        <input
          type="text"
          placeholder="Post title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full border-b border-border pb-2 font-serif text-2xl font-semibold text-text placeholder:text-text-muted/50 focus:outline-none"
        />

        <textarea
          placeholder="Short excerpt (shown in previews, max 200 characters)"
          value={excerpt}
          maxLength={200}
          onChange={e => setExcerpt(e.target.value)}
          rows={2}
          className="w-full resize-none rounded-md border border-border p-3 text-sm text-text placeholder:text-text-muted/60 focus:outline-none"
        />

        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={e => setTags(e.target.value)}
          className="w-full rounded-md border border-border p-3 text-sm text-text placeholder:text-text-muted/60 focus:outline-none"
        />

        <div>
          {coverImage ? (
            <div className="relative">
              <Image
                src={coverImage}
                alt="Cover"
                width={800}
                height={224}
                className="h-56 w-full rounded-lg object-cover"
              />
              <button
                onClick={() => setCoverImage(null)}
                className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <label className="flex h-32 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border text-text-muted hover:bg-gray-50">
              <ImagePlus size={20} />
              <span className="text-sm">
                {uploading ? 'Uploading...' : 'Add a cover image'}
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={uploading}
              />
            </label>
          )}
        </div>

        <Editor content={content} onChange={setContent} />

        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={() => handleSubmit('draft')}
            disabled={submitting}
            className="rounded-full border border-border px-5 py-2 text-sm font-medium text-text hover:bg-gray-50 disabled:opacity-50"
          >
            Save as draft
          </button>
          <button
            onClick={() => handleSubmit('published')}
            disabled={submitting}
            className="rounded-full bg-text px-5 py-2 text-sm font-medium text-bg hover:bg-accent disabled:opacity-50"
          >
            {submitting ? 'Publishing...' : 'Publish'}
          </button>
        </div>
      </div>
    </Container>
  );
}
