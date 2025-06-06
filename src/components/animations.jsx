import React, { useEffect, useRef } from 'react';
import { View, Animated, Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

const FloatingEmoji = ({ emoji, delay = 0 }) => {
  const translateY = useRef(new Animated.Value(height + 50)).current;
  const translateX = useRef(new Animated.Value(Math.random() * width)).current;

  useEffect(() => {
    const animate = () => {
      translateY.setValue(height + 50);
      translateX.setValue(Math.random() * width);
      
      Animated.timing(translateY, {
        toValue: -100,
        duration: 8000 + Math.random() * 4000,
        useNativeDriver: true,
      }).start(() => animate());
    };

    const timer = setTimeout(animate, delay);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Animated.Text
      style={[
        styles.floatingEmoji,
        {
          transform: [
            { translateX },
            { translateY },
          ],
        },
      ]}
    >
      {emoji}
    </Animated.Text>
  );
};

export default function AnimatedBackground() {
  const emojis = ['😄', '😊', '😐', '😔', '😢', '🌟', '💛', '☀️'];
  
  return (
    <View style={styles.container}>
      {emojis.map((emoji, index) => (
        <FloatingEmoji
          key={index}
          emoji={emoji}
          delay={index * 1000}
        />
      ))}
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
    zIndex: -1,
  },
  floatingEmoji: {
    position: 'absolute',
    fontSize: 30,
    opacity: 0.6,
  },
});