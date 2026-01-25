import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// ======================
// MIDDLEWARE
// ======================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS — Allow all origins (safe since frontend is served by same server in prod)
app.use(
  cors({
    origin: true, // reflect request origin
    credentials: true,
  })
);

// ======================
// API ROUTES FIRST
// ======================
app.use("/api/notes", notesRoutes);

// ======================
// FRONTEND (PROD ONLY)
// ======================
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // Express 5 compatible wildcard route
  app.get("/:path(*)", (req, res) => {
    res.sendFile(
      path.join(__dirname, "../frontend", "dist", "index.html")
    );
  });
}

// ======================
// START SERVER
// ======================
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on Port:", PORT);
  });
});
