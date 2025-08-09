import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import { connectToSocket } from "./controllers/socketmanagers.js";
import cors from "cors";
import userRoutes from "./routes/users.routes.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", process.env.PORT || 3000);

app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

// ✅ Simple route to avoid 404 at root
app.get("/", (req, res) => {
  res.send("🚀 Backend is running");
});

// Your API routes
app.use("/api/v1/users", userRoutes);

const start = async () => {
  const connectionDb = await mongoose.connect(
    "mongodb+srv://avinish729:newsecure123@cluster0.l6irfkw.mongodb.net/myDatabase?retryWrites=true&w=majority&appName=Cluster0"
  );
  console.log(`MONGO Connected DB host: ${connectionDb.connection.host}`);

  server.listen(app.get("port"), () => {
    console.log(`🚀 Listening on Port ${app.get("port")}`);
  });
};

start();
