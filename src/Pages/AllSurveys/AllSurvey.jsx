import { useEffect, useState } from "react";
import useSurveys from "../../Hooks/useSurveys";
import SurveyCard from "./SurveyCard";

const AllSurvey = () => {
    // const [data]=useSurveys()
    const [data,setData]=useState([])
    useEffect(()=>{
         fetch('/data.json')
    .then(res=>res.json())
    .then(data=>{
       setData(data)
    })
    },[])
    return (
        <div className="text-center mt-5">
            <h2 className="text-2xl font-extrabold mb-10">All surveys:{data?.length}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 px-2">
                {
                    data.map(survey=><SurveyCard
                         key={survey._id} 
                         survey={survey}
                         ></SurveyCard>)
                }
            </div>
        </div>
    );
};

export default AllSurvey;