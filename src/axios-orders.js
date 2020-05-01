import axios from "axios"
const instance = axios.create(
    {
        baseURL:"https://react-burger-builder-a235e.firebaseio.com/"
    }
)

export default instance;