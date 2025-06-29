import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { Platform } from "react-native";
import { useAuth } from "../src/context/authcontext";

// Screens
import TodayScreen from "../src/screen/today";
import ChatScreen from "../src/screen/chat";
import HistoryScreen from "../src/screen/history";
import StatsScreen from "../src/screen/stat";
import ProfileScreen from "../src/screen/profile";
import CommunityScreen from "../src/screen/community";

const Tab = createBottomTabNavigator();

export default function Main() {
  const { user } = useAuth();
  const role = user?.role;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let IconComponent;

          if (route.name === "Today") {
            IconComponent = MaterialCommunityIcons;
            iconName = focused ? "emoticon-happy" : "emoticon-happy-outline";
          } else if (route.name === "Chat") {
            IconComponent = Feather;
            iconName = "message-circle";
          } else if (route.name === "Community") {
            IconComponent = Feather;
            iconName = "heart";
          } else if (route.name === "History") {
            IconComponent = Feather;
            iconName = "calendar";
          } else if (route.name === "Stats") {
            IconComponent = Feather;
            iconName = "trending-up";
          } else if (route.name === "Profile") {
            IconComponent = Feather;
            iconName = "user";
          }

          return <IconComponent name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#6C63FF",
        tabBarInactiveTintColor: "#A0AEC0",
        tabBarStyle: {
          backgroundColor: "rgba(255,255,255,0.95)",
          borderTopColor: "rgba(226,232,240,0.8)",
          borderTopWidth: 1,
          height: Platform.OS === "ios" ? 85 : 70,
          paddingBottom: Platform.OS === "ios" ? 25 : 15,
          paddingTop: 10,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 20,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.15,
          shadowRadius: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
        headerShown: false,
      })}
    >
      {/* Shared screens for all roles */}
      <Tab.Screen name="Today" component={TodayScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Community" component={CommunityScreen} />

      {/* Only users and admins can access History, Stats, Profile */}
      {(role === "user" || role === "admin") && (
        <>
          <Tab.Screen name="History" component={HistoryScreen} />
          <Tab.Screen name="Stats" component={StatsScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </>
      )}
    </Tab.Navigator>
  );
}
