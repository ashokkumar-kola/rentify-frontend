// FilteredPropertiesScreen.tsx
import React from "react";
import { View, Text, FlatList, ActivityIndicator, Button } from "react-native";

import { useFilterProperties } from "../../hooks/propertyHooks/useFilterProperties";

const FilteredPropertiesScreen = () => {
	const { filteredProperties, loading, refetch, updateParams } =
		useFilterProperties({
			location: "Hyderabad",
			min_price: 10000,
			max_price: 50000,
			bedrooms: 2,
			page: 1,
			limit: 10,
			sort_by: "createdAt",
			sort_order: "desc",
		});

	if (loading) {
		return <ActivityIndicator />;
	}

	return (
		<View>
			<Button
				title="Change Filters"
				onPress={() =>
					updateParams({
						location: "Mumbai",
						bedrooms: 3,
						page: 1,
						limit: 10,
					})
				}
			/>

			<FlatList
				data={filteredProperties}
				keyExtractor={(item) => item._id}
				renderItem={({ item }) => (
					<View style={{ marginBottom: 16 }}>
						<Text>{item.title}</Text>
						<Text>{item.location?.city}</Text>
						<Text>Price: ₹{item.price}</Text>
					</View>
				)}
			/>
		</View>
	);
};

export default FilteredPropertiesScreen;
