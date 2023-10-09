import { NextFunction, Response, Request } from "express";
import jwt from 'jsonwebtoken'

const auth = async (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
        return res.status(401).json({ msg: 'Please login first' })
    }

    const token = header.split(" ")[1]

    try {
        const data = await jwt.verify(token, process.env.JWT_SECRET) as { userId: string; username: string };
        req.user = { userId: data.userId, username: data.username }
        next()
    } catch (error) {
        console.log(error)
    }
}

export const authorization = auth