import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useVoter = () => {
    const axiosSecure=useAxiosSecure()


     const {data:voters=[],isLoading:voterLoading,refetch:voterRetch}=useQuery({
    queryKey:['voters'],
    queryFn:async()=>{
      const res=await axiosSecure.get('/voters')
      return res.data
    },
    retry:0
  })
  return [voters,voterLoading,voterRetch]
};

export default useVoter;