import { useState, useEffect, useCallback } from 'react';
import { fetchPropertyEnums } from '../../services/metaDataService';
import { EnumsData } from '../../types/Enums';

const usePropertyEnums = () => {
  const [enums, setEnums] = useState<EnumsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEnums = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const propertyEnums = await fetchPropertyEnums();
      setEnums(propertyEnums);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to fetch property enums');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEnums();
  }, [fetchEnums]);

  return {
    enums,
    loading,
    error,
    refetch: fetchEnums,
  };
};

export default usePropertyEnums;


// import { useContext } from 'react';
// import { EnumsContext } from '../../context/EnumsContext';

// export const useEnums = () => {};
