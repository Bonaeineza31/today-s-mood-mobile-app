// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// // Remove NavigationContainer import - we don't need it here
// import { Ionicons } from '@expo/vector-icons';
// import { useTheme } from '../context/theme';

// // Import your screens
// import TodayScreen from '../screen/today';
// import HistoryScreen from '../screen/history';
// import StatsScreen from '../screen/stat';
// import ProfileScreen from '../screen/profile';

// const Tab = createBottomTabNavigator();

// export default function TabNavigator() {
//   const theme = useTheme();
  
//   return (
//     // Just return Tab.Navigator directly, no NavigationContainer
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ focused, color, size }) => {
//           let iconName;
          
//           if (route.name === 'Today') {
//             iconName = focused ? 'happy' : 'happy-outline';
//           } else if (route.name === 'History') {
//             iconName = focused ? 'time' : 'time-outline';
//           } else if (route.name === 'Stats') {
//             iconName = focused ? 'bar-chart' : 'bar-chart-outline';
//           } else if (route.name === 'Profile') {
//             iconName = focused ? 'person' : 'person-outline';
//           }
          
//           return <Ionicons name={iconName} size={size} color={color} />;
//         },
//         tabBarActiveTintColor: theme.colors.primary,
//         tabBarInactiveTintColor: theme.colors.textSecondary,
//         tabBarStyle: {
//           backgroundColor: theme.colors.surface,
//           borderTopColor: theme.colors.border,
//           height: 60,
//           paddingBottom: 8,
//           paddingTop: 8,
//         },
//         headerShown: false,
//       })}
//     >
//       <Tab.Screen name="Today" component={TodayScreen} />
//       <Tab.Screen name="History" component={HistoryScreen} />
//       <Tab.Screen name="Stats" component={StatsScreen} />
//       <Tab.Screen name="Profile" component={ProfileScreen} />
//     </Tab.Navigator>
//   );
// }