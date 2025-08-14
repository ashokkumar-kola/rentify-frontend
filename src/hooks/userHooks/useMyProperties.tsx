import { useState, useEffect, useCallback } from "react";
import { getMyProperties } from "../../services/PropertyServices";
import { getDecodedToken } from "../../utils/getDecodedToken";

export interface Property {
	_id: string;
	title: string;
}

const useMyProperties = () => {
	const [properties, setProperties] = useState<Property[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const fetchMyProperties = useCallback(async () => {
		setLoading(true);
		setError(null);

		try {
			const tokenData = await getDecodedToken();

			if (!tokenData || !tokenData.id) {
				throw new Error("User ID not found in token.");
			}

			console.log(tokenData.id);
			const response = await getMyProperties(tokenData.id);
			setProperties(response || []);
		} catch (err: any) {
			console.error("Error fetching properties:", err);
			setError(err.message || "Failed to fetch properties.");
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchMyProperties();
	}, [fetchMyProperties]);

	return {
		properties,
		loading,
		error,
		refetch: fetchMyProperties,
	};
};

export default useMyProperties;
