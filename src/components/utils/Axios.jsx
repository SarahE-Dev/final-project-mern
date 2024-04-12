import axios from "axios";

const Axios = axios.create({
    baseURL: import.meta.env.PROD ? 'https://fyretunes.saraheatherly.dev' : 'http://localhost:3002' ,
    timeout: 50000

})
export default Axios;