import { connectToDatabase } from "/lib/mongodb"; // Ensure this function connects MongoDB properly

export default async function handler(req, res) {
  if (req.method !== "POST") {
    console.log("Invalid request method:", req.method); // Log invalid methods
    return res.status(405).json({ message: "Only POST method is allowed" });
  }

  const { email, password } = req.body; // Use 'email' here to match frontend

  if (!email || !password) {
    console.log("Missing fields:", { email, password }); // Log missing fields
    return res.status(400).json({ message: "Email and password are required." });
  }

  const { db } = await connectToDatabase();

  try {
    // Check if the user exists in the database by email
    const user = await db.collection("users").findOne({ email });

    if (!user) {
      console.log("User not found:", email); // Log user not found
      return res.status(401).json({ message: "Invalid credentials" });
    }

    console.log("User found:", user.email); // Log user found
    return res.status(200).json({ user: { email: user.email } });
  } catch (error) {
    console.error("Database error:", error); // Log any database errors
    return res.status(500).json({ message: "Server error" });
  }
}
