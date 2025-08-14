import { useState, useEffect, useCallback } from "react";
import {
	fetchPropertyDetails,
	updateProperty,
} from "../../services/PropertyServices";
import type { Property } from "../../types/Property";
import { uploadToCloudinary } from "../../utils/propertyUtils/uploadImagesToCloudinary";
import { getDecodedToken } from "../../utils/getDecodedToken";
import { Asset } from "react-native-image-picker";

interface UseEditPropertyProps {
	propertyId: string;
}

const useEditProperty = ({ propertyId }: UseEditPropertyProps) => {
	const [data, setData] = useState<Property | null>(null);
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");
	const [initialImages, setInitialImages] = useState<string[]>([]);

	const [decoded, setDecoded] = useState<any>(null);

	/** Fetch property details on mount */
	useEffect(() => {
		const fetchProperty = async () => {
			try {
				setLoading(true);
				const response = await fetchPropertyDetails(propertyId);
				if (response?.data) {
					setData(response.data);
					setInitialImages(response.data.images || []);
				}
			} catch {
				setMessage("Failed to load property details.");
			} finally {
				setLoading(false);
			}
		};
		fetchProperty();
	}, [propertyId]);

	useEffect(() => {
		const fetchDecoded = async () => {
			const token = await getDecodedToken();
			setDecoded(token);
		};
		fetchDecoded();
	}, []);

	/** Handle form field changes */
	const handleChange = (key: keyof Property, value: any) => {
		if (!data) {
			return;
		}
		setData((prev) => (prev ? { ...prev, [key]: value } : prev));
		setErrors((prev) => ({ ...prev, [key]: "" }));
	};

	/** Validation for required fields */
	const validate = useCallback(() => {
		if (!data) {
			return false;
		}
		const newErrors: Record<string, string> = {};

		if (!data.title?.trim()) {
			newErrors.title = "Title is required";
		}
		if (!data.price) {
			newErrors.price = "Price is required";
		}
		if (!data.deposit) {
			newErrors.deposit = "Deposit is required";
		}
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	}, [data]);

	/** Upload new images to Cloudinary */
	const uploadImagesToCloudinary = useCallback(
		async (images: (string | Asset)[]): Promise<string[]> => {
			const uploadedUrls: string[] = [];

			for (const img of images) {
				if (typeof img === "string") {
					uploadedUrls.push(img); // keep existing URLs
				} else {
					if (!decoded?.id) {
						continue;
					}
					const res = await uploadToCloudinary(
						img,
						decoded.id,
						"property_updates"
					);
					if (res?.url) {
						uploadedUrls.push(res.url);
					}
				}
			}
			return uploadedUrls;
		},
		[decoded]
	);

	/** Map form data to backend payload */
	const mapFormToPayload = (form: Property): Partial<Property> => ({
		title: form.title.trim(),
		price: Number(form.price),
		deposit: Number(form.deposit),
		property_type: form.property_type,
		location: form.location,
		floor_no: Number(form.floor_no),
		total_floors: Number(form.total_floors),
		bedrooms: Number(form.bedrooms),
		bathrooms: Number(form.bathrooms),
		area: form.area ? Number(form.area) : "",
		carpet_area: form.carpet_area || "",
		furnishing: form.furnishing,
		amenities: form.amenities,
		facing: form.facing,
		status: form.status,
		built_year: form.built_year ? Number(form.built_year) : null,
		description: form.description,
		images: [],
	});

	/** Submit updated property */
	const handleEditProperty = useCallback(async () => {
		if (!data) {
			return { success: false };
		}
		if (!validate()) {
			return { success: false };
		}

		try {
			setLoading(true);
			const imageUrls = await uploadImagesToCloudinary(data.images);
			const payload = { ...mapFormToPayload(data), images: imageUrls };

			const response = await updateProperty(payload);
			setMessage(response.message || "Property updated successfully");

			return { success: response.success, message: response.message };
		} catch (err: any) {
			const msg = err?.response?.message || "Failed to update property";
			setMessage(msg);
			return { success: false, message: msg };
		} finally {
			setLoading(false);
		}
	}, [data, propertyId, uploadImagesToCloudinary, validate]);

	return {
		data,
		errors,
		loading,
		message,
		handleChange,
		handleEditProperty,
	};
};

export default useEditProperty;
