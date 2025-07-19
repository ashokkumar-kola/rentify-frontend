import api from '../api/apiClient';

// All Properties
export const fetchAllProperties = async () => {
    const response = await api.get('/properties');
    return response.data?.data || [];
};

// New Arrivals
export const fetchNewArrivals = async () => {
    const response = await api.get('/properties/filter?sort_by=createdAt&sort_order=desc');
    console.log(response);
    return response.data?.data || [];
};

// Popular Properties
export const fetchPopularProperties = async () => {
    const response = await api.get('/properties/filter?is_popular=true');
    return response.data?.data || [];
};

// Featured Properties
export const fetchFeaturedProperties = async () => {
    const response = await api.get('/properties/filter?is_featured=true');
    return response.data?.data || [];
};

// Filtered Properties
export const fetchFilteredProperties = async (filters: any) => {
    const params = new URLSearchParams();

    if (filters.searchQuery) {params.append('search', filters.searchQuery);}
    if (filters.propertyTypes?.length) {params.append('propertyTypes', filters.propertyTypes.join(','));}
    if (filters.bedrooms !== 'Any') {params.append('bedrooms', filters.bedrooms);}
    if (filters.bathrooms !== 'Any') {params.append('bathrooms', filters.bathrooms);}
    if (filters.amenities?.length) {params.append('amenities', filters.amenities.join(','));}
    if (filters.priceRange) {
      params.append('minPrice', filters.priceRange[0].toString());
      params.append('maxPrice', filters.priceRange[1].toString());
    }
    if (filters.furnishing !== 'Any') {params.append('furnishing', filters.furnishing);}
    if (filters.sortBy) {params.append('sortBy', filters.sortBy);}
    if (filters.petPolicy !== 'Any') {params.append('petPolicy', filters.petPolicy);}

    const response = await api.get(`/properties/filter?${params.toString()}`);
    return response.data?.data || [];
};
