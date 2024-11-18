import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
let cachedClient = null;

export async function connectToDatabase() {
  // If the client is already cached, return it
  if (cachedClient) {
    return { db: cachedClient.db() };
  }

  try {
    // Create a new MongoClient if no cached client exists
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await client.connect();  // Connect to MongoDB
    cachedClient = client;  // Cache the client for reuse

    // Return the database instance
    return { db: client.db() }; // Use the default database or specify one if needed
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Failed to connect to MongoDB");
  }
}
