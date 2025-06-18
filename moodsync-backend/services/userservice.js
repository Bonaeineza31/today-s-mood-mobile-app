import {
  getAllUsers,
  setUserActiveStatus,
  updateUserRole,
  deleteUserById,
} from "../models/usermodel";

export const fetchAllUsers = async () => {
  return await getAllUsers();
};

export const toggleUserActive = async (userId, isActive) => {
  const affected = await setUserActiveStatus(userId, isActive);
  if (!affected) throw new Error("User not found or update failed");
  return { message: `User ${isActive ? "enabled" : "disabled"}` };
};

export const changeUserRole = async (userId, role) => {
  const validRoles = ["user", "admin"];
  if (!validRoles.includes(role)) throw new Error("Invalid role");

  const affected = await updateUserRole(userId, role);
  if (!affected) throw new Error("Role update failed");
  return { message: `User role changed to ${role}` };
};

export const removeUser = async (userId) => {
  const affected = await deleteUserById(userId);
  if (!affected) throw new Error("User delete failed");
  return { message: "User deleted successfully" };
};
