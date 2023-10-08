import express from 'express'
const router = express.Router()
import { registAccount, loginAccount } from '../controller/userController'

router.post('/regist-account', registAccount)
router.post('/login-account', loginAccount)

export const userRoute = router