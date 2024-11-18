import { connectToDatabase } from "/lib/mongodb";

export default async function handler(req, res) {
  try {
    const { db } = await connectToDatabase();

    // Find all users in the "users" collection
    const users = await db.collection("users").find({}).toArray();
    console.log("Users found:", users);

    return res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
