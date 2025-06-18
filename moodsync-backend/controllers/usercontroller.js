import {
  fetchAllUsers,
  toggleUserActive,
  changeUserRole,
  removeUser,
} from "../services/user.service.js";

export const getAll = async (req, res) => {
  try {
    const users = await fetchAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const enableOrDisable = async (req, res) => {
  try {
    const { id } = req.params;
    const { is_active } = req.body;
    const result = await toggleUserActive(id, is_active);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const result = await changeUserRole(id, role);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await removeUser(id);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
