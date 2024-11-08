import axios from "axios";
import { BASE_URL } from "./config";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout:600000,
});

axiosInstance.defaults.headers.common['Content-Type'] = 'multipart/form-data';
axiosInstance.defaults.withCredentials = true;


axiosInstance.interceptors.request.use(
    (config)=>{
        return config
    },
    (error)=>{
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        console.log('Response=',response)
        return response;
    },
    (error)=>{
        console.log('Response=',error)
        if(error.response){
            if(error.response.status === 401){
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;

