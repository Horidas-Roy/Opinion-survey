/* eslint-disable react/prop-types */
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { Link } from "react-router-dom";

const SurveyCard = ({ survey }) => {
    // console.log(survey)
  return (
    <div className="card card-compact bg-base-100 shadow-xl">
      <figure>
        <img
          src={survey?.image}
          className="h-52 w-full"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-[#0f1741] text-start">{survey?.title}</h2>
        <p className="text-start text-[#787d99]">{survey?.description.slice(0,100)}</p>
        <div className="flex justify-between text-2xl my-5">
        <span>Total Vote:{survey?.options?.total}</span>
        <div className="flex gap-4">
        <span className="flex items-center"><AiFillLike />:{survey?.likeCount}</span>
        <span className="flex items-center"><AiFillDislike />:{survey?.dislikeCount}</span>
        </div>
        </div>
        <div className="justify-center">
          <Link to={`/surveyDetails`}>
          <button className="btn w-1/2 bg-gradient-to-r from-[#e31048] to-[#ff5100] text-white font-bold text-xl">Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SurveyCard;
