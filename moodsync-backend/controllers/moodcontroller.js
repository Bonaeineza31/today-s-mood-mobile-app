import { addMood, fetchUserMoods, calculateMoodStats } from "../services/moodservice.js";

export const createMood = async (req, res) => {
  try {
    const result = await addMood({ ...req.body, user: req.user });
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getMyMoods = async (req, res) => {
  try {
    const moods = await fetchUserMoods(req.user.id);
    res.status(200).json(moods);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getMyMoodStats = async (req, res) => {
  try {
    const stats = await calculateMoodStats(req.user.id);
    res.status(200).json(stats);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
