/* eslint-disable react/prop-types */
import useAuth from '../Hooks/useAuth';
import { NavLink, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const {user,loading}=useAuth()
    const location=useLocation()

    if(loading){
        return <span className="loading loading-spinner text-secondary"></span>
    }

    if(user){
        return children;
    }

    return <NavLink to='/login' state={{from:location}} replace></NavLink>
};

export default PrivateRoute;