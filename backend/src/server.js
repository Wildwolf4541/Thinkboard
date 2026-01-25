import express from 'express'
import cors from 'cors'

import notesRoutes from './routes/notesRoutes.js'
import { connectDB } from './config/db.js'
import dotenv from 'dotenv'

const app = express()

app.use(cors({
    origin: 'http://localhost:5173'
}
)) // ✅ Allow all origins

app.use(express.json()) // To parse JSON bodies
dotenv.config()

const PORT = process.env.PORT || 5000;
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
