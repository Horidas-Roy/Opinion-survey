import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const SurveyCreation = () => {

     const axiosSecure=useAxiosSecure()


    const handleSubmit=async(event)=>{
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
    //    console.log(newSurvey)
       const res=await axiosSecure.post('/surveys',newSurvey)
       console.log(res.data)
       if(res.data.insertedId){
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your survey has been addeded successfully",
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
            <form onSubmit={handleSubmit} className="card-body w-[50vw]">
              <div className="flex gap-5">
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  name="title"
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
                  defaultValue={0}
                  disabled
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Dislike</span>
                </label>
                <input name="dislike" defaultValue={0} disabled className="input input-bordered w-full max-w-xs">
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
                  value={"Add Survey"}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyCreation;
