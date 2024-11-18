// pages/api/passwords.js
import { connectToDatabase } from "../../lib/mongodb"; // A utility function to connect to MongoDB

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { db } = await connectToDatabase();
      const passwords = await db.collection("passwords").find().toArray();
      res.status(200).json(passwords); // Send the passwords as the response
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch passwords" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
