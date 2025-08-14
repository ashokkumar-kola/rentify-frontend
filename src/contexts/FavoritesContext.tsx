import React, { createContext, useContext, useState, ReactNode } from "react";

interface FavoritesContextType {
	favorites: string[];
	toggleFavorite: (propertyId: string) => void;
	isFavorite: (propertyId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
	undefined
);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
	const [favorites, setFavorites] = useState<string[]>([]);

	const toggleFavorite = (propertyId: string) => {
		setFavorites((prev) =>
			prev.includes(propertyId)
				? prev.filter((id) => id !== propertyId)
				: [...prev, propertyId]
		);
	};

	const isFavorite = (propertyId: string) => {
		return favorites.includes(propertyId);
	};

	return (
		<FavoritesContext.Provider
			value={{ favorites, toggleFavorite, isFavorite }}
		>
			{children}
		</FavoritesContext.Provider>
	);
};

export const useFavorites = () => {
	const context = useContext(FavoritesContext);
	if (!context) {
		throw new Error("useFavorites must be used within FavoritesProvider");
	}
	return context;
};
