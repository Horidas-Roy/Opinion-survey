import { useParams } from "react-router-dom";
import Comment from "../../components/Comment/Comment";
import Report from "../../components/Report/Report"
import Piechart from "../../components/PieChart/Piechart";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useVoter from "../../Hooks/useVoter";
import useReactioner from "../../Hooks/useReactioner";
import useSurveyDetails from "../../Hooks/useSurveyDetails";
import useProUser from "../../Hooks/useProUser";
import useAdmin from "../../Hooks/useAdmin";
import useSurveyor from "../../Hooks/useSurveyor";

const SurveyDetails = () => {
  // const survey = useLoaderData();
  const axiosSecure = useAxiosSecure()
  const {user,loading}=useAuth()
  const [voters, voterLoading, voterRetch] = useVoter() 
  const [reactioners,reactionerLoading,reactionerRefetch]=useReactioner()
  const {id}=useParams()
  const [survey,surveyLoading,surveyRefetch]=useSurveyDetails(id)
  const [isProUser,proUserLoading]=useProUser()
  const [isAdmin,adminLoading]=useAdmin()
  const [isSurveyor,surveyorLoading]=useSurveyor()

 
  if(loading || voterLoading || reactionerLoading || surveyLoading || proUserLoading || adminLoading || surveyorLoading){
    return <span className="loading loading-spinner text-secondary"></span>
  }
  console.log(isProUser.proUser)
  
  const invalidVoter=voters.find(voter=>voter.email === user.email && voter.surveyId === survey._id)
  const invalidReactioner=reactioners.find(reactioner=>reactioner.email === user.email && reactioner.surveyId === survey._id)
  
 
  const handleYesVote=async(id)=>{
         const res=await axiosSecure.patch(`/surveys/yesVote/${id}`)
         if(res.data.modifiedCount>0){

            const voterInfo={
               email:user?.email,
               surveyId:survey._id
            }

            const res=await axiosSecure.post('/voters',voterInfo)
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
      const res=await axiosSecure.patch(`/surveys/noVote/${id}`)
         if(res.data.modifiedCount>0){

            const voterInfo={
               email:user?.email,
               surveyId:survey._id
            }

            const res=await axiosSecure.post('/voters',voterInfo)
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
    const res=await axiosSecure.patch(`/surveys/like/${id}`)
    if(res.data.modifiedCount>0){
       const reactioner={
            email:user.email,
            surveyId:id
       }

       const res = await axiosSecure.post("/reactioner",reactioner)
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
    const res= await axiosSecure.patch(`/surveys/dislike/${id}`)
    if(res.data.modifiedCount>0){
            const reactioner={
              email:user.email,
              surveyId:id
            }

          const res=await axiosSecure.post(`/reactioner`,reactioner)
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

  const handleAddComment =async(event)=>{
    event.preventDefault()
    const form=event.target;
    const NewComment=form.comment.value;
     const comment={
         "username":user.displayName,
         "content":NewComment,
         "timestamp":new Date()
     }
     const res = await axiosSecure.put(`surveys/comment/${survey._id}`,comment)
      if(res.data.modifiedCount>0){
        surveyRefetch();
       Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your comment has been done!",
        showConfirmButton: false,
        timer: 1500
       });
     }
  }

  const handleAddReport=async(event)=>{
    event.preventDefault();
    const form=event.target;
    const NewReport=form.report.value;
    const report={
       "username":user.email,
        "content": `Report:${NewReport}`,
        "timestamp":new Date()
    }
    const res= await axiosSecure.put(`surveys/report/${survey._id}`,report)
    if(res.data.modifiedCount>0){
        surveyRefetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your report has been done!",
          showConfirmButton: false,
          timer: 1500
         });
    }
  }

  return (
    <>
    <div className="py-10 px-2">
      <div className="card card-compact w-1/2 mx-auto  bg-base-100 shadow-xl">
        <figure>
          <img src={survey?.image} className="w-full p-10" alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{survey?.title}</h2>
          <p>
            {survey?.description}
            <div className="text-start font-medium br">Category:{survey.category}</div>
                {invalidReactioner && <span className="text-red-700 font-medium text-end mt-5 text-xl">You already react this survey.</span>}
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
      <div className="flex-1 text-center mt-10">
         <h2 className='text-5xl font-medium bg-gradient-to-r from-[#e31048] to-[#ff5100] text-transparent bg-clip-text'>Please Give Your Vote</h2>
         <hr  className="mx-10 border-4 mt-5"/>
         <div className="px-16 text-start">
            <h2 className="text-[#0f1741] text-2xl font-medium mb-5">Q.{survey?.question}</h2>
                {invalidVoter && <p className="text-red-700 text-xl mb-2 font-medium">You already voted this survey.</p>}
                {(isAdmin.admin || isSurveyor.surveyor) ? <p className="text-red-700 text-xl mb-2 font-medium">Only users and proUsers can participate here.</p>:''}
            <div className="flex gap-4">
                <button onClick={()=>handleYesVote(survey._id)} disabled={invalidVoter || isAdmin.admin || isSurveyor.surveyor} className="btn bg-gradient-to-r from-[#e31048] to-[#ff5100] text-white font-medium">Yes</button>
                <button onClick={()=>handleNoVote(survey._id)} disabled={invalidVoter || !user || !user || isProUser.proUser} className="btn bg-gradient-to-r from-[#e31048] to-[#ff5100] text-white font-medium">No</button>
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

                    <h2>
                      <form onSubmit={handleAddComment}>
                      <textarea className="w-full border-2 px-3 py-2" placeholder="Comment here" name="comment" required></textarea><br></br>
                      {(!isProUser.proUser) && <p className="text-warning mb-2">Only pro user can comment here!</p>}
                      <button disabled={!isProUser.proUser} className="btn bg-gradient-to-r from-[#e31048] to-[#ff5100] text-white font-medium">Add Comment</button>
                      </form>
                    </h2>
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
                    <h2>
                    <form onSubmit={handleAddReport}>
                      <textarea className="w-full border-2 px-3 py-2" placeholder="report here" name="report" required></textarea><br></br>
                      {isAdmin.admin || isSurveyor.surveyor && <p className="text-warning mb-2">Only User and pro user can report here!</p>}
                      <button className="btn bg-gradient-to-r from-[#e31048] to-[#ff5100] text-white font-medium" disabled={isAdmin.admin || isSurveyor.surveyor}>Add Report</button>
                      </form>
                      </h2>
                </div>
            </div>
         </div>
      </div>
    </div>
    <div className="text-center pb-20">
        { invalidVoter ?
          <div>
            <h2 className="text-3xl font-semibold text-[#0f1741]">See The Chart</h2>
          <div className="flex justify-center items-center">
           <Piechart survey={survey}></Piechart>
          </div>
          </div>
          : <div>
             <h2 className="text-3xl font-semibold text-[#0f1741]">After Voting You can see the result here!</h2>
          </div>
        }
    </div>
    </>
  );
};

export default SurveyDetails;
