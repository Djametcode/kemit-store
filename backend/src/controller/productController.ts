import { Request, Response } from "express";
import { productModel } from "../model/productModel";
import { v2 as cloudinary } from "cloudinary";

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
        const productDetail = await productModel.findOne({ _id: id })

        const checkOwner = productDetail?.owner.toString() === req.user.userId

        if (!checkOwner) {
            return res.status(401).json({ msg: 'Please login with correct account' })
        }

        const product = await productModel.findOneAndUpdate({ _id: id }, { productName: productName }, { new: true })

        return res.status(200).json({ msg: 'Success', product })
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
export { createProduct, updateProduct, getAllProduct }