import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	FlatList,
	Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

interface Property {
	_id: string;
	title: string;
	coverImage: string;
	price: number;
}

const WishlistScreen: React.FC = () => {
	const navigation = useNavigation();
	const [token, setToken] = useState<string | null>(null);
	const [wishlist, setWishlist] = useState<Property[]>([]);

	useEffect(() => {
		const checkAuth = async () => {
			const storedToken = await AsyncStorage.getItem("authToken");
			setToken(storedToken);
		};

		checkAuth();
		// TODO: Fetch wishlist from backend or context if token exists
	}, []);

	if (!token) {
		return (
			<View style={styles.emptyContainer}>
				<Text style={styles.emptyTitle}>Your Wishlist is Empty</Text>
				<Text style={styles.emptySubtitle}>
					Login to add your favourite properties
				</Text>
				<TouchableOpacity
					style={styles.loginButton}
					onPress={() => navigation.navigate("Login" as never)}
				>
					<Text style={styles.loginButtonText}>Login</Text>
				</TouchableOpacity>
			</View>
		);
	}

	if (token && wishlist.length === 0) {
		return (
			<View style={styles.emptyContainer}>
				<Text style={styles.emptyTitle}>No Favorites Yet</Text>
				<Text style={styles.emptySubtitle}>
					Explore properties and add them to your wishlist!
				</Text>
				<TouchableOpacity
					style={styles.exploreButton}
					onPress={() => navigation.navigate("Home" as never)}
				>
					<Text style={styles.exploreButtonText}>
						Explore Properties
					</Text>
				</TouchableOpacity>
			</View>
		);
	}

	return (
		<FlatList
			data={wishlist}
			keyExtractor={(item) => item._id}
			contentContainerStyle={styles.listContainer}
			renderItem={({ item }) => (
				<TouchableOpacity style={styles.card}>
					<Image
						source={{ uri: item.coverImage }}
						style={styles.cardImage}
					/>
					<View style={styles.cardContent}>
						<Text style={styles.cardTitle}>{item.title}</Text>
						<Text style={styles.cardPrice}>
							₹{item.price.toLocaleString()}
						</Text>
					</View>
				</TouchableOpacity>
			)}
		/>
	);
};

export default WishlistScreen;

const styles = StyleSheet.create({
	listContainer: {
		padding: 16,
		backgroundColor: "#f9f9f9",
	},
	card: {
		backgroundColor: "#fff",
		borderRadius: 12,
		marginBottom: 16,
		overflow: "hidden",
		elevation: 2,
	},
	cardImage: {
		width: "100%",
		height: 180,
	},
	cardContent: {
		padding: 12,
	},
	cardTitle: {
		fontSize: 16,
		fontWeight: "600",
		marginBottom: 4,
	},
	cardPrice: {
		fontSize: 14,
		color: "#007BFF",
		fontWeight: "500",
	},
	emptyContainer: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 24,
	},
	emptyTitle: {
		fontSize: 22,
		fontWeight: "700",
		marginBottom: 8,
	},
	emptySubtitle: {
		fontSize: 16,
		color: "#666",
		textAlign: "center",
		marginBottom: 20,
	},
	loginButton: {
		backgroundColor: "#007BFF",
		paddingVertical: 12,
		paddingHorizontal: 24,
		borderRadius: 8,
	},
	loginButtonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "600",
	},
	exploreButton: {
		backgroundColor: "#28A745",
		paddingVertical: 12,
		paddingHorizontal: 24,
		borderRadius: 8,
	},
	exploreButtonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "600",
	},
});
