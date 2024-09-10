import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;

async function connectToDatabase() {
  try {
    await mongoose.connect(uri as string, {
      serverApi: {
        version: "1",
        strict: true,
        deprecationErrors: true,
      },
    });
    console.log("Connected to MongoDB!");

    // Test the connection after it's established
    await testConnection();
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}

connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

app.use("/api/users", userRoutes);

async function testConnection() {
  try {
    if (mongoose.connection.readyState !== 1) {
      console.log("Waiting for database connection...");
      return;
    }
    if (mongoose.connection.db) {
      const adminDb = mongoose.connection.db.admin();
      await adminDb.command({ ping: 1 });
      console.log(
        "Pinged your deployment. You successfully connected to MongoDB!"
      );
    } else {
      console.error("Database connection is not established.");
    }
  } catch (error) {
    console.error("Error testing connection:", error);
  }
}
