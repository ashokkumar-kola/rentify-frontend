import React, { createContext, useState, useEffect, ReactNode } from "react";

import { fetchPropertyEnums } from "../services/metaDataService";

import { EnumsData } from "../types/Enums";

interface EnumsContextProps {
	enums: EnumsData | null;
	loading: boolean;
	error: string | null;
	refetch: () => void;
}

export const EnumsContext = createContext<EnumsContextProps>({
	enums: null,
	loading: true,
	error: null,
	refetch: () => {},
});

export const EnumsProvider = ({ children }: { children: ReactNode }) => {
	const [enums, setEnums] = useState<EnumsData | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const fetchEnums = React.useCallback(async () => {
		setLoading(true);
		setError(null);
		try {
			const propertyEnums = await fetchPropertyEnums();
			setEnums(propertyEnums);

			console.log(enums);
		} catch (err: any) {
			setError(
				err?.response?.data?.message || "Failed to fetch property enums"
			);
		} finally {
			setLoading(false);
		}
	}, [enums]);

	useEffect(() => {
		fetchEnums();
	}, []);

	return (
		<EnumsContext.Provider
			value={{ enums, loading, error, refetch: fetchEnums }}
		>
			{children}
		</EnumsContext.Provider>
	);
};
