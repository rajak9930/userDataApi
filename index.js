import express from "express";
import cors from "cors";
import connectDB from "./db/connect.js"; // Add `.js` extension
import userRouter  from './Routes/userRoutes.js';
import bodyParser from 'body-parser';
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/users",userRouter)
// Start the server
const start = async () => {
  try {
    // Connect to MongoDB
    await connectDB(
      "mongodb+srv://rajak9330:hwbqKGirInOX0KCi@cluster0.kyl4j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Connected to MongoDB");

    // Start Express server
    const PORT = 5000;
    app.listen(PORT, () =>
      console.log(`Server is running on http://localhost:${PORT}`)
    );
  } catch (error) {
    console.error("Error starting the server:", error.message);
    process.exit(1); // Exit the process with an error code
  }
};

// Call the start function
start();
