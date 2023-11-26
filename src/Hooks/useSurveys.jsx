import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useSurveys = () => {

   const axiosPublic= useAxiosPublic()

    const {data:surveys=[],isLoading}=useQuery({
        queryKey:['survey'],
        queryFn:async()=>{
            const res= await axiosPublic.get('/surveys')
            return res.data
        }
    })
    return [surveys,isLoading]
};

export default useSurveys;