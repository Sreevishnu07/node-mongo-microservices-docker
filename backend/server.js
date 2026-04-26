const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();

const {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  PORT
} = process.env;

const uri = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`;

let db;
async function connectDB() {
  while (true) {
    try {
      const client = new MongoClient(uri);
      await client.connect();
      db = client.db(DB_NAME);
      console.log("Connected to MongoDB");
      break;
    } catch (err) {
      console.log("DB not ready, retrying...");
      await new Promise(res => setTimeout(res, 3000));
    }
  }
}

connectDB();

app.get("/", async (req, res) => {
  try {
    const collections = await db.listCollections().toArray();

    res.json({
      message: "Backend is running",
      collections
    });
  } catch (err) {
    res.status(500).json({ error: "DB not ready yet" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});