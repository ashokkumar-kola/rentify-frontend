import React, { useState } from "react";

import {
	View,
	TextInput,
	StyleSheet,
	Pressable,
	TouchableOpacity,
} from "react-native";

import { Colors, TextSizes, Spacing, Fonts } from "../../constants";
import Icons from "../../constants/Icons";
import LinearGradient from "react-native-linear-gradient";

import { useNavigation } from "@react-navigation/native";

import AppText from "../AppTheme/AppText";

const SearchBar = () => {
	const [isPressed, setIsPressed] = useState(false);
	const navigation = useNavigation();

	return (
		<View style={styles.searchBar}>
			<LinearGradient
				colors={[Colors.blue100, Colors.blue300]}
				style={styles.searchButton}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
			>
				<Icons.FA name="search" size={20} color={Colors.white100} />
			</LinearGradient>

			<TextInput
				placeholder="Search by City, Location, ..."
				placeholderTextColor={Colors.textGrey}
				style={styles.searchInput}
			/>

			{/* <LinearGradient
                colors={[Colors.blue100, Colors.blue300]}
                style={styles.searchButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <Icons.FA name="search" size={20} color={Colors.white100} />
            </LinearGradient> */}

			<LinearGradient
				colors={[Colors.blue100, Colors.blue300]}
				style={styles.filterButton}
				// style={styles.nextButton}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
			>
				<TouchableOpacity
					// style={styles.filterButton}
					onPress={() => navigation.navigate("Filters")}
				>
					<Icons.FA name="sliders" size={20} color="#fff" />
				</TouchableOpacity>
			</LinearGradient>
		</View>
	);
};

export default SearchBar;

const styles = StyleSheet.create({
	searchBar: {
		width: "90%",
		height: 56,
		backgroundColor: Colors.white,
		margin: Spacing.sm,
		borderTopLeftRadius: 28,
		borderTopRightRadius: 8,
		borderBottomLeftRadius: 28,
		borderBottomRightRadius: 8,
		borderWidth: 1.5,
		borderColor: Colors.primary,
		paddingLeft: 8,
		paddingRight: 8,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},

	searchContainer: {
		flex: 1,
	},

	activeBackground: {
		backgroundColor: Colors.white100,
	},

	searchInput: {
		flex: 1,
		fontFamily: Fonts.Regular,
		fontSize: TextSizes.md,
		color: Colors.textGrey,
	},

	searchButton: {
		width: 40,
		height: 40,
		borderRadius: 20,
		justifyContent: "center",
		alignItems: "center",
	},

	filterButton: {
		backgroundColor: Colors.primary,
		padding: 10,
		borderRadius: 8,
		justifyContent: "center",
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.2,
		shadowRadius: 2,
		elevation: 3,
	},
});
