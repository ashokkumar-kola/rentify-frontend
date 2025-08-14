import { useEffect, useState } from "react";
import { Dimensions } from "react-native";

const getDimensions = () => {
	const { width, height } = Dimensions.get("window");
	const isPortrait = height >= width;
	const aspectRatio = height / width;

	return {
		width,
		height,
		isPortrait,
		isLandscape: !isPortrait,
		aspectRatio,
		isSmallDevice: width < 360,
		isTablet: width >= 768,
		isLargeDevice: width >= 1024,
	};
};

export const useResponsive = () => {
	const [dimensions, setDimensions] = useState(getDimensions());

	useEffect(() => {
		const onChange = () => {
			setDimensions(getDimensions());
		};

		const subscription = Dimensions.addEventListener("change", onChange);
		return () => subscription?.remove();
	}, []);

	return dimensions;
};

// Example Usage
// import { useResponsive } from '../hooks/useResponsive';

// const MyComponent = () => {
//   const { width, isTablet, isSmallDevice } = useResponsive();

//   return (
//     <View style={{ paddingHorizontal: isTablet ? 32 : 16 }}>
//       <Text style={{ fontSize: isSmallDevice ? 14 : 18 }}>
//         Screen Width: {width}
//       </Text>
//     </View>
//   );
// };
