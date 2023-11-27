import { useLoaderData } from "react-router-dom";
import Comment from "../../components/Comment/Comment";
import Report from "../../components/Report/Report"
import Piechart from "../../components/PieChart/Piechart";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useVoter from "../../Hooks/useVoter";
import useReactioner from "../../Hooks/useReactioner";

const SurveyDetails = () => {
  const survey = useLoaderData();
  const axiosSecure = useAxiosSecure()
  const {user,loading}=useAuth()
  const [voters, voterLoading, voterRetch] = useVoter() 
  const [reactioners,reactionerLoading,reactionerRefetch]=useReactioner()

 
  if(loading || voterLoading || reactionerLoading){
    return <span className="loading loading-spinner text-secondary"></span>
  }

  
  const invalidVoter=voters.find(voter=>voter.email === user.email && voter.surveyId === survey._id)
  console.log("voter collection:",voters,"invalidVoter:",invalidVoter)
  const invalidReactioner=reactioners.find(reactioner=>reactioner.email === user.email && reactioner.surveyId === survey._id)
  console.log('reactioners:',reactioners,"invalidRecationer:",invalidReactioner)
  
 
  const handleYesVote=async(id)=>{
        console.log("Yes Vote",id)
         const res=await axiosSecure.patch(`/surveys/yesVote/${id}`)
        //  console.log(res.data)
         if(res.data.modifiedCount>0){

            const voterInfo={
               email:user?.email,
               surveyId:survey._id
            }

            const res=await axiosSecure.post('/voters',voterInfo)
            console.log(res.data)
            if(res.data.insertedId){
              voterRetch()
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your vote has been done!",
                showConfirmButton: false,
                timer: 1500
              });
            }

         }
  }

  const handleNoVote=async(id)=>{
      console.log("No vote",id)
      const res=await axiosSecure.patch(`/surveys/noVote/${id}`)
         console.log(res.data)
         if(res.data.modifiedCount>0){

            const voterInfo={
               email:user?.email,
               surveyId:survey._id
            }

            const res=await axiosSecure.post('/voters',voterInfo)
            console.log(res.data)
            if(res.data.insertedId){
              voterRetch();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your vote has been done!",
                showConfirmButton: false,
                timer: 1500
              });
            }

         }
  }

  const handleLike=async(id)=>{
    console.log("like",id)
    const res=await axiosSecure.patch(`/surveys/like/${id}`)
    console.log(res.data)
    if(res.data.modifiedCount>0){
       const reactioner={
            email:user.email,
            surveyId:id
       }

       const res = await axiosSecure.post("/reactioner",reactioner)
       console.log(res.data)
        if(res.data.insertedId){
        reactionerRefetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your Like has been done!",
          showConfirmButton: false,
          timer: 1500
        });
       }
    }
  }

  const handleDisLike=async(id)=>{
    console.log("dislike",id)
    const res= await axiosSecure.patch(`/surveys/dislike/${id}`)
    console.log(res.data)
    if(res.data.modifiedCount>0){
            const reactioner={
              email:user.email,
              surveyId:id
            }

          const res=await axiosSecure.post(`/reactioner`,reactioner)
          console.log(res.data)
          if(res.data.insertedId){
            reactionerRefetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your dislike has been done!",
              showConfirmButton: false,
              timer: 1500
            });
          }
    }
  }

  const handleAddComment =(id)=>{
    console.log("add comment",id)
  }

  const handleAddReport=(id)=>{
    console.log("add report",id)
  }

  return (
    <>
    <div className="flex py-10 px-2">
      <div className="card card-compact w-1/2  bg-base-100 shadow-xl">
        <figure>
          <img src={survey?.image} className="w-full" alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{survey?.title}</h2>
          <p>
            {survey?.description}
                {invalidReactioner && <p className="text-red-700 font-medium text-end mt-5 text-xl">You already react this survey.</p>}
            <span className="flex gap-4 justify-end mt-3">
                <button onClick={()=>handleLike(survey._id)} disabled={invalidReactioner} className="btn bg-gradient-to-r from-[#e31048] to-[#ff5100] text-white font-medium">Like</button>
                <button onClick={()=>handleDisLike(survey._id)} disabled={invalidReactioner} className="btn bg-gradient-to-r from-[#e31048] to-[#ff5100] text-white font-medium">DisLike</button>
          </span>
          </p>
          
          <div className="card-actions justify-center text-center">
            <p className="rounded-lg w-full bg-gradient-to-r from-[#e31048] to-[#ff5100] text-white font-bold text-xl">
            <marquee> You can See the Result after voting </marquee>
            </p>
          </div>
        </div>
      </div>
      <div className="flex-1 text-center">
         <h2 className='text-5xl font-medium bg-gradient-to-r from-[#e31048] to-[#ff5100] text-transparent bg-clip-text'>Please Give Your Vote</h2>
         <hr  className="mx-10 border-4 mt-5"/>
         <div className="px-16 text-start">
            <h2 className="text-[#0f1741] text-2xl font-medium mb-5">Q.{survey?.question}</h2>
                {invalidVoter && <p className="text-red-700 text-xl mb-2 font-medium">You already voted this survey.</p>}
            <div className="flex gap-4">
                <button onClick={()=>handleYesVote(survey._id)} disabled={invalidVoter} className="btn bg-gradient-to-r from-[#e31048] to-[#ff5100] text-white font-medium">Yes</button>
                <button onClick={()=>handleNoVote(survey._id)} disabled={invalidVoter} className="btn bg-gradient-to-r from-[#e31048] to-[#ff5100] text-white font-medium">No</button>
            </div>
            <div className="mt-10 text-xl">
                <h2>Comments:</h2>
                <div>
                    {
                      survey?.comments?.map((comment,index)=><Comment 
                      key={index}
                      comment={comment}
                      >
                      </Comment>)
                    }
                    <h2><button onClick={()=>handleAddComment(survey._id)} className="btn bg-gradient-to-r from-[#e31048] to-[#ff5100] text-white font-medium">Add Comment</button></h2>
                </div>
            </div>
            <div className="mt-10 text-xl">
                <h2>Reports:</h2>
                <div>
                    {
                      survey?.reports?.map((report,index)=><Report 
                      key={index}
                      report={report}
                      >
                      </Report>)
                    }
                    <h2><button onClick={()=>handleAddReport(survey._id)} className="btn bg-gradient-to-r from-[#e31048] to-[#ff5100] text-white font-medium">Add Report</button></h2>
                </div>
            </div>
         </div>
      </div>
    </div>
    <div className="text-center pb-20">
        <h2 className="text-3xl font-semibold text-[#0f1741]">See The Chart</h2>
        <div className="flex justify-center items-center">
         <Piechart survey={survey}></Piechart>
        </div>
    </div>
    </>
  );
};

export default SurveyDetails;
