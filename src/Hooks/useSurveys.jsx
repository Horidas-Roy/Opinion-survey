import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useSurveys = (search) => {

   const axiosPublic= useAxiosPublic()

    const {data:surveys=[],isLoading,refetch}=useQuery({
        queryKey:['survey',search],
        queryFn:async()=>{
            const res= await axiosPublic.get(`/surveys?search=${search}`)
            return res.data
        },
        retry:2
    })
    return [surveys,isLoading,refetch]
};

export default useSurveys;