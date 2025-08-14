import { useEffect, useState } from 'react';
import { fetchNewArrivals } from '../../services/PropertyServices';

export const useNewArrivals = () => {
	const [newArrivals, setNewArrivals] = useState([]);
	const [loading, setLoading] = useState(false);

	const fetchData = async () => {
		try {
			setLoading(true);
			const data = await fetchNewArrivals();
			setNewArrivals(data);
		} catch (error) {
			console.error('Error fetching new arrivals:', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return {
		newArrivals,
		loading,
		refetch: fetchData,
	};
};
