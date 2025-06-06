import React from 'react';
import TabNavigator from '../src/navigation/navigator';

export default function MainScreen() {
  // Remove NavigationContainer - expo-router already provides one
  return <TabNavigator />;
}