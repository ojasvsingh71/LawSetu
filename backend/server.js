import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./lib/connectdb.js";
import authRoute from "./routes/auth.route.js"
import aiRoute from "./routes/ai.route.js"
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import passport from "./config/passport.js";
import googleAuth from "./routes/google.auth.js"

const app = express();

dotenv.config()

const allowedOrigins = [
  "http://localhost:5173",
  "https://law-setu.vercel.app"
];

app.use(express.json())
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));
app.use(cookieParser())
app.use(expressSession({ secret: "lawsetu_secret", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

connectDB();

app.use("/auth", authRoute);
app.use("/ai", aiRoute);
app.use("/", googleAuth);

app.get('/', (req, res) => {
    res.send("API is running!!!");
})

app.listen(process.env.PORT, () => {
    console.log(`\nServer is running on http://localhost:${process.env.PORT}\n`);
})