import { hash } from "bcryptjs";
import { connectToDatabase } from "../../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Connect to the database
    const { db } = await connectToDatabase();

    // Check if the email or username already exists
    const existingUserByEmail = await db.collection("users").findOne({ email });
    const existingUserByUsername = await db.collection("users").findOne({ username });

    if (existingUserByEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    if (existingUserByUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await hash(password, 12);

    try {
      // Insert the new user into the database
      const newUser = await db.collection("users").insertOne({
        email,
        password: hashedPassword,
        username,
        createdAt: new Date(),
      });

      return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong. Please try again." });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}