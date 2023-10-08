import { Request, Response } from "express";
import { userModel } from "../model/userModel";
import bcrypt from 'bcrypt'

const registAccount = async (req: Request, res: Response) => {
    const { username, email, password } = req.body
    try {
        if (!username || !email || !password) {
            return res.status(401).json({ msg: 'Please fill all requipment' })
        }

        const isExist = await userModel.find({ $or: [{ username: username }, { email: email }] })
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

        return res.status(200).json({ msg: 'Success', isExist })
    } catch (error) {
        console.log(error)
    }
}

export { registAccount, loginAccount }