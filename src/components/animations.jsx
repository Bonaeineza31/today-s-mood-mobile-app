import React, { useEffect, useRef } from 'react';
import { View, Animated, Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

const BouncingSmiley = ({ emoji, delay = 0 }) => {
  const translateX = useRef(new Animated.Value(Math.random() * (width - 50))).current;
  const translateY = useRef(new Animated.Value(Math.random() * (height - 200))).current;
  const scale = useRef(new Animated.Value(0.5 + Math.random() * 0.5)).current;
  
  // Fix: Keep these as ref objects, don't call .current
  const directionX = useRef((Math.random() - 0.5) * 2); // -1 to 1
  const directionY = useRef((Math.random() - 0.5) * 2); // -1 to 1
  
  useEffect(() => {
    const animateBouncing = () => {
      const duration = 2000 + Math.random() * 1000; // 2-3 seconds per movement
      
      // Calculate next position
      const currentX = translateX._value;
      const currentY = translateY._value;
      
      let nextX = currentX + (directionX.current * (100 + Math.random() * 100));
      let nextY = currentY + (directionY.current * (100 + Math.random() * 100));
      
      // Bounce off walls
      if (nextX <= 0 || nextX >= width - 50) {
        directionX.current *= -1; // Reverse X direction
        nextX = Math.max(0, Math.min(width - 50, nextX));
      }
      
      if (nextY <= 50 || nextY >= height - 200) {
        directionY.current *= -1; // Reverse Y direction
        nextY = Math.max(50, Math.min(height - 200, nextY));
      }
      
      // Animate to next position
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: nextX,
          duration: duration,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: nextY,
          duration: duration,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Continue bouncing
        animateBouncing();
      });
    };

    // Start with delay
    const timer = setTimeout(animateBouncing, delay);
    
    return () => clearTimeout(timer);
  }, [translateX, translateY, directionX, directionY]);

  return (
    <Animated.Text
      style={[
        styles.bouncingSmiley,
        {
          transform: [
            { translateX },
            { translateY },
            { scale },
          ],
        },
      ]}
    >
      {emoji}
    </Animated.Text>
  );
};

export default function AnimatedBackground() {
  const smileys = ['😊', '😄', '🥰', '😍', '🤗', '😎', '🥳', '😇', '🙂', '😋'];
  
  return (
    <View style={styles.container} pointerEvents="none">
      {/* Create bouncing smileys */}
      {Array.from({ length: 12 }, (_, index) => (
        <BouncingSmiley
          key={index}
          emoji={smileys[index % smileys.length]}
          delay={index * 500} // Stagger the start times
        />
      ))}
      
      {/* Background gradient */}
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
    backgroundColor: '#F0F8FF', // Light blue background
  },
  bouncingSmiley: {
    position: 'absolute',
    fontSize: 35,
    opacity: 0.7,
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
});