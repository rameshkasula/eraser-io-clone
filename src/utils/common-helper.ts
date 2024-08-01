import jwt from "jsonwebtoken";

export function generateAccessToken(userId: string) {
  const secret = process.env.AUTH_SECRET || "secret"; // Replace with your secret key
  const options = { expiresIn: "1h" }; // Set the expiration time as needed

  return jwt.sign({ userId }, secret, options);
}
