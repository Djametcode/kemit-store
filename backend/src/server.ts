import 'dotenv/config'
import express from 'express'
import cors from 'cors'
const app = express()

import { connectDB } from './db/connectDB'
import { userRoute } from './routes/userRoute'
import { v2 as cloudinary } from 'cloudinary'

app.use(cors({
    origin: ["http://localhost:3000"]
}))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/v16/kemit-store', userRoute)

cloudinary.config({
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    cloud_name: process.env.CLOUD_NAME
})

const startServer = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(3000, () => console.log(`Server running on port 3000`))
    } catch (error) {
        console.log(error)
    }
}
startServer()