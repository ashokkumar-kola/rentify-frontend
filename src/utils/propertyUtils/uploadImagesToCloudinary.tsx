import { Asset } from 'react-native-image-picker';
import uuid from 'react-native-uuid';

export const uploadToCloudinary = async (
	image: Asset,
	userId: string,
	propertyId: string
): Promise<{
	url: string;
	public_id: string;
	format: string;
} | null> => {
	const CLOUD_NAME = 'dlrnlsds4';
	const UPLOAD_PRESET = 'rentify_mobile';

	try {
		const formData = new FormData();

		formData.append('file', {
			uri: image.uri,
			type: image.type,
			name: image.fileName ?? `image_${Date.now()}.jpg`,
		});

		formData.append('folder', `user_${userId}/property_${propertyId}`);

		const uniqueName = `img_${uuid.v4()}`;
		formData.append('public_id', uniqueName);

		formData.append('upload_preset', UPLOAD_PRESET);

		const res = await fetch(
			`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
			{
				method: 'POST',
				body: formData,
			}
		);

		const data = await res.json();

		if (!res.ok || !data.secure_url) {
			console.error('Cloudinary Upload Failed:', data);
			return null;
		}

		return {
			url: data.secure_url, // Full image URL (stored in DB)
			public_id: data.public_id, // Useful for future deletions/updates
			format: data.format, // Optional: jpg, png, etc.
		};
	} catch (error) {
		console.error('Upload to Cloudinary Error:', error);
		return null;
	}
};

// import { Asset } from 'react-native-image-picker';
// import uuid from 'react-native-uuid';

// // Uploads a selected image to Cloudinary under the correct user/property folder
// export const uploadToCloudinary = async (
//   image: Asset,
//   userId: string,
//   propertyId: string
// ): Promise<{
//   url: string;
//   public_id: string;
//   format: string;
// } | null> => {
//   const CLOUD_NAME = 'dlrnlsds4';
//   try {
//     const formData = new FormData();

//     // Convert image to Cloudinary-compatible format
//     formData.append('file', {
//       uri: image.uri,
//       type: image.type,
//       name: image.fileName ?? `image_${Date.now()}.jpg`,
//     });

//     // Use a consistent folder naming pattern
//     formData.append('folder', `user_${userId}/property_${propertyId}`);

//     // Generate a unique image ID to avoid collisions
//     const uniqueName = `img_${uuid.v4()}`;
//     formData.append('public_id', uniqueName);

//     // Upload preset from Cloudinary settings
//     formData.append('upload_preset', 'YOUR_UPLOAD_PRESET');

//     const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
//       method: 'POST',
//       body: formData,
//     });

//     const data = await res.json();
//     // Check for upload errors
//     if (!res.ok || !data.secure_url) {
//       console.error('Cloudinary Upload Failed:', data);
//       return null;
//     }

//     return {
//       url: data.secure_url,
//       public_id: data.public_id,
//       format: data.format,
//     };
//   } catch (error) {
//     console.error('Upload to Cloudinary Error:', error);
//     return null;
//   }
// };
