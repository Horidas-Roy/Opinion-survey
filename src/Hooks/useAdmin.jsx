import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useAdmin = () => {
    const {user,loading}=useAuth()
    const axiosSecure=useAxiosSecure()
    const {data : isAdmin,isLoading:adminLoading} = useQuery({
        queryKey:['admin'],
        enabled:!loading,
        queryFn:async()=>{
            const res=await axiosSecure.get(`/users/admin/${user?.email}`)
            return res.data
        }
    })
    return [isAdmin,adminLoading]
};

export default useAdmin;