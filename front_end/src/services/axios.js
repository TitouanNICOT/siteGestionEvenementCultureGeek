import axios from 'axios'
import store from "@/store";

const myaxios = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true,
});

myaxios.interceptors.request.use(
    config => {
        const token = store.state.currentUser ? store.state.currentUser.token : null;
        return { ...config, headers: { token: token } }
    },
    error => { return Promise.reject(error) }
)


export default myaxios