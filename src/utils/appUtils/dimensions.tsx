import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;

export const isSmallDevice = width < 360;
export const isTablet = width >= 768;
export const isLargeDevice = width >= 1024;
export const isPortrait = height >= width;
export const isLandscape = !isPortrait;

export const scaleSize = (size: number) => (width / 375) * size;

// Example Usage
// import { SCREEN_WIDTH, isTablet, scaleSize } from '../utils/dimensions';

// const MyComponent = () => {
//   return (
//     <View style={{ padding: isTablet ? 24 : 16 }}>
//       <Text style={{ fontSize: scaleSize(16) }}>Width: {SCREEN_WIDTH}</Text>
//     </View>
//   );
// };
