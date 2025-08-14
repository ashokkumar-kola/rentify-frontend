import { useEffect, useState } from 'react';
import { fetchAllProperties } from '../../services/PropertyServices';

export const useFetchAllProperties = () => {
	const [allProperties, setAllProperties] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	const fetchData = async () => {
		try {
			setLoading(true);
			const res = await fetchAllProperties();
			setAllProperties(res.data);
		} catch (err) {
			setError(err as Error);
			console.error('Error fetching all properties:', err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return {
		properties: allProperties,
		loading,
		refetch: fetchData,
		error,
	};
};
