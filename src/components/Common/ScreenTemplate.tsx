import React, { ReactNode } from "react";
import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StatusBar,
	StyleSheet,
	View,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../constants/Colors";

interface ScreenTemplateProps {
	children: ReactNode;
	scrollable?: boolean;
	keyboardAvoiding?: boolean;
	backgroundColor?: string;
	safeEdges?: ("top" | "bottom")[];
}

const ScreenTemplate: React.FC<ScreenTemplateProps> = ({
	children,
	scrollable = true,
	keyboardAvoiding = true,
	backgroundColor = Colors.white,
	safeEdges = ["top", "bottom"],
}) => {
	return (
		<SafeAreaView
			edges={safeEdges}
			style={[styles.safeArea, { backgroundColor }]}
		>
			<StatusBar
				barStyle="dark-content"
				backgroundColor={backgroundColor}
			/>

			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style={[styles.container, { backgroundColor }]}>
					<KeyboardAvoidingView
						behavior={Platform.OS === "ios" ? "padding" : "height"}
						style={styles.keyboardAvoiding}
						enabled={keyboardAvoiding}
					>
						{scrollable ? (
							<ScrollView
								showsVerticalScrollIndicator={false}
								keyboardShouldPersistTaps="handled"
								contentContainerStyle={styles.scrollContent}
							>
								{children}
							</ScrollView>
						) : (
							<View style={styles.fixedContent}>{children}</View>
						)}
					</KeyboardAvoidingView>
				</View>
			</TouchableWithoutFeedback>
		</SafeAreaView>
	);
};

export default ScreenTemplate;

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
	},
	container: {
		flex: 1,
	},
	scrollContent: {
		flexGrow: 1,
		// padding: 16,
	},
	fixedContent: {
		flex: 1,
		// padding: 16,
	},
	keyboardAvoiding: {
		flex: 1,
		// backgroundColor: Colors.primary,
	},
});
