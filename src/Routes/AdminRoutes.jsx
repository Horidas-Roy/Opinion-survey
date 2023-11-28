/* eslint-disable react/prop-types */
import useAdmin from '../Hooks/useAdmin';
import useAuth from '../Hooks/useAuth';
import { Navigate } from 'react-router-dom';

const AdminRoutes = ({children}) => {
    const {user,loading}=useAuth()
    const [isAdmin,adminLoading]=useAdmin()

   if(loading || adminLoading){
     return <span className="loading loading-spinner text-secondary"></span>
   }

   if(user && isAdmin){
     return children;
   }

    return <Navigate to='/' state={{from:location}} replace></Navigate>
};

export default AdminRoutes;