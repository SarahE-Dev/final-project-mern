import axios from "axios";

const Axios = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ?  'http://localhost:3002' : 'https://fyretunes.saraheatherly.dev' ,
    withCredentials: true,
    credentials: 'include',
    timeout: 50000
})

export default Axios;