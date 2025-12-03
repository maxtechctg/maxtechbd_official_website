import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadToCloudinary(
  file: string,
  folder: string = 'maxtech',
  isSvg: boolean = false
): Promise<string> {
  const uploadOptions: Record<string, unknown> = {
    folder,
    resource_type: 'image',
  };

  if (isSvg) {
    uploadOptions.format = 'svg';
    uploadOptions.flags = 'sanitize';
  }

  const result = await cloudinary.uploader.upload(file, uploadOptions);
  return result.secure_url;
}

export async function uploadVideoToCloudinary(
  file: string,
  folder: string = 'maxtech/videos'
): Promise<string> {
  const uploadOptions: Record<string, unknown> = {
    folder,
    resource_type: 'video',
    chunk_size: 6000000,
  };

  const result = await cloudinary.uploader.upload(file, uploadOptions);
  return result.secure_url;
}

export async function deleteFromCloudinary(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId);
}

export function getPublicIdFromUrl(url: string): string | null {
  try {
    const regex = /\/upload\/(?:v\d+\/)?(.+)\.\w+$/;
    const match = url.match(regex);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}

export default cloudinary;
