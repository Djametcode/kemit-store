import axios from "axios";

interface UData {
    username: string;
    email: string;
    password: string
}

export const signUpHandler = async (data: UData) => {
    try {
        const response = await axios.post('http://localhost:3000/api/v16/kemit-store/auth/regist-account', data)
        const result = await response.data

        return result
    } catch (error) {
        console.log(error)
    }
}