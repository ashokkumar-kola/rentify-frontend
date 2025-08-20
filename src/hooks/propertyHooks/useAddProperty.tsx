import { useState } from 'react';
import { addProperty } from '../../services/PropertyServices';
import type { Property, Location } from '../../types/Property';
import { uploadToCloudinary } from '../../utils/propertyUtils/uploadImagesToCloudinary';
import { getDecodedToken } from '../../utils/getDecodedToken';
import { Asset } from 'react-native-image-picker';

const initialData: Property = {
	title: '1BHK Studio in Madhapur',
	price: 15000,
	deposit: 30000,
	property_type: 'flat',
	location: {
		nearby: 'Near Hitech City Metro',
		street: 'Image Gardens Rd',
		locality: 'Madhapur',
		city: 'Hyderabad',
		district: 'Ranga Reddy',
		state: 'Telangana',
		country: 'India',
		zip: '500081',
		geo: {
			lat: null,
			lng: null,
		},
	},
	floor_no: 2,
	total_floors: 3,
	bedrooms: 1,
	bathrooms: 1,
	area: 450,
	carpet_area: '',
	furnishing: 'furnished',
	amenities: [],
	status: 'pending',
	facing: 'east',
	built_year: '',
	description:
		'Compact Apartment Flat ideal for working professionals. Close to IT hub.',
	images: [],
	// images: Asset[],
	// video_url: '',
};

// const Errors = {
//   title: '',
//   price: '',
//   deposit: '',
//   property_type: '',
//   floor_no: '',
//   total_floors: '',
//   bedrooms: 0,
//   bathrooms: 0,
//   // area: '',
//   // carpet_area: '',
//   // furnishing: '',
//   // amenities: [],
//   // facing: '',
//   // built_year: '',
//   // description: '',
//   // video_url: '',
// };

const useAddProperty = () => {
	const [data, setData] = useState(initialData);
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');

	const decoded = getDecodedToken();
	console.log('Decoded Token:', decoded);

	// Handle field changes
	const handleChange = (key: keyof typeof initialData, value: any) => {
		setData((prev) => ({ ...prev, [key]: value }));
		setErrors((prev) => ({ ...prev, [key]: '' }));
	};

	// Validate required fields
	const validate = () => {
		const newErrors: any = {};
		if (!data.title?.trim()) {
			newErrors.title = 'Title is required';
		}
		if (!data.price) {
			newErrors.price = 'Price is required';
		}
		if (!data.deposit) {
			newErrors.deposit = 'Deposit is required';
		}
		if (!data.property_type?.trim()) {
			newErrors.property_type = 'Property type is required';
		}
		if (!data.bedrooms) {
			newErrors.bedrooms = 'Bedrooms are required';
		}
		if (!data.bathrooms) {
			newErrors.bathrooms = 'Bathrooms are required';
		}
		// console.log('validate :', data);
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const uploadImagesToCloudinary = async (): Promise<string[]> => {
		const uploadedUrls: string[] = [];

		for (const img of data.images) {
			const res = await uploadToCloudinary(
				img,
				decoded.id,
				'temp_property'
			);
			if (res?.url) {
				uploadedUrls.push(res.url);
			}
		}

		return uploadedUrls;
	};

	const mapFormToPayload = (form: Property): Property => ({
		title: form.title.trim(),
		price: Number(form.price),
		deposit: Number(form.deposit),
		property_type: form.property_type,
		location: form.location,
		floor_no: Number(form.floor_no),
		total_floors: Number(form.total_floors),
		bedrooms: Number(form.bedrooms),
		bathrooms: Number(form.bathrooms),
		area: form.area ? Number(form.area) : '',
		carpet_area: form.carpet_area ? Number(form.carpet_area) : '',
		furnishing: form.furnishing,
		amenities: form.amenities,
		facing: form.facing,
		status: form.status,
		built_year: form.built_year ? Number(form.built_year) : null,
		description: form.description,
		images: [], // form.images
		// video_url: form.video_url,
	});

	// Submit form
	const handleAddProperty = async () => {
		if (!validate()) {
			return { success: false };
		}

		try {
			setLoading(true);

			// Upload all images to Cloudinary
			const imageUrls = await uploadImagesToCloudinary();

			// Update the `images` field in data
			const payload = {
				...mapFormToPayload(data),
				images: imageUrls,
			};

			const response = await addProperty(payload);
			setMessage(response.message);
			// console.log('Response :', response.success);
			return {
				success: response.success,
				message: response.message,
			};
		} catch (err: any) {
			const msg = err?.response?.message || 'Failed to add property';
			setMessage(msg);
			return { success: false, message: msg };
		} finally {
			setLoading(false);
		}
	};

	return {
		data,
		errors,
		loading,
		message,
		handleChange,
		handleAddProperty,
	};
};

export default useAddProperty;
