import { useEffect, useState } from 'react';
import { fetchPropertyDetails } from '../../services/PropertyServices';

type Property = {
  id: string;
  [key: string]: any;
};

export const usePropertyDetails = (id: string) => {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await fetchPropertyDetails(id);
      setProperty(data);
    } catch (error) {
      console.error('Error fetching property details:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  return {
    property,
    loading,
    refetch: fetchData,
  };
};
