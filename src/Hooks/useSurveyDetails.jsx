import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useSurveyDetails = (id) => {
    const axiosSecure=useAxiosSecure()
    const {data:survey,isLoading:surveyLoading,refetch:surveyRefetch}=useQuery({
        queryKey:['survey'],
        queryFn:async()=>{
            const res = await axiosSecure.get(`surveys/${id}`)
            return res.data
        }
    })

    return [survey,surveyLoading,surveyRefetch]
};

export default useSurveyDetails;