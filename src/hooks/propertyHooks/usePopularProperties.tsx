import { useEffect, useState } from 'react';
import { fetchPopularProperties } from '../../services/PropertyServices';

export const usePopularProperties = () => {
	const [popularProperties, setPopularProperties] = useState([]);
	const [loading, setLoading] = useState(false);

	const fetchData = async () => {
		try {
			setLoading(true);
			const data = await fetchPopularProperties();
			setPopularProperties(data);
		} catch (error) {
			console.error('Error fetching popular properties:', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return {
		popularProperties,
		loading,
		refetch: fetchData,
	};
};
