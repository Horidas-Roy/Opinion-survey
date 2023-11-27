import { Link } from "react-router-dom";
import useProUser from "../../../Hooks/useProUser";

const ProUser = () => {
    const[isProUser,proUserLoading]=useProUser()
    


    if(proUserLoading){
        return <span className="loading loading-spinner text-secondary"></span>
    }


    return (
        <div className="h-[100vh] flex justify-center">
            <div className="mt-10">
            <div className="text-success text-center mb-10 text-2xl font-semibold">
                {
                  isProUser?.proUser && <p>You already paid.And You already a Pro User.<Link to='/'><button className="btn bg-gradient-to-r from-[#e31048] to-[#ff5100] text-white font-bold text-xl py-2 px-4">Back Home</button></Link></p>
                }
             </div>
            <h2 className="text-2xl font-medium">If you are a Pro-User, you can comment on the survey and get other facilities.<br></br>
            Want to be a Pro-User? Please payment here:($100)</h2>
            <div>
                <h2>PayMent: <Link to='/payment'><button 
                disabled={isProUser?.proUser}
                className="btn btn-primary">Pay</button></Link></h2>
            </div>
            </div>
        </div>
    );
};

export default ProUser;