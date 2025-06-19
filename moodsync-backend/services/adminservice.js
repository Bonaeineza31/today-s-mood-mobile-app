import bcrypt from "bcrypt";

export const inviteUser = async ({ email, name, role }) => {
  const existing = await findUserByEmail(email);
  if (existing) throw new Error("Email already registered");

  const hashed = await bcrypt.hash("TempPass@123", 10); // optional placeholder password
  await createUser({
    name,
    email,
    password: hashed,
    role,
    isVerified: false,
  });

  const token = jwt.sign({ email, name, role }, process.env.JWT_SECRET, { expiresIn: "1h" });
  await sendInvitationEmail(email, token);

  return { message: "User invited and added to DB. Ask them to check their email." };
};
