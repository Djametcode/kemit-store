import { Request, Response } from "express";
import { productModel } from "../model/productModel";
import { v2 as cloudinary } from "cloudinary";
import { cartModel } from "../model/cartModel";
import { userModel } from "../model/userModel";

const createProduct = async (req: Request, res: Response) => {
    const { productName, price, stock, description, color } = req.body
    let file = req.file

    try {
        if (!productName || !price || !stock || !description) {
            return res.status(201).json({ msg: 'Please provide product information' })
        }

        if (file) {
            const result = await cloudinary.uploader.upload(file.path, {
                folder: 'Testing',
                resource_type: 'auto'
            })
            const newProduct = new productModel({
                productName: productName,
                price: price,
                stock: stock,
                description: description,
                variant: [{
                    color: color
                }],
                image: [result.secure_url],
                owner: req.user.userId
            })

            const product = await productModel.create(newProduct)

            return res.status(200).json({ msg: 'Success', product })
        }

        return res.status(201).json({ msg: 'Please provide product image' })

    } catch (error) {
        console.log(error)
    }
}

const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params
    const { productName, price, stock, description } = req.body
    try {

        if (!productName || !price || !stock || !description) {
            return res.status(201).json({ msg: 'Please fill all requipment' })
        }
        const product = await productModel.findOne({ _id: id })

        if (!product) {
            return res.status(404).json({ msg: 'Product not found' })
        }

        const checkOwner = product?.owner.toString() === req.user.userId

        if (!checkOwner) {
            return res.status(401).json({ msg: 'Please login with correct account' })
        }

        const updatedProduct = await productModel.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true })

        return res.status(200).json({ msg: 'Success', updatedProduct })
    } catch (error) {
        console.log(error)
    }
}

const getAllProduct = async (req: Request, res: Response) => {
    try {
        const product = await productModel.find({})

        return res.status(200).json({ msg: 'Success', product })
    } catch (error) {
        console.log(error)
    }
}

const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const selectedProduct = await productModel.findOne({ _id: id })
        const checkOwner = selectedProduct?.owner.toString() === req.user.userId

        if (!checkOwner) {
            return res.status(401).json({ msg: 'Only owner can delete this' })
        }

        const product = await productModel.findOneAndDelete({ _id: id })

        return res.status(200).json({ msg: 'Success', product })
    } catch (error) {
        console.log(error)
    }
}

const addProductToCart = async (req: Request, res: Response) => {
    const { productId, cartId } = req.query
    const { quantity } = req.body

    const cart = new cartModel({
        product: [{
            productId: productId,
            quantity: quantity
        }],
        createdBy: req.user.userId
    })

    try {
        const user = await userModel.findOne({ _id: req.user.userId })
        const newCart = await cartModel.create(cart)

        user?.cart.push({
            cartId: newCart._id
        })

        const savedUser = await user?.save()

        return res.status(200).json({ msg: 'item added to cart', savedUser, newCart })
    } catch (error) {
        console.log(error)
    }
}

const getMyCart = async (req: Request, res: Response) => {
    try {
        const myCart = await cartModel.find({ createdBy: req.user.userId }).populate({ path: "product.productId" })

        return res.status(200).json({ msg: 'Success', myCart })
    } catch (error) {
        console.log(error)
    }
}

const deleteCart = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const user = await userModel.findOne({ _id: req.user.userId })

        const index = user?.cart.findIndex((item) => item.cartId.equals(id))

        if (index === -1) {
            return res.status(404).json({ msg: 'Cart item not found' });
        }

        user.cart.splice(index, 1);

        await user.save();

        return res.status(200).json({ msg: 'Cart item deleted successfully' });
    } catch (error) {
        console.log(error)
    }
}

const deleteItemInsideCart = async (req: Request, res: Response) => {
    const { productId, cartId } = req.query
    try {
        const cart = await cartModel.findOne({ _id: cartId })
        const indexProduct = cart.product.findIndex((item) => item.productId.toString() === productId)
        console.log(indexProduct)

        return res.status(200).json({ msg: 'Success', cart })
    } catch (error) {
        console.log(error)
    }
}
export { createProduct, updateProduct, getAllProduct, deleteProduct, addProductToCart, getMyCart, deleteCart, deleteItemInsideCart }