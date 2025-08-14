import { useState } from "react";
import {
	addToFavourites,
	removeFromFavourites,
} from "../../services/FavouritesService";

const useFavorite = (initialFavorite: boolean, propertyId: string) => {
	const [isFavorite, setIsFavorite] = useState(initialFavorite);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const toggleFavorite = async () => {
		setLoading(true);
		setError("");

		try {
			if (isFavorite) {
				await removeFromFavourites(propertyId);
				setIsFavorite(false);
			} else {
				await addToFavourites(propertyId);
				setIsFavorite(true);
			}
		} catch (err: any) {
			console.error(err);
			setError("Failed to update favorites. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return {
		isFavorite,
		loading,
		error,
		toggleFavorite,
	};
};

export default useFavorite;
