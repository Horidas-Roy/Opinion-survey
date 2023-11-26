import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useSurveyor = () => {
    const {user,loading}=useAuth()
    const axiosSecure = useAxiosSecure()

    const {data:isSurveyor,isLoading:surveyorLoading}=useQuery({
        queryKey:['surveyor'],
        enabled:!loading,
        queryFn:async()=>{
            const res=await axiosSecure.get(`/users/surveyor/${user?.email}`)
            return res.data
        }
    })
    return [isSurveyor,surveyorLoading]
};

export default useSurveyor;