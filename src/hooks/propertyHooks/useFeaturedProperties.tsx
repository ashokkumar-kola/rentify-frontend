import { useEffect, useState } from 'react';
import { fetchFeaturedProperties } from '../../services/PropertyServices';

export const useFeaturedProperties = () => {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await fetchFeaturedProperties();
      setFeaturedProperties(data);
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
    featuredProperties,
    loading,
    refetch: fetchData,
  };
};
