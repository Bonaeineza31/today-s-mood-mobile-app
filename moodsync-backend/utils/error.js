export class AppError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // Indicates expected errors
  }
}

export const handleError = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({ error: err.message });
  } else {
    console.error("❌ Internal Error:", err);
    res.status(500).json({ error: "Something went wrong. Please try again later." });
  }
};
