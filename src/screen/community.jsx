"use client"

import { useState, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
} from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import AnimatedBackground from "../components/animations"
import { useAuth } from "../context/authcontext"

export default function CommunityScreen() {
  const { user } = useAuth()
  const [posts, setPosts] = useState([])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newPost, setNewPost] = useState({ title: "", content: "", mood: "😊" })
  const [selectedPost, setSelectedPost] = useState(null)
  const [comment, setComment] = useState("")
  const [isAdmin] = useState(user?.email === "admin@moodsync.com") // Simple admin check

  const moods = ["😊", "😄", "🥰", "😍", "🤗", "😎", "🥳", "😇", "🙂", "😋"]

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    try {
      const storedPosts = await AsyncStorage.getItem("communityPosts")
      if (storedPosts) {
        setPosts(JSON.parse(storedPosts))
      }
    } catch (error) {
      console.log("Error loading posts:", error)
    }
  }

  const savePosts = async (updatedPosts) => {
    try {
      await AsyncStorage.setItem("communityPosts", JSON.stringify(updatedPosts))
      setPosts(updatedPosts)
    } catch (error) {
      console.log("Error saving posts:", error)
    }
  }

  const createPost = async () => {
    if (!newPost.title.trim() || !newPost.content.trim()) {
      Alert.alert("Error", "Please fill in all fields")
      return
    }

    const post = {
      id: Date.now().toString(),
      title: newPost.title,
      content: newPost.content,
      mood: newPost.mood,
      author: user?.name || "Anonymous",
      authorEmail: user?.email,
      date: new Date().toLocaleDateString(),
      comments: [],
      likes: 0,
    }

    const updatedPosts = [post, ...posts]
    await savePosts(updatedPosts)
    setNewPost({ title: "", content: "", mood: "😊" })
    setShowCreateModal(false)
    Alert.alert("Success", "Your story has been shared! 💙")
  }

  const deletePost = async (postId) => {
    const post = posts.find((p) => p.id === postId)
    const canDelete = isAdmin || post.authorEmail === user?.email

    if (!canDelete) {
      Alert.alert("Error", "You can only delete your own posts")
      return
    }

    Alert.alert("Delete Post", "Are you sure you want to delete this story?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          const updatedPosts = posts.filter((p) => p.id !== postId)
          await savePosts(updatedPosts)
        },
      },
    ])
  }

  const addComment = async (postId) => {
    if (!comment.trim()) return

    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [
            ...post.comments,
            {
              id: Date.now().toString(),
              text: comment,
              author: user?.name || "Anonymous",
              date: new Date().toLocaleDateString(),
            },
          ],
        }
      }
      return post
    })

    await savePosts(updatedPosts)
    setComment("")
  }

  const likePost = async (postId) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return { ...post, likes: post.likes + 1 }
      }
      return post
    })
    await savePosts(updatedPosts)
  }

  return (
    <View style={styles.container}>
      <AnimatedBackground />

      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Community Stories 💙</Text>
          <Text style={styles.headerSubtitle}>Share your MoodSync journey</Text>
          {isAdmin && <Text style={styles.adminBadge}>Admin</Text>}
        </View>

        {/* Create Post Button */}
        <TouchableOpacity style={styles.createButton} onPress={() => setShowCreateModal(true)}>
          <Text style={styles.createButtonText}>+ Share Your Story</Text>
        </TouchableOpacity>

        {/* Posts List */}
        <ScrollView style={styles.postsContainer} showsVerticalScrollIndicator={false}>
          {posts.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyEmoji}>📝</Text>
              <Text style={styles.emptyTitle}>No stories yet</Text>
              <Text style={styles.emptyText}>Be the first to share your MoodSync journey!</Text>
            </View>
          ) : (
            posts.map((post) => (
              <View key={post.id} style={styles.postCard}>
                <View style={styles.postHeader}>
                  <View style={styles.postAuthor}>
                    <Text style={styles.postMood}>{post.mood}</Text>
                    <View>
                      <Text style={styles.authorName}>{post.author}</Text>
                      <Text style={styles.postDate}>{post.date}</Text>
                    </View>
                  </View>
                  {(isAdmin || post.authorEmail === user?.email) && (
                    <TouchableOpacity onPress={() => deletePost(post.id)} style={styles.deleteButton}>
                      <Text style={styles.deleteText}>🗑️</Text>
                    </TouchableOpacity>
                  )}
                </View>

                <Text style={styles.postTitle}>{post.title}</Text>
                <Text style={styles.postContent}>{post.content}</Text>

                <View style={styles.postActions}>
                  <TouchableOpacity onPress={() => likePost(post.id)} style={styles.likeButton}>
                    <Text style={styles.actionText}>💙 {post.likes}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setSelectedPost(selectedPost === post.id ? null : post.id)}
                    style={styles.commentButton}
                  >
                    <Text style={styles.actionText}>💬 {post.comments.length}</Text>
                  </TouchableOpacity>
                </View>

                {/* Comments Section */}
                {selectedPost === post.id && (
                  <View style={styles.commentsSection}>
                    <View style={styles.commentInput}>
                      <TextInput
                        style={styles.commentTextInput}
                        value={comment}
                        onChangeText={setComment}
                        placeholder="Add a supportive comment..."
                        placeholderTextColor="#999"
                      />
                      <TouchableOpacity onPress={() => addComment(post.id)} style={styles.commentSendButton}>
                        <Text style={styles.commentSendText}>Send</Text>
                      </TouchableOpacity>
                    </View>

                    {post.comments.map((comment) => (
                      <View key={comment.id} style={styles.comment}>
                        <Text style={styles.commentAuthor}>{comment.author}</Text>
                        <Text style={styles.commentText}>{comment.text}</Text>
                        <Text style={styles.commentDate}>{comment.date}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            ))
          )}
        </ScrollView>

        {/* Create Post Modal */}
        <Modal visible={showCreateModal} animationType="slide" presentationStyle="pageSheet">
          <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setShowCreateModal(false)}>
                <Text style={styles.modalCancel}>Cancel</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Share Your Story</Text>
              <TouchableOpacity onPress={createPost}>
                <Text style={styles.modalSave}>Share</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalContent}>
              <Text style={styles.inputLabel}>How are you feeling?</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.moodSelector}>
                {moods.map((mood) => (
                  <TouchableOpacity
                    key={mood}
                    onPress={() => setNewPost({ ...newPost, mood })}
                    style={[styles.moodOption, newPost.mood === mood && styles.selectedMood]}
                  >
                    <Text style={styles.moodEmoji}>{mood}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <Text style={styles.inputLabel}>Title</Text>
              <TextInput
                style={styles.titleInput}
                value={newPost.title}
                onChangeText={(text) => setNewPost({ ...newPost, title: text })}
                placeholder="Today MoodSync helped me..."
                placeholderTextColor="#999"
              />

              <Text style={styles.inputLabel}>Your Story</Text>
              <TextInput
                style={styles.contentInput}
                value={newPost.content}
                onChangeText={(text) => setNewPost({ ...newPost, content: text })}
                placeholder="Share how MoodSync made a difference in your day..."
                placeholderTextColor="#999"
                multiline
                numberOfLines={6}
              />
            </ScrollView>
          </SafeAreaView>
        </Modal>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  safeArea: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.9)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(226,232,240,0.5)",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2D3748",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#718096",
  },
  adminBadge: {
    backgroundColor: "#6C63FF",
    color: "white",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 8,
  },
  createButton: {
    backgroundColor: "#6C63FF",
    margin: 20,
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  createButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  postsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2D3748",
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: "#718096",
    textAlign: "center",
  },
  postCard: {
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  postHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  postAuthor: {
    flexDirection: "row",
    alignItems: "center",
  },
  postMood: {
    fontSize: 24,
    marginRight: 12,
  },
  authorName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2D3748",
  },
  postDate: {
    fontSize: 12,
    color: "#718096",
  },
  deleteButton: {
    padding: 8,
  },
  deleteText: {
    fontSize: 18,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2D3748",
    marginBottom: 8,
  },
  postContent: {
    fontSize: 16,
    color: "#4A5568",
    lineHeight: 22,
    marginBottom: 16,
  },
  postActions: {
    flexDirection: "row",
    gap: 20,
  },
  likeButton: {
    padding: 8,
  },
  commentButton: {
    padding: 8,
  },
  actionText: {
    fontSize: 14,
    color: "#6C63FF",
    fontWeight: "600",
  },
  commentsSection: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(226,232,240,0.5)",
  },
  commentInput: {
    flexDirection: "row",
    marginBottom: 12,
    gap: 8,
  },
  commentTextInput: {
    flex: 1,
    backgroundColor: "#F7FAFC",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
  },
  commentSendButton: {
    backgroundColor: "#6C63FF",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: "center",
  },
  commentSendText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  comment: {
    backgroundColor: "#F7FAFC",
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  commentAuthor: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2D3748",
    marginBottom: 4,
  },
  commentText: {
    fontSize: 14,
    color: "#4A5568",
    marginBottom: 4,
  },
  commentDate: {
    fontSize: 12,
    color: "#718096",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#F7FAFC",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  modalCancel: {
    fontSize: 16,
    color: "#718096",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2D3748",
  },
  modalSave: {
    fontSize: 16,
    color: "#6C63FF",
    fontWeight: "bold",
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2D3748",
    marginBottom: 8,
    marginTop: 16,
  },
  moodSelector: {
    marginBottom: 16,
  },
  moodOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    backgroundColor: "white",
  },
  selectedMood: {
    backgroundColor: "#6C63FF",
  },
  moodEmoji: {
    fontSize: 24,
  },
  titleInput: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 16,
  },
  contentInput: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    height: 120,
    textAlignVertical: "top",
  },
})
