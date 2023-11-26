import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useProUser = () => {
    const {user,loading}=useAuth()
    const axiosSecure=useAxiosSecure()
    const {data : isProUser,isLoading:proUserLoading,refetch} = useQuery({
        queryKey:['proUser'],
        enabled:!loading,
        queryFn:async()=>{
            const res=await axiosSecure.get(`/users/proUser/${user?.email}`)
            return res.data
        }
    })
    return [isProUser,proUserLoading,refetch]
};

export default useProUser;