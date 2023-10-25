import axios from "axios"

export const getAllProductHandler = async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/v16/kemit-store/product/get-all-product')
        const result = await response.data

        return result.product;
    } catch (error) {
        console.log(error)
    }
}