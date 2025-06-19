import axios from "axios";
const BASE_URL = "http://192.168.1.226:3000/api"; // Replace with your deployed URL

export async function logMood(moodData) {
  const res = await axios.post(`${BASE_URL}/moods`, moodData);
  return res.data;
}
