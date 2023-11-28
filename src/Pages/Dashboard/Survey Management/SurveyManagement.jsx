import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";


const SurveyManagement = () => {
   
     const axiosPublic=useAxiosPublic()
     

     const {data:surveys=[],isLoading}=useQuery({
        queryKey:['surveys'],
        queryFn:async()=>{
            const res=await axiosPublic.get('/surveys')
            return res.data;
        }
     })

     if(isLoading){
        return <span className="loading loading-spinner text-secondary"></span>
     }
    


    return (
        <div>
        <div className="flex justify-evenly gap-10 my-4">
          <h2 className="text-3xl">All Suveys</h2>
          <h2 className="text-3xl">Total surveys: {surveys.length}</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Survey Title</th>
                <th>Vote</th>
                <th>Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {surveys?.map((survey, index) => (
                <tr key={survey._id}>
                  <th>{index + 1}</th>
                  <td>{survey.title}</td>
                  <td>{survey.options.total}</td>
                  <td>{survey.timestamp}</td>
                  <td>
                    <Link to={`/dashboard/survey/update/${survey._id}`}>
                    <button className="btn bg-gradient-to-r from-[#e31048] to-[#ff5100] text-white font-medium text-xl py-1 px-3">Update</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
)};

export default SurveyManagement;