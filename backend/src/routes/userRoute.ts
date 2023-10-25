import express from 'express'
const router = express.Router()
import { registAccount, loginAccount, updateAvatar, deleteAccount, getCurrentUser } from '../controller/userController'
import { authorization } from '../middleware/auth'
import { upload } from '../middleware/multer'

router.post('/regist-account', registAccount)
router.post('/login-account', loginAccount)
router.patch('/update-account', authorization, upload, updateAvatar)
router.delete('/delete-account', deleteAccount)
router.get('/current-user', authorization, getCurrentUser)

export const userRoute = router