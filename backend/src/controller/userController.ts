import { Request, Response } from "express";
import { userModel } from "../model/userModel";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from "cloudinary";

const registAccount = async (req: Request, res: Response) => {
    const { username, email, password } = req.body
    try {
        if (!username || !email || !password) {
            return res.status(401).json({ msg: 'Please fill all requipment' })
        }

        const isExist = await userModel.findOne({ username: username, email: email })
        console.log(isExist)

        if (isExist) {
            return res.status(201).json({ msg: 'Email or username already exist' })
        }

        const salt = await bcrypt.genSalt(12)
        const hashedPass = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            username: username,
            email: email,
            password: hashedPass
        })

        const user = await userModel.create(newUser)

        return res.status(200).json({ msg: 'Success regist', user })

    } catch (error) {
        console.log(error)
        return res.status(501).json({ msg: 'Internal server error' })
    }
}

const loginAccount = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(401).json({ msg: 'Please fill all requipment' })
        }

        const isExist = await userModel.findOne({ email: email })

        if (!isExist) {
            return res.status(404).json({ msg: "User not found" })
        }

        const isPassCorrect = await bcrypt.compare(password, isExist.password);
        console.log(isPassCorrect)

        if (!isPassCorrect) {
            return res.status(401).json({ msg: 'Passoword wrong' })
        }

        const token = await jwt.sign({ userId: isExist._id, username: isExist.username }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES })

        return res.status(200).json({ msg: 'Success', isExist, token })
    } catch (error) {
        console.log(error)
    }
}

const updateAvatar = async (req: Request, res: Response) => {
    let file = req.file?.path
    try {
        if (!file) {
            return res.status(401).json({ msg: 'Please attach file' })
        }

        const result = await cloudinary.uploader.upload(file, {
            folder: 'Testing',
            resource_type: 'auto'
        })

        const user = await userModel.findOneAndUpdate({ _id: req.user.userId }, { avatar: result.secure_url }, { new: true })

        return res.status(200).json({ msg: "Success", user })
    } catch (error) {
        console.log(error)
    }
}

const deleteAccount = async (req: Request, res: Response) => {
    try {
        const user = await userModel.findOneAndDelete({ _id: req.user.userId })

        return res.status(200).json({ msg: "Success", user })
    } catch (error) {
        console.log(error)
    }
}

const getCurrentUser = async (req: Request, res: Response) => {
    try {
        const user = await userModel.findOne({ _id: req.user.userId }).select({ password: false });

        return res.status(200).json({ msg: 'Success', user })
    } catch (error) {
        console.log(error)
    }
}

export { registAccount, loginAccount, updateAvatar, deleteAccount, getCurrentUser }