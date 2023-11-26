// import { useEffect, useState } from "react";
import useSurveys from "../../Hooks/useSurveys";
import SurveyCard from "./SurveyCard";

const AllSurvey = () => {
     const [surveys,isLoading] = useSurveys()
    
    if(isLoading){
        return <span className="loading loading-spinner text-secondary"></span>
    }
    // console.log(surveys)

    return (
        <div className="text-center mt-5 pb-20">
            <h2 className="text-2xl font-extrabold mb-10">All surveys:{surveys?.length}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 px-2">
                {
                    surveys?.map(survey=><SurveyCard
                         key={survey._id} 
                         survey={survey}
                         ></SurveyCard>)
                }
            </div>
        </div>
    );
};

export default AllSurvey;