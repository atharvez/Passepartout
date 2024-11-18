import { connectToDatabase } from "/lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Only GET method is allowed" });
  }

  try {
    const { db } = await connectToDatabase();

    // Assuming you want to fetch all passwords, you can modify the query as needed
    const passwords = await db.collection("passwords").find({}).toArray();

    res.status(200).json({ savedPasswords: passwords });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}
