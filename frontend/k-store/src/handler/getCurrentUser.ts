import axios from "axios"
import Cookies from "js-cookie";

export const getCurrentUser = async () => {
    const token = Cookies.get('token')
    console.log(token)
    try {
        const response = await axios.get('http://localhost:3000/api/v16/kemit-store/auth/current-user', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const result = await response.data.user;
        return result;
    } catch (error) {
        console.log(error)
    }
}