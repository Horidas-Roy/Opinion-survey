import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import { useState } from "react";

const useSurveys = () => {
    const [data,setData]=useState([])
    // const axiosPublic=useAxiosPublic()
    // const {data:surveys=[],isLoading,refetch}=useQuery({
    //     queryKey:["surveys",axiosPublic],
    //     queryFn:async()=>{
    //         const res=await axiosPublic.get('./data.json')
    //         return res.data;
    //     }
    // })
    // return [surveys,isLoading,refetch]

    fetch('/data.json')
    .then(res=>res.json())
    .then(data=>{
       setData(data)
    })

    return [data]
};

export default useSurveys;