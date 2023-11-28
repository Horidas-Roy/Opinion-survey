import { Link,useNavigate,useLocation } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useState } from "react";
import SocialLogin from "../../components/socialLogin/SocialLogin";

const LoginPage = () => {
   const [error,setError]=useState()
    const {logIn}=useAuth()
    const navigate=useNavigate()
    const location=useLocation()
    // console.log(error)

  const handleLogin=(event)=>{
     event.preventDefault();
    const form = event.target;
    const email=form.email.value;
    const password=form.password.value;

    // console.log(email,password)
    logIn(email,password)
    .then(()=>{
        // console.log(result.user)
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Log in successfull",
          showConfirmButton: false,
          timer: 1500
        });
        navigate(location?.state ? location.state : '/')
    })
    .catch(error=>{
      setError(error.message)
      console.log(error.message)
    })
  }
  return (
    <div className="h-[100vh] flex justify-center items-center">
      <div>
        <div className="hero min-h-screen">
          <div className="hero-content w-[50vw]">
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <form onSubmit={handleLogin} className="card-body text-[#0f1741]">
              <h2 className=" text-center text-2xl font-semibold">Please Login</h2>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="email"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    className="input input-bordered"
                    required
                  />
                  <label className="label">
                    <a href="#" className="label-text-alt link link-hover">
                      Forgot password?
                    </a>
                  </label>
                </div>
                <div className="form-control">
                  <span className="text-red-600 text-sm mb-2 text-center">{error}</span>
                  <button className="btn bg-gradient-to-r from-[#e31048] to-[#ff5100] text-white font-bold text-xl py-2 px-4 rounded-full">Login Now</button> 
                  <span className="text-center pt-3">New here? Please <Link to='/resister'><span className="bg-gradient-to-r from-[#e31048] to-[#ff5100] text-transparent bg-clip-text">Resister</span></Link></span>
                  <SocialLogin></SocialLogin>
                </div>
              </form>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
