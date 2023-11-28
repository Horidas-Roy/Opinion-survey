import axios from "axios";
import useAuth from "./useAuth";
import { useLocation } from "react-router-dom";

const axiosSecure=axios.create({
    baseURL:'https://opiniun-server.vercel.app'
})
const useAxiosSecure = () => {
    const {logOut}=useAuth()
    const navigate=useLocation()
    //request interceptor to add authorization to every secure call
    axiosSecure.interceptors.request.use(function(config){
        const token = localStorage.getItem("access-token")
        config.headers.authorization=`bearer ${token}`
        return config;
    },function(error){
        return Promise.reject(error)
    })

    //intercepts 401 & 403 status
    axiosSecure.interceptors.response.use(function(response){
        return response
    },async(error)=>{
        const status = error.response.status
        if(status === 401 || status === 403){
            await logOut();
            navigate('/login')
        }
        return Promise.reject(error)
    })

    return axiosSecure
};

export default useAxiosSecure;