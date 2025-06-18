import { registerUser, loginUser, verifyUser,requestPasswordReset,resetPassword ,acceptInviteService } from "../services/authservices";

export const register = async (req, res) => {
  try {
    const result = await registerUser(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const verify = async (req, res) => {
  try {
    const result = await verifyUser(req.params.token);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const result = await loginUser(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};



export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await requestPasswordReset(email);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    if (!newPassword || newPassword.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }

    const result = await resetPassword(token, newPassword);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const acceptInvite = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const result = await acceptInviteService(token, password);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


