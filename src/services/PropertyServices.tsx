import api from '../api/apiClient';

import type { FilterPropertiesParams, Property } from '../types/Property';

// All Properties
export const fetchAllProperties = async () => {
	const response = await api.get('/properties');
	return response.data;
};

// New Arrivals
export const fetchNewArrivals = async () => {
	const response = await api.get(
		'/properties/filter?sort_by=createdAt&sort_order=desc'
	);
	return response.data?.data.properties || [];
};

// Popular Properties
export const fetchPopularProperties = async () => {
	const response = await api.get('/properties/filter?is_popular=true');
	return response.data?.data.properties || [];
};

// Featured Properties
export const fetchFeaturedProperties = async () => {
	const response = await api.get('/properties/filter?is_featured=true');
	return response.data?.data.properties || [];
};

// Filtered Properties
export const filterProperties = async (params: FilterPropertiesParams) => {
	const response = await api.get('/properties/filter', {
		params,
	});
	return response.data;
};

// Property Details
export const fetchPropertyDetails = async (id: string) => {
	const response = await api.get(`/properties/${id}`);
	return response.data?.data || {};
};

export const getMyProperties = async (userId: any) => {
	const response = await api.get(`/properties/${userId}/my-properties`);
	return response.data?.data;
};

export const addProperty = async (propertyData: Property) => {
	const response = await api.post('/properties', propertyData, {
		headers: {
			'Content-Type': 'application/json',
		},
	});
	return response.data;
};

export const updateProperty = async (propertyData: Property) => {
	const response = await api.put('/properties', propertyData, {
		headers: {
			'Content-Type': 'application/json',
		},
	});
	return response.data;
};

export const deleteProperty = async (propertyId: string) => {
	try {
		const response = await api.delete(`/properties/${propertyId}`);
		return response.data;
	} catch (error) {
		console.error('Failed to delete property:', error);
		throw error;
	}
};

// export const fetchFilteredProperties = async (filters: any) => {
//     const params = new URLSearchParams();

//     if (filters.searchQuery) {params.append('search', filters.searchQuery);}

//     if (filters.propertyTypes?.length) {params.append('propertyTypes', filters.propertyTypes.join(','));}
//     if (filters.bedrooms !== 'Any') {params.append('bedrooms', filters.bedrooms);}
//     if (filters.bathrooms !== 'Any') {params.append('bathrooms', filters.bathrooms);}
//     if (filters.amenities?.length) {params.append('amenities', filters.amenities.join(','));}
//     if (filters.priceRange) {
//       params.append('minPrice', filters.priceRange[0].toString());
//       params.append('maxPrice', filters.priceRange[1].toString());
//     }
//     if (filters.furnishing !== 'Any') {params.append('furnishing', filters.furnishing);}
//     if (filters.sortBy) {params.append('sortBy', filters.sortBy);}
//     if (filters.petPolicy !== 'Any') {params.append('petPolicy', filters.petPolicy);}

//     const response = await api.get(`/properties/filter?${params.toString()}`);
//     return response.data?.data || [];
// };

// Flats
export const flatProperties = async () => {
	const response = await api.get('/properties/filter?property_type=flat');
	return response.data?.data || [];
};

// Independent Houses
export const independentHouseProperties = async () => {
	const response = await api.get(
		'/properties/filter?property_type=independent house'
	);
	return response.data?.data || [];
};
