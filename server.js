import express from "express";
import dotenv from  "dotenv";
import newsRoutes from  "./routes/newsRoutes.js";
import "./db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import adminRoutes from "./routes/adminRoutes.js"
import authRoutes from "./routes/authRoutes.js"

dotenv.config()


const app = express()
app.use(express.json());

// middlewares
app.use(cors({
    origin: 'http://localhost:5173',  
    credentials: true,  
}));

app.use(cookieParser());
app.use(express.urlencoded({extended:true}))

// API
app.use("/api/news", newsRoutes)
app.use("/api/admin", adminRoutes)
app.use('/auth/check', authRoutes)


app.get('/', (req, res) => {
    console.log("Api is runing")
    res.send("API is running ...")
})


app.listen(process.env.PORT, () => {
    console.log('Server is running on port 5000 ')
})