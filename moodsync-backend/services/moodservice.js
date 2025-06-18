import { logMood, getUserMoods, getMoodStats } from "../models/mood.model.js";

export const addMood = async ({ user, label, value, emoji, note }) => {
  if (!label || !value || !emoji) throw new Error("Mood fields are required");
  const id = await logMood({ userId: user.id, label, value, emoji, note });
  return { id, message: "Mood logged" };
};

export const fetchUserMoods = async (userId) => {
  return await getUserMoods(userId);
};

export const calculateMoodStats = async (userId) => {
  const raw = await getMoodStats(userId);
  if (raw.length === 0) return { total: 0, weekly: 0, monthly: 0, average: 0, topMood: null };

  const now = new Date();
  const oneWeekAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
  const oneMonthAgo = new Date(now.getFullYear(), now.getMonth(), 1);

  let sum = 0;
  let moodCounts = {};
  let weekly = 0;
  let monthly = 0;

  for (const mood of raw) {
    const createdAt = new Date(mood.created_at);
    sum += mood.value;

    if (createdAt >= oneWeekAgo) weekly++;
    if (createdAt >= oneMonthAgo) monthly++;

    moodCounts[mood.label] = (moodCounts[mood.label] || 0) + 1;
  }

  const topMood = Object.entries(moodCounts).reduce((a, b) => (a[1] > b[1] ? a : b), [null, 0])[0];
  const average = (sum / raw.length).toFixed(1);

  return {
    total: raw.length,
    weekly,
    monthly,
    average,
    topMood,
  };
};
