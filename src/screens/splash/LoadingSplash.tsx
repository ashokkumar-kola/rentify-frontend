import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../../constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
  cancelAnimation,
  runOnJS,
} from 'react-native-reanimated';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

type LoadingSplashProps = {
  duration?: number; // Total splash duration in ms (default: 2000)
  iconColor?: string; // Icon color (default: Colors.primary)
  onFinish?: () => void; // Callback after splash ends
};

const LoadingSplash: React.FC<LoadingSplashProps> = ({
  duration = 2000,
  iconColor = Colors.primary,
  onFinish,
}) => {
  const scale = useSharedValue(5.0); // Start at 120px (5x of 24px)
  const opacity = useSharedValue(1); // For fade-out

  useEffect(() => {
    // Animation sequence: shrink from 5.0 (120px) to 1.0 (24px), then pulse
    scale.value = withSequence(
      // Shrink from 120px to 24px
      withTiming(1.0, { duration: 800, easing: Easing.out(Easing.quad) }),
      // Pulse between 1.0 and 1.2
      withRepeat(
        withTiming(1.2, { duration: 600, easing: Easing.inOut(Easing.ease) }, () => {
          scale.value = withTiming(1.0, { duration: 600, easing: Easing.inOut(Easing.ease) });
        }),
        -1, // Infinite loop until duration
        true // Reverse
      )
    );

    // Fade out and trigger callback after duration
    const timer = setTimeout(() => {
      cancelAnimation(scale);
      opacity.value = withTiming(
        0,
        { duration: 300, easing: Easing.out(Easing.ease) },
        () => {
          if (onFinish) {
            runOnJS(onFinish)(); // Safely call onFinish on JS thread
          }
        }
      );
    }, duration);

    return () => {
      clearTimeout(timer);
      cancelAnimation(scale);
      cancelAnimation(opacity);
    };
  }, [scale, opacity, duration, onFinish]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <View style={styles.container}>
      <AnimatedIcon
        name="home"
        size={42} // Base size for animation (24px)
        color={iconColor}
        style={animatedStyle}
      />
    </View>
  );
};

export default LoadingSplash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
});
