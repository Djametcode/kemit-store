import express from 'express'
const route = express.Router()
import { createProduct, updateProduct, getAllProduct } from '../controller/productController'
import { authorization } from '../middleware/auth'
import { upload } from '../middleware/multer'

route.get('/get-all-product', getAllProduct)
route.post('/create-product', authorization, upload, createProduct)
route.patch('/update-product/:id', authorization, updateProduct)

export const productRoute = route