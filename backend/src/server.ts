import 'dotenv/config'
import express from 'express'
import cors from 'cors'
const app = express()

import { connectDB } from './db/connectDB'
import { userRoute } from './routes/userRoute'

app.use(cors({
    origin: ["http://localhost:3000"]
}))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/v16/kemit-store', userRoute)

const startServer = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(3000, () => console.log(`Server running on port 3000`))
    } catch (error) {
        console.log(error)
    }
}
startServer()