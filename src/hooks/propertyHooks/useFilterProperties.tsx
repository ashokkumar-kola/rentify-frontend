import { useEffect, useState, useCallback } from 'react';
import { filterProperties } from '../../services/PropertyServices';
import { useFilters } from '../../contexts/FilterContext';

export const useFilterProperties = () => {
	const { filters } = useFilters();
	const [properties, setProperties] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	// const [location, setLocation] = useState(params.location);
	// const [property_type, setProperty_type] = useState(params.property_type);

	const fetchFilteredProperties = useCallback(async () => {
		try {
			setLoading(true);
			setError(null);

			// Params
			const params = {
				location: filters.location || undefined,
				property_type: filters.property_type || undefined,
				min_price: filters.min_price > 0 ? filters.min_price : undefined,
				max_price: filters.max_price || undefined,
				// bedrooms: filters.bedrooms !== null ? filters.bedrooms : undefined,
				// bathrooms: filters.bathrooms !== null ? filters.bathrooms : undefined,
				bedrooms: filters.bedrooms?.length ? filters.bedrooms.join(',') : undefined,
				bathrooms: filters.bathrooms?.length ? filters.bathrooms.join(',') : undefined,
				amenities: filters.amenities?.length
					? filters.amenities.map(a => a.toLowerCase()).join(',')
					: undefined,
				furnishing: filters.furnishing?.length ? filters.furnishing.join(',') : undefined,
				facing: filters.facing?.length ? filters.facing.join(',') : undefined,
			};
			Object.keys(params).forEach((key) => {
				if (params[key] === undefined) {delete params[key];}
			});
			console.log(params);
			const response = await filterProperties(params);
			setProperties(response?.data.properties || []);
			// console.log(response?.data.properties);
		} catch (err) {
			setError(err as Error);
		} finally {
			setLoading(false);
		}
	}, [filters]);

	useEffect(() => {
		fetchFilteredProperties();
	}, [fetchFilteredProperties]);

	return {
		properties,
		loading,
		error,
		refetch: fetchFilteredProperties,
	};
};



// import { useEffect, useState, useCallback, useRef } from 'react';
// import { filterProperties } from '../../services/PropertyServices';
// import { FilterParams, Property } from '../../types/Property';

// interface UseFilterPropertiesOptions {
//   injectPremium?: boolean;
//   premiumInterval?: number;
// }

// const useFilterProperties = (
//   initialParams: FilterParams,
//   options: UseFilterPropertiesOptions = {}
// ) => {
//   const { injectPremium = false, premiumInterval = 8 } = options;

//   const [properties, setProperties] = useState<any>([]);
//   const [premiumPool, setPremiumPool] = useState<any>([]);
//   const [loading, setLoading] = useState(false);
//   const [params, setParams] = useState<FilterParams>(initialParams);
//   const [error, setError] = useState<string | null>(null);
//   const [page, setPage] = useState(initialParams.page || 1);
//   const [hasNextPage, setHasNextPage] = useState(true);

//   const abortRef = useRef<AbortController | null>(null);
//   const premiumIndexRef = useRef(0);

//   const injectPremiumItems = useCallback((list: any) => {
//     if (!injectPremium || premiumPool.length === 0) {return list;}

//     const result: any = [];
//     for (let i = 0; i < list.length; i++) {
//       result.push(list[i]);

//       // insert premium every N items
//       if ((i + 1) % premiumInterval === 0 && premiumIndexRef.current < premiumPool.length) {
//         const premium = premiumPool[premiumIndexRef.current];
//         result.push(premium);
//         premiumIndexRef.current++;
//       }
//     }
//     return result;
//   }, [injectPremium, premiumPool, premiumInterval]);

//   const fetchProperties = useCallback(
//     async (overrideParams?: Partial<FilterParams>, reset = false) => {
//       try {
//         setLoading(true);
//         setError(null);

//         // Cancel any ongoing request
//         if (abortRef.current) {abortRef.current.abort();}
//         const controller = new AbortController();
//         abortRef.current = controller;

//         const requestParams = {
//           ...params,
//           ...overrideParams,
//           page: reset ? 1 : page,
//         };

//         const res = await filterProperties(requestParams);

//         const newData: any = res?.data.properties || [];
//         const finalList = injectPremiumItems(newData);

//         setProperties(prev =>
//           reset ? finalList : [...prev, ...finalList]
//         );

//         // Detect if more pages exist
//         if (newData.length < (requestParams.limit || 10)) {
//           setHasNextPage(false);
//         } else {
//           setHasNextPage(true);
//         }

//         if (reset) {setPage(1);}
//       } catch (err: any) {
//         if (err.name !== 'AbortError') {
//           setError(err.message || 'Failed to fetch properties');
//           console.error('Error fetching filtered properties:', err);
//         }
//       } finally {
//         setLoading(false);
//       }
//     },
//     [params, page, injectPremiumItems]
//   );

//   const loadNextPage = useCallback(() => {
//     if (!loading && hasNextPage) {
//       setPage(prev => prev + 1);
//     }
//   }, [loading, hasNextPage]);

//   // Fetch premium pool once if enabled
//   useEffect(() => {
//     if (injectPremium) {
//       const controller = new AbortController();
//       filterProperties({ is_featured: true, limit: 10 })
//         .then(res => setPremiumPool(res?.data || []))
//         .catch(() => {});
//       return () => controller.abort();
//     }
//   }, [injectPremium]);

//   // Refetch on param/page change
//   useEffect(() => {
//     fetchProperties({}, page === 1);
//   }, [page, params, fetchProperties]);

//   return {
//     properties,
//     loading,
//     error,
//     hasNextPage,
//     setParams,
//     loadNextPage,
//     refetch: () => fetchProperties({}, true),
//   };
// };

// export default useFilterProperties;

// import { useEffect, useState, useCallback } from 'react';
// import { filterProperties } from '../../services/PropertyServices';
// import { FilterPropertiesParams } from '../../types/Property';
import { propertyTypes } from '../../constants/Filters';

// export const useFilterProperties = (initialParams: FilterPropertiesParams) => {
// 	const [filteredProperties, setFilteredProperties] = useState([]);
// 	const [loading, setLoading] = useState(false);
// 	const [params, setParams] = useState<FilterPropertiesParams>(initialParams);
// 	const [error, setError] = useState<Error | null>(null);

// 	const fetchFilteredProperties = useCallback(async () => {
// 		try {
// 			setLoading(true);
// 			const res = await filterProperties(params);
// 			setFilteredProperties(res.data);
// 		} catch (err) {
// 			setError(err as Error);
// 			console.error('Error fetching filtered properties:', error);
// 		} finally {
// 			setLoading(false);
// 		}
// 	}, [params, error]);

// 	useEffect(() => {
// 		fetchFilteredProperties();
// 	}, [fetchFilteredProperties]);

// 	return {
// 		filteredProperties,
// 		loading,
// 		refetch: fetchFilteredProperties,
// 		updateParams: setParams,
// 		error,
// 	};
// };
