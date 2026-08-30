import axios from "axios"

const api = axios.create({ baseURL : "https://your-backend.vercel.app", withCredentials: true})


export default api