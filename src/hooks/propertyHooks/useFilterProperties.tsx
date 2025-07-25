// hooks/useFilterProperties.ts
import { useEffect, useState, useCallback } from 'react';
import { filterProperties } from '../../services/PropertyServices';
import { FilterPropertiesParams } from '../../types/Property';

export const useFilterProperties = (initialParams: FilterPropertiesParams) => {
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState<FilterPropertiesParams>(initialParams);

  const fetchFilteredProperties = useCallback(async () => {
    try {
      setLoading(true);
      const data = await filterProperties(params);
      setFilteredProperties(data);
    } catch (error) {
      console.error('Error fetching filtered properties:', error);
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchFilteredProperties();
  }, [fetchFilteredProperties]);

  return {
    filteredProperties,
    loading,
    refetch: fetchFilteredProperties,
    updateParams: setParams,
  };
};
