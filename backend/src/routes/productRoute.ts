import express from 'express'
const route = express.Router()
import { createProduct, updateProduct, getAllProduct, addProductToCart, getMyCart, deleteCart } from '../controller/productController'
import { authorization } from '../middleware/auth'
import { upload } from '../middleware/multer'

route.get('/get-all-product', getAllProduct)
route.post('/create-product', authorization, upload, createProduct)
route.patch('/update-product/:id', authorization, upload, updateProduct)
route.post('/add-to-cart/:id', authorization, addProductToCart)
route.get('/my-cart', authorization, getMyCart)
route.delete('/delete-cart/:id', authorization, deleteCart)

export const productRoute = route