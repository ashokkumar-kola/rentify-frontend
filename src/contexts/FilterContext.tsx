import React, { createContext, useContext, useState } from 'react';

type FilterParams = {
  location: string;
  property_type: string;
  min_price: number;
  max_price: number;
  bedrooms: number[] | null;
  bathrooms: number[] | null;
  amenities: string[] | null;
  furnishing: string[] | null;
  facing: string[] | null;
};

const defaultFilters: FilterParams = {
  location: '',
  property_type: '',
  min_price: 0,
  max_price: 10000000,
  bedrooms: null,
  bathrooms: null,
  amenities: null,
  furnishing: null,
  facing: null,
};

type FilterContextType = {
  filters: FilterParams;
  setFilters: (updates: Partial<FilterParams>) => void;
  resetFilters: () => void;
};

const FilterContext = createContext<FilterContextType>({
  filters: defaultFilters,
  setFilters: () => {},
  resetFilters: () => {},
});

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [filters, setState] = useState(defaultFilters);

  const setFilters = (updates: Partial<FilterParams>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const resetFilters = () => setState(defaultFilters);

  return (
    <FilterContext.Provider value={{ filters, setFilters, resetFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => useContext(FilterContext);
