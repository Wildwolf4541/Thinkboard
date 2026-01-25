import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'

import notesRoutes from './routes/notesRoutes.js'
import { connectDB } from './config/db.js'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve()

// middleware
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}
app.use(express.json()); // this middleware will parse JSON bodies: req.body
app.use(express.urlencoded({ extended: true })) // To parse URL-encoded bodies
app.use(express.static(path.join(__dirname, '../frontend/dist')))

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

connectDB().then(()=>{
    app.listen(PORT, () => {
        console.log("Server is running on Port:", PORT);
    })
})

//Middleware
// app.use((req,res,next)=>{
//     console.log(`${req.method} request received at ${req.url} `);
//     next();
// })

// An endpoint is a communication point between client and server URL + HTTP Method.
app.use('/api/notes',notesRoutes)
