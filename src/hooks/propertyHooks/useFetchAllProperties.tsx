import { useEffect, useState } from 'react';
import { fetchAllProperties } from '../../services/PropertyServices';

export const useFetchAllProperties = () => {
  const [allProperties, setAllProperties] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await fetchAllProperties();
      setAllProperties(data);
    } catch (error) {
      console.error('Error fetching all properties:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    allProperties,
    loading,
    refetch: fetchData,
  };
};
