import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./lib/connectdb.js";
import authRoute from "./routes/auth.route.js"
import aiRoute from "./routes/ai.route.js"

const app = express();

dotenv.config()

app.use(express.json())
app.use(cors())

connectDB();

app.use("/auth", authRoute);
app.use("/ai", aiRoute);

app.get('/', (req, res) => {
    res.send("API is running!!!");
})

app.listen(process.env.PORT, () => {
    console.log(`\nServer is running on http://localhost:${process.env.PORT}\n`);
})