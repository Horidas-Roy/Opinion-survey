import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { FaGoogle } from "react-icons/fa";

const SocialLogin = () => {
    const {googleSignIn} = useAuth()
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()

    const handleGoogleSignIn=()=>{
        googleSignIn()
        .then(result=>{
            console.log(result.user)
            const userInfo = {
                email: result.user?.email,
                name:result.user?.displayName
            }
            axiosPublic.post('/users',userInfo)
            .then(res=>{
                console.log(res.data)
                navigate('/')
            })
            .catch(error=>{
                console.log(error)
            })
        })
        .catch(error=>{
            console.log(error)
        })
    }
  return (
    <div>
      <div className="text-center">
        <div className="divider"></div>
        <button onClick={handleGoogleSignIn} className="btn bg-gradient-to-r from-[#e31048] to-[#ff5100] text-white font-bold text-xl py-2 px-4 rounded-full'">
          <FaGoogle className="mr-1"></FaGoogle>
          Google
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;