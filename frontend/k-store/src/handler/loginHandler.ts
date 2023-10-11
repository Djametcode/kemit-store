import axios from 'axios'

interface Data {
    email: string;
    password: string;
}

export const loginHandler = async (data: Data) => {
    console.log(data)
    try {
        const response = await axios.post('http://localhost:3000/api/v16/kemit-store/auth/login-account', data)
        const result = await response.data

        return result
    } catch (error) {
        console.log(error)
    }
}