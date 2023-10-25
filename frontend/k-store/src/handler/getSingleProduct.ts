import axios from "axios";
import Cookies from "js-cookie";

export const getProductById = async (productId: string | undefined) => {
    const token = Cookies.get('token')
    try {
        const response = await axios.get(
            `http://localhost:3000/api/v16/kemit-store/product/detail-product/${productId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const result = response.data.product;
        return result;
    } catch (error) {
        console.log(error);
    }
};