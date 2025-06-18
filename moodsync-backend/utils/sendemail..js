import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendVerificationEmail = async (to, token) => {
  const link = `http://localhost:3000/api/auth/verify/${token}`;
  await transporter.sendMail({
    from: `"MoodSync" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Verify Your MoodSync Account",
    html: `<p>Click to verify:</p><a href="${link}">${link}</a>`,
  });
};
