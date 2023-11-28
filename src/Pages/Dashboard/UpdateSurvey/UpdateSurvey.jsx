import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const UpdateSurvey = () => {
        const axiosSecure=useAxiosSecure()
        const {id} =useParams()
        const {data:survey=[],isLoading,refetch}=useQuery({
            queryKey:['surveys'],
            queryFn:async()=>{
                const res = await axiosSecure.get(`/surveys/${id}`)
                return res.data;
            }
        })

        if(isLoading){
            return <span className="loading loading-spinner text-secondary"></span>
        }

        // const survey=surveys.find(survey=>survey._id === id)
        console.log(survey)

    const handleUpdate=async(event)=>{
        event.preventDefault()
        const form=event.target;
        const title=form.title.value;
        const question=form.question.value;
        const yes=parseInt(form.yes.value);
        const no=parseInt(form.no.value);
        const category=form.category.value;
        const likeCount=parseInt(form.like.value);
        const dislikeCount=parseInt(form.dislike.value);
        const image=form.photoURL.value;
        const description=form.description.value;
        const timestamp=new Date();
        const total=parseInt(yes)+parseInt(no)
        const comments=[]
        const reports=[]


        const newSurvey={
            title,
            description,
            question,
            options:{yes,no,total},
            likeCount,
            dislikeCount,
            category,
            timestamp,
            image,
            comments,
            reports

        }
       console.log(newSurvey)
       const res=await axiosSecure.patch(`/surveys/update/${id}`,newSurvey)
       console.log(res.data)
       if(res.data.modifiedCount>0){
        refetch();
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your survey has been updated successfully",
            showConfirmButton: false,
            timer: 1500
          });
       }
    }
  return (
    <div className="p-10 text-center">
      <h2 className="text-3xl font-semibold mb-0 pb-0">Create a Survey</h2>
      <div className="hero min-h-screen">
        <div className="hero-content">
          <div className="card w-full shadow-2xl">
            <form onSubmit={handleUpdate} className="card-body w-[50vw]">
              <div className="flex gap-5">
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  name="title"
                  defaultValue={survey.title}
                  placeholder="Write title here"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="form-control w-full max-w-xs">
              <label className="label">
                  <span className="label-text">Survey Question</span>
                </label>
                <input
                  type="text"
                  name="question"
                  defaultValue={survey.question}
                  placeholder="Question"
                  className="input input-bordered"
                />
              </div>
              </div>
              <div className="flex gap-5">
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Yes vote Count</span>
                </label>
                <input
                  type="number"
                  name="yes"
                  defaultValue={survey.options.yes}
                  placeholder="yes count"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="form-control w-full max-w-xs">
              <label className="label">
                  <span className="label-text">No Vote Count</span>
                </label>
                <input
                  type="number"
                  name="no"
                  defaultValue={survey.options.no}
                  placeholder="no count"
                  className="input input-bordered"
                />
              </div>
              </div>
              <div className="flex gap-5">
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Category</span>
                </label>
                <input
                  type="text"
                  name="category"
                  defaultValue={survey.category}
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Time Stamp</span>
                </label>
                <input name="timestamp" defaultValue={new Date()} disabled className="input input-bordered w-full max-w-xs">
                </input>
              </div>
              </div>
              <div className="flex gap-5">
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Like</span>
                </label>
                <input
                  type="text"
                  name="like"
                  defaultValue={survey.likeCount}
                  disabled
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Dislike</span>
                </label>
                <input name="dislike" defaultValue={survey.dislikeCount} disabled className="input input-bordered w-full max-w-xs">
                </input>
              </div>
              </div>
              <div className="flex gap-5">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Sample Survey PhotoURL</span>
                </label>
                <textarea
                  type="text"
                  name="photoURL"
                  defaultValue={survey.image}
                  placeholder="Sample survey PhotoURL"
                  className="input input-bordered w-full"
                />
              </div>
              </div>
              <div className="flex gap-5">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  type="text"
                  name="description"
                  defaultValue={survey.description}
                  placeholder="Type here"
                  className="input input-bordered w-full"
                />
              </div>
              </div>
              <div className="form-control w-full mt-5">
                <input
                  type="submit"
                  placeholder="Type here"
                  className="input input-bordered w-full bg-orange-400 text-white font-semibold"
                  value={"Update Survey"}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    
)};

export default UpdateSurvey;