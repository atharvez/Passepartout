import { connectToDatabase } from "/lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST method is allowed" });
  }

  const { appName, username, password } = req.body;

  // Validate required fields
  if (!appName || !username || !password) {
    return res.status(400).json({ message: "App name, username, and password are required" });
  }

  try {
    // Connect to the database
    const { db } = await connectToDatabase();

    // Insert the new password into the database
    await db.collection("passwords").insertOne({
      appName,
      username,
      password,
    });

    res.status(200).json({ message: "Password saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}
