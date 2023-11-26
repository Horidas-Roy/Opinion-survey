/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import useSurveyor from '../Hooks/useSurveyor';

const SurveyorRoutes = ({children}) => {
    const {user,loading}=useAuth()
    const [isSurveyor,surveyorLoading]=useSurveyor()

    if(loading || surveyorLoading){
        return <span className="loading loading-spinner text-secondary"></span>
    }

    if(user && isSurveyor){
        return children;
    }

    return <Navigate to='/' state={{from:location}} replace></Navigate>
};

export default SurveyorRoutes;