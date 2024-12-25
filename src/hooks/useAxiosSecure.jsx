import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
})

const useAxiosSecure= () =>{
    const navigate = useNavigate()
    const {logOut} = useAuth()
    useEffect(() => {
        axiosSecure.interceptors.response.use(res =>{
            return res
        }, async error => {
            console.log('error caught from our very own axios interceptors-->', error.response)
    
            if(error.response.status === 401 || error.response.status === 403){
                // Logout User
                logOut()

                navigate('/login')
    
            }
        })
    }, [logOut, navigate])
    return axiosSecure
}

export default useAxiosSecure