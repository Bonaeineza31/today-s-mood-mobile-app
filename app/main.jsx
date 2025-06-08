import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons"
import { Platform } from "react-native"

// Import screens
import TodayScreen from "../src/screen/today"
import ChatScreen from "../src/screen/chat"
import HistoryScreen from "../src/screen/history"
import StatsScreen from "../src/screen/stat"
import ProfileScreen from "../src/screen/profile"

const Tab = createBottomTabNavigator()

export default function Main() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName
          let IconComponent

          if (route.name === "Today") {
            IconComponent = MaterialCommunityIcons
            iconName = focused ? "emoticon-happy" : "emoticon-happy-outline"
          } else if (route.name === "Chat") {
            IconComponent = Feather
            iconName = "message-circle"
          } else if (route.name === "History") {
            IconComponent = Feather
            iconName = "calendar"
          } else if (route.name === "Stats") {
            IconComponent = Feather
            iconName = "trending-up"
          } else if (route.name === "Profile") {
            IconComponent = Feather
            iconName = "user"
          }

          return <IconComponent name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: "#6C63FF",
        tabBarInactiveTintColor: "#A0AEC0",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopColor: "#E2E8F0",
          borderTopWidth: 1,
          height: Platform.OS === "ios" ? 85 : 65,
          paddingBottom: Platform.OS === "ios" ? 25 : 10,
          paddingTop: 10,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Today" component={TodayScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Stats" component={StatsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  )
}
