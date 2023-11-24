import work from "../../../assets/image/workSection/work.png";
import signUP from "../../../assets/image/workSection/icon-1.png";
import participate from "../../../assets/image/workSection/2.png";
import earnExperience from "../../../assets/image/workSection/like.png";
import arrow from "../../../assets/image/workSection/arrow.png";

const WorkSection = () => {
  return (
    <div className="w-ful text-center">
      <img
        className="w-[150px] inline-block h-[150px] rounded-full"
        src={work}
        alt=""
      />
      <div>
        <h2 className="text-4xl font-bold my-5">
          See How It Works In Just{" "}
          <span className="bg-gradient-to-r from-[#e31048] to-[#ff5100] text-transparent bg-clip-text">
            3 Simple Steps
          </span>
        </h2>
        <p className="text-xl text-[#787d99]">
          There are three steps ,first one sign up for free, second one is{" "}
          <br /> participate in surveys, and this is Earn Experience
        </p>
        <div className="flex justify-evenly items-center py-20 px-4">
          <div className="p-4">
            <img className="inline-block" src={signUP} alt="" />
            <h2 className="text-2xl text-[#0f1741] font-bold my-5">
              Sign Up For Free
            </h2>
            <p className="text-xl text-[#787d99]">
              This is the first step where you can sign up to participate in the
              surveying projects
            </p>
          </div>
          <div>
            <img className="w-[700px] bg-[#fff3de] rounded-lg" src={arrow} alt="" />
          </div>
          <div className="p-4">
            <img
              className="w-[180px] h-[180px] rounded-full inline-block"
              src={participate}
              alt=""
            />
            <h2 className="text-2xl text-[#0f1741] font-bold my-5">
              Participate In Surveys
            </h2>
            <p className="text-xl text-[#787d99]">
              This is the second step where you can participate in the surveying
              projects
            </p>
          </div>
          <div>
            <img className="w-[700px] rounded-lg" src={arrow} alt="" />
          </div>
          <div className="p-4">
            <img
              className="w-[180px] inline-block"
              src={earnExperience}
              alt=""
            />
            <h2 className="text-2xl text-[#0f1741] font-bold my-5">
              Earn Experiences
            </h2>
            <p className="text-xl text-[#787d99]">
              This is the third step where you can earn experience to
              participate in the surveying projects
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkSection;
