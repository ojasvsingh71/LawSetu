import userModel from "../models/user.model.js";
import bcrypt from "bcrypt"

const register = async (req, res) => {
    const { email, password } = req.body;

    const hashedPass = await bcrypt.hash(password, 10);
    const user = userModel.create({
        email: email,
        password: hashedPass
    })

    res.status(200).json({
        message: "Registered User",
        user
    })
}

const login = async (req, res) => {
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
        res.status(200).json({
            message: "User found",
            user: {
                id: user._id,
                email: user.email
            }
        });
    }
}

export default { register, login };