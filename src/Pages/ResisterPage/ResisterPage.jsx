import { Link,useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useState } from "react";



const ResisterPage = () => {
   const [error,setError] = useState('')
   const {createUser,updateUserProfile}=useAuth()
   const navigate= useNavigate() 
   const axiosPublic=useAxiosPublic()

    const handleResister=(event)=>{
        event.preventDefault();
        const form=event.target;
        const name=form.name.value;
        const email=form.email.value;
        const password=form.password.value;
        const photoURL=form.photoURL.value;

        // console.log(name,email,password,photoURL)
        createUser(email,password)
        .then(result=>{
           console.log('user',result.user)
           updateUserProfile(name,photoURL)
           .then(()=>{
                
                //create user entry in the database
                const userInfo={
                   name:name,email:email
                }

                axiosPublic.post('/users',userInfo)
                .then(res=>{
                   if(res.data.insertedId){
                    Swal.fire({
                      position: "top-end",
                      icon: "success",
                      title: "Resistration is Successfully done!",
                      showConfirmButton: false,
                      timer: 1500
                    });
                    navigate('/')
                   }
                  // console.log(res)
                })
                
                
           })
           .catch(error=>{
              console.log(error)
              setError(error.message)
           })
        })
        .catch(error=>{
          console.log(error)
          setError(error.message)
        })
    }
    return (
        <div className="h-[100vh] flex justify-center items-center">
      <div>
        <div className="hero min-h-screen">
          <div className="hero-content flex-col w-[50vw]">
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <form onSubmit={handleResister} className="card-body text-[#0f1741]">
              <h2 className=" text-center text-2xl font-semibold">Please Resister</h2>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="email"
                    name="email"
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
                  <label className="label">
                    <span className="label-text">Photo URL</span>
                  </label>
                  <input
                    type="text"
                    name="photoURL"
                    placeholder="PhotoURL"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                <p className="text-red-600 text-sm mb-2 text-center">{error}</p>
                  <button className="btn bg-gradient-to-r from-[#e31048] to-[#ff5100] text-white font-bold text-xl py-2 px-4 rounded-full'">Resister Now</button>
                  <p className="text-center py-3">Already have an account? please <Link to='/login'><span className="bg-gradient-to-r from-[#e31048] to-[#ff5100] text-transparent bg-clip-text">Login</span></Link> </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
};

export default ResisterPage;