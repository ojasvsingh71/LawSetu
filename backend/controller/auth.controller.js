import userModel from "../models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { z } from "zod"
import { registerSchema, loginSchema } from "../models/zod.schemas.js"

const register = async (req, res) => {

    try {

        const parseResult = registerSchema.safeParse(req.body);

        if (!parseResult.success) {
            return res.status(400).json({
                message: "Invalid input",
                errors: parseResult.error.issues
            })
        }

        const { name, email, password } = parseResult.data;

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "Email already in use"
            });
        }

        const hashedPass = await bcrypt.hash(password, 10);
        const user = await userModel.create({
            name: name,
            email: email,
            password: hashedPass
        })

        res.status(200).json({
            message: "Registered User",
            user: {
                name: user.name,
                email: user.email
            }
        })
    } catch (err) {
        res.status(500).json({
            message: "Sever error!!!"
        })
    }
}

const login = async (req, res) => {

    try {

        const parseResult = loginSchema.safeParse(req.body);

        if (!parseResult.success) {
            return res.status(400).json({
                message: "Invalid input",
                error: parseResult.error.issues
            })
        }

        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found!!!"
            })
        }

        const isPassMatch = await bcrypt.compare(password, user.password);

        if (!isPassMatch) {
            res.status(404).json({
                message: "Incorrect password!!!"
            })
        } else {

            const token = jwt.sign(
                { id: user._id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: "5h" }
            )


            res.status(200).json({
                message: "User found",
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                }
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Sever error!!!"
        })
    }
}

export default { register, login };