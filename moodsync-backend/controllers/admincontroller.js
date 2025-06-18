import { inviteUser } from "../services/adminservice";

export const sendInvite = async (req, res) => {
  try {
    const { email, name, role } = req.body;
    const result = await inviteUser({ email, name, role });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
