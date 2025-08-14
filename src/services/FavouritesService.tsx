import api from "../api/apiClient";

// Add to Wishlist
export const addToFavourites = async (propertyId: string) => {
	const response = await api.post("/favourites", { propertyId });
	return response.data;
};

// Get Favourites
export const getFavourites = async () => {
	const response = await api.get("/favourites");
	return response.data;
};

// Remove from Favourites
export const removeFromFavourites = async (propertyId: string) => {
	const response = await api.delete(`/favourites/${propertyId}`);
	return response.data;
};
