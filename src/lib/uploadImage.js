// Unsigned browser upload to Cloudinary. No secret is involved: the upload
// preset (set to "Unsigned" in the Cloudinary console) controls what is allowed.
export const uploadImage = async file => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error('Cloudinary is not configured');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: 'POST',
      body: formData,
    },
  );

  const data = await res.json();

  if (!res.ok || !data.secure_url) {
    throw new Error(data?.error?.message || 'Image upload failed');
  }

  return data.secure_url;
};
