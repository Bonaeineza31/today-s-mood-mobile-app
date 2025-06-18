"use client"

import { useState, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { router } from "expo-router"
import { Feather } from "@expo/vector-icons"
import AnimatedBackground from "../components/animations"

export default function AdminDashboard() {
  const [posts, setPosts] = useState([])
  const [users, setUsers] = useState([])
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPosts: 0,
    totalComments: 0,
    totalLikes: 0,
    activeUsers: 0,
  })
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      // Load posts
      const storedPosts = await AsyncStorage.getItem("communityPosts")
      const parsedPosts = storedPosts ? JSON.parse(storedPosts) : []
      setPosts(parsedPosts)

      // Simulate loading users from AsyncStorage
      // In a real app, you'd have a users collection
      const mockUsers = [
        { id: "1", name: "Admin User", email: "admin@moodsync.com", role: "admin", lastActive: "Today" },
        { id: "2", name: "John Doe", email: "john@example.com", role: "user", lastActive: "Yesterday" },
        { id: "3", name: "Jane Smith", email: "jane@example.com", role: "user", lastActive: "2 days ago" },
        { id: "4", name: "Alex Johnson", email: "alex@example.com", role: "user", lastActive: "1 week ago" },
      ]
      setUsers(mockUsers)

      // Calculate stats
      const totalComments = parsedPosts.reduce((sum, post) => sum + post.comments.length, 0)
      const totalLikes = parsedPosts.reduce((sum, post) => sum + post.likes, 0)

      setStats({
        totalUsers: mockUsers.length,
        totalPosts: parsedPosts.length,
        totalComments,
        totalLikes,
        activeUsers: mockUsers.filter((user) => user.lastActive.includes("Today")).length,
      })
    } catch (error) {
      console.log("Error loading data:", error)
      Alert.alert("Error", "Failed to load dashboard data")
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const onRefresh = () => {
    setRefreshing(true)
    loadData()
  }

  const deletePost = async (postId) => {
    Alert.alert("Delete Post", "Are you sure you want to delete this post?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            const updatedPosts = posts.filter((post) => post.id !== postId)
            await AsyncStorage.setItem("communityPosts", JSON.stringify(updatedPosts))
            setPosts(updatedPosts)

            // Update stats
            setStats((prev) => ({
              ...prev,
              totalPosts: prev.totalPosts - 1,
            }))

            Alert.alert("Success", "Post deleted successfully")
          } catch (error) {
            console.log("Error deleting post:", error)
            Alert.alert("Error", "Failed to delete post")
          }
        },
      },
    ])
  }

  const handleBackToMain = () => {
    router.replace("/main")
  }

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6C63FF" />
        <Text style={styles.loadingText}>Loading admin dashboard...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <AnimatedBackground />

      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackToMain}>
            <Feather name="arrow-left" size={24} color="#2D3748" />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Admin Dashboard</Text>
            <Text style={styles.headerSubtitle}>Manage MoodSync</Text>
          </View>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#6C63FF"]} />}
        >
          {/* Stats Overview */}
          <View style={styles.statsContainer}>
            <Text style={styles.sectionTitle}>Overview</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>{stats.totalUsers}</Text>
                <Text style={styles.statLabel}>Users</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>{stats.totalPosts}</Text>
                <Text style={styles.statLabel}>Posts</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>{stats.activeUsers}</Text>
                <Text style={styles.statLabel}>Active Today</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>{stats.totalComments}</Text>
                <Text style={styles.statLabel}>Comments</Text>
              </View>
            </View>
          </View>

          {/* Recent Users */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Users</Text>
            {users.map((user) => (
              <View key={user.id} style={styles.userCard}>
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>{user.name}</Text>
                  <Text style={styles.userEmail}>{user.email}</Text>
                </View>
                <View style={styles.userMeta}>
                  <Text style={[styles.userRole, user.role === "admin" && styles.adminRole]}>{user.role}</Text>
                  <Text style={styles.userActive}>{user.lastActive}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Content Moderation */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Content Moderation</Text>
            {posts.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>No posts to moderate</Text>
              </View>
            ) : (
              posts.map((post) => (
                <View key={post.id} style={styles.postCard}>
                  <View style={styles.postHeader}>
                    <View>
                      <Text style={styles.postTitle}>{post.title}</Text>
                      <Text style={styles.postAuthor}>
                        By {post.author} • {post.date}
                      </Text>
                    </View>
                    <TouchableOpacity style={styles.deleteButton} onPress={() => deletePost(post.id)}>
                      <Feather name="trash-2" size={18} color="#FF6B6B" />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.postContent} numberOfLines={2}>
                    {post.content}
                  </Text>
                  <View style={styles.postStats}>
                    <Text style={styles.postStat}>
                      <Feather name="heart" size={14} color="#6C63FF" /> {post.likes}
                    </Text>
                    <Text style={styles.postStat}>
                      <Feather name="message-circle" size={14} color="#6C63FF" /> {post.comments.length}
                    </Text>
                  </View>
                </View>
              ))
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F7FAFC",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#718096",
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(226,232,240,0.5)",
  },
  backButton: {
    marginRight: 16,
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2D3748",
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#718096",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  statsContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2D3748",
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statCard: {
    width: "48%",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#6C63FF",
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
    color: "#718096",
  },
  section: {
    marginBottom: 24,
  },
  userCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2D3748",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: "#718096",
  },
  userMeta: {
    alignItems: "flex-end",
  },
  userRole: {
    fontSize: 12,
    backgroundColor: "#E2E8F0",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    color: "#4A5568",
    marginBottom: 4,
  },
  adminRole: {
    backgroundColor: "#6C63FF",
    color: "white",
  },
  userActive: {
    fontSize: 12,
    color: "#718096",
  },
  postCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  postHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2D3748",
    marginBottom: 4,
    flex: 1,
  },
  postAuthor: {
    fontSize: 12,
    color: "#718096",
  },
  deleteButton: {
    padding: 4,
  },
  postContent: {
    fontSize: 14,
    color: "#4A5568",
    marginBottom: 12,
  },
  postStats: {
    flexDirection: "row",
    gap: 16,
  },
  postStat: {
    fontSize: 14,
    color: "#718096",
  },
  emptyState: {
    padding: 24,
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 16,
  },
  emptyText: {
    fontSize: 16,
    color: "#718096",
  },
})
