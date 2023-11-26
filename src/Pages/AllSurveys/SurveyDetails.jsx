import { useLoaderData } from "react-router-dom";
import Comment from "../../components/Comment/Comment";
import Report from "../../components/Report/Report"
import Piechart from "../../components/PieChart/Piechart";

const SurveyDetails = () => {
  const survey = useLoaderData();
  // console.log(survey);
 
  const handleYesVote=(id)=>{
        console.log("Yes Vote",id)
  }

  const handleNoVote=(id)=>{
      console.log("No vote",id)
  }

  const handleLike=(id)=>{
    console.log("like",id)
  }

  const handleDisLike=(id)=>{
    console.log("dislike",id)
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
            <span className="flex gap-4 justify-end mt-5">
                <button onClick={()=>handleLike(survey._id)} className="btn bg-gradient-to-r from-[#e31048] to-[#ff5100] text-white font-medium">Like</button>
                <button onClick={()=>handleDisLike(survey._id)} className="btn bg-gradient-to-r from-[#e31048] to-[#ff5100] text-white font-medium">DisLike</button>
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
            <h2 className="text-[#0f1741] text-2xl font-medium">Q.{survey?.question}</h2>
            <div className="mt-5 flex gap-4">
                <button onClick={()=>handleYesVote(survey._id)} className="btn bg-gradient-to-r from-[#e31048] to-[#ff5100] text-white font-medium">Yes</button>
                <button onClick={()=>handleNoVote(survey._id)} className="btn bg-gradient-to-r from-[#e31048] to-[#ff5100] text-white font-medium">No</button>
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
