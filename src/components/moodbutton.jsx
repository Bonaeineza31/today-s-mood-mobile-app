import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';

export default function MoodButton({ mood, selected, onPress }) {
  const scale = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    if (selected) {
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [selected]);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => onPress(mood)}
    >
      <Animated.View
        style={[
          styles.moodButton,
          {
            borderColor: selected ? mood.color : '#e0e0e0',
            borderWidth: selected ? 3 : 1,
            transform: [{ scale }],
          },
        ]}
      >
        <Text style={styles.moodEmoji}>{mood.emoji}</Text>
        <Text style={styles.moodLabel}>{mood.label}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  moodButton: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  moodEmoji: {
    fontSize: 40,
    marginBottom: 10,
  },
  moodLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});