import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useReactioner = () => {
    const axiosSecure=useAxiosSecure()

    const {data:reactioners=[],isLoading:reactionerLoading,refetch:reactionerRefetch}=useQuery({
        queryKey:['reactioner'],
        queryFn:async()=>{
            const res= await axiosSecure.get('/reactioner')
            return res.data;
        }
    })
    return [reactioners,reactionerLoading,reactionerRefetch]
};

export default useReactioner;