/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../firebase/firebase.config";
import useAxiosPublic from "../Hooks/useAxiosPublic";

export const AuthContext = createContext()

const auth=getAuth(app)

const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null)
    const [loading,setLoading] = useState(true)
    const axiosPublic=useAxiosPublic()
    const googleProvider=new GoogleAuthProvider()
   
    const createUser =(email,password)=>{
        setLoading(true)
        return  createUserWithEmailAndPassword(auth,email,password)
    }

    const updateUserProfile=(name,photoURL)=>{
        setLoading(true)
        return updateProfile(auth.currentUser,{
            displayName:name,photoURL:photoURL
        })
    }

    const logIn =(email,password)=>{
         setLoading(true)
         return signInWithEmailAndPassword(auth,email,password)
    }

    const logOut=()=>{
        setLoading(true)
        return signOut(auth)
    }

    const googleSignIn=()=>{
        setLoading(true)
        return signInWithPopup(auth,googleProvider)
    }

    useEffect(()=>{
        const unSubscribe=onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser)
            if(currentUser){
               const userInfo={ email : currentUser.email }

                axiosPublic.post('/jwt',userInfo)
                .then(res=>{
                    if(res.data.token){
                        localStorage.setItem('access-token',res.data.token)
                        setLoading(false)
                    }
                })
            }
            else{
                localStorage.removeItem("access-token")
                setLoading(false)
            }
        })

        return ()=>{
            return unSubscribe()
        }
    },[axiosPublic])

    const authInfo={
        user,
        loading,
        createUser,
        logIn,
        logOut,
        updateUserProfile,
        googleSignIn
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;