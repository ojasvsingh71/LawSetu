import express from "express";
import passport from "../config/passport.js";
import jwt from "jsonwebtoken"

const router = express.Router();

router.get("/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/auth/google/callback",
  passport.authenticate("google"), 

    async(req,res)=>{
      const user=req.user;

      const token=jwt.sign(
        {id:user._id,email:user.email},
        process.env.JWT_SECRET,
        {expiresIn:"7d"}
      )
        res.redirect(`http://localhost:5173/google/callback?token=${token}`);
    }
);

export default router;