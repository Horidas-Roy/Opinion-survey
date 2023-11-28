// import { useEffect, useState } from "react";
import { useState } from "react";
import useSurveys from "../../Hooks/useSurveys";
import SurveyCard from "./SurveyCard";

const AllSurvey = () => {
     const [search,setSearch]=useState('')
     const [surveys,isLoading,refetch] = useSurveys(search)
    
    if(isLoading){
        return <div className="flex justify-center items-center">
            <span className="loading loading-spinner text-secondary text-center h-[100vh]"></span>
        </div>
    }
    // console.log(surveys)
    const handleSearch=(e)=>{
        e.preventDefault()
        const searchText=e.target.search.value;
        setSearch(searchText)
        refetch();
    }
    console.log(search)

    return (
        <div className="text-center mt-5 pb-20 min-h-screen">
            <h2 className="text-2xl font-extrabold mb-2">All surveys:{surveys?.length}</h2>
            <div className="mb-10">
                <form onSubmit={handleSearch}>
                    <input type="text" name="search" className="px-3 py-2 border-1 outline-1 rounded-lg rounded-r-none" placeholder="search here" />
                    <input type="submit" className=" btn px-3 py-2 bg-gradient-to-r from-[#e31048] to-[#ff5100] text-white font-medium rounded-lg rounded-l-none" value="search"  />
                </form>
            </div>
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