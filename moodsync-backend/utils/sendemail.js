import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendVerificationEmail = async (to, token) => {
  const link = `http://192.168.43.200:3000/api/auth/verify/${token}`;
  await transporter.sendMail({
    from: `"MoodSync" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Verify Your MoodSync Account",
    html: `<p>Click to verify your email:</p><a href="${link}">${link}</a>`,
  });
};

export const sendPasswordResetEmail = async (to, token) => {
  const link = `http://192.168.43.200:3000/api/auth/reset-password/${token}`;
  await transporter.sendMail({
    from: `"MoodSync" <${process.env.EMAIL_USER}>`,
    to,
    subject: "MoodSync Password Reset",
    html: `<p>Click below to reset your password (valid for 10 minutes):</p>
           <a href="${link}">${link}</a>`,
  });
};

export const sendInvitationEmail = async (to, token) => {
  const link = `http://192.168.43.200:3000/api/auth/accept-invite/${token}`;
  await transporter.sendMail({
    from: `"MoodSync" <${process.env.EMAIL_USER}>`,
    to,
    subject: "You're invited to MoodSync",
    html: `<p>Hello! You've been invited to join MoodSync. Click the link below to set your password:</p>
           <a href="${link}">${link}</a><p>This link expires in 1 hour.</p>`,
  });
};
