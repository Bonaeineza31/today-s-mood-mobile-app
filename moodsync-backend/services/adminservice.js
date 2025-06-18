import { findUserByEmail, createUser } from "../models/usermodel.js";
import { sendInvitationEmail } from "../utils/sendemail.js";
import jwt from "jsonwebtoken";

export const inviteUser = async ({ email, name, role }) => {
  const existing = await findUserByEmail(email);
  if (existing) throw new Error("Email already registered");

  const token = jwt.sign({ email, name, role }, process.env.JWT_SECRET, { expiresIn: "1h" });
  await sendInvitationEmail(email, token);

  return { message: "Invite sent. Ask them to check their email." };
};
