import { useEffect, useState } from "react";
import SurveyCard from "../../AllSurveys/SurveyCard";
// import useSurveys from "../../../Hooks/useSurveys";

const FeaturedSection = () => {
    // const [surveys]=useSurveys()
    const [data,setData]=useState([])
    useEffect(()=>{
         fetch('https://opiniun-server.vercel.app/surveys')
    .then(res=>res.json())
    .then(data=>{
      const sortedData=data.sort((a,b)=>b.options.total-a.options.total)
       setData(sortedData)
    })
    },[])
    
    return (
        <div className="my-10 text-center">
            <h2 className="text-4xl text-[#0f1741] font-medium text-center my-10">Featured<span className=' bg-gradient-to-r from-[#e31048] to-[#ff5100] text-transparent bg-clip-text'>Surveys</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-2">
                {
                    data.slice(0,6).map(survey=><SurveyCard
                    key={survey._id}
                    survey={survey}
                    ></SurveyCard>)
                }
            </div>
        </div>
    );
};

export default FeaturedSection;