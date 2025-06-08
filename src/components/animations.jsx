import React, { useEffect, useRef } from 'react';
import { View, Animated, Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

const FloatingSmiley = ({ emoji, delay = 0 }) => {
  const translateY = useRef(new Animated.Value(-50)).current;
  const translateX = useRef(new Animated.Value(Math.random() * (width - 50))).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.5 + Math.random() * 0.5)).current;

  useEffect(() => {
    const startFloating = () => {
      // Reset to top
      translateY.setValue(-50);
      translateX.setValue(Math.random() * (width - 50));
      opacity.setValue(0);

      // Start floating down
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: height + 50, // Go all the way to bottom
          duration: 8000 + Math.random() * 4000, // 8-12 seconds
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 0.6,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0.3,
            duration: 6000,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
        // Gentle side-to-side drift
        Animated.loop(
          Animated.sequence([
            Animated.timing(translateX, {
              toValue: translateX._value + (Math.random() - 0.5) * 100,
              duration: 2000,
              useNativeDriver: true,
            }),
            Animated.timing(translateX, {
              toValue: translateX._value - (Math.random() - 0.5) * 100,
              duration: 2000,
              useNativeDriver: true,
            }),
          ])
        ),
      ]).start(() => {
        // Restart the animation
        startFloating();
      });
    };

    const timer = setTimeout(startFloating, delay);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Animated.Text
      style={[
        styles.floatingSmiley,
        {
          transform: [
            { translateX },
            { translateY },
            { scale },
          ],
          opacity,
        },
      ]}
    >
      {emoji}
    </Animated.Text>
  );
};

export default function AnimatedBackground() {
  const smileys = ['😊', '😄', '🥰', '😍', '🤗', '😎', '🥳', '😇', '🙂', '😋', '💝', '🌟', '✨', '🌈'];
  
  return (
    <View style={styles.container} pointerEvents="none">
      {Array.from({ length: 12 }, (_, index) => (
        <FloatingSmiley
          key={index}
          emoji={smileys[index % smileys.length]}
          delay={index * 1000} // Stagger every second
        />
      ))}
      {/* React Native compatible background */}
      <View style={styles.gradientOverlay} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#E6F3FF', // Light blue - React Native compatible
  },
  floatingSmiley: {
    position: 'absolute',
    fontSize: 30,
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
});