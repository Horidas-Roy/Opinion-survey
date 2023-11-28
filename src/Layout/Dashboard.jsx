import { NavLink, Outlet } from "react-router-dom";
import useSurveyor from "../Hooks/useSurveyor";
import useProUser from "../Hooks/useProUser";
import useAdmin from "../Hooks/useAdmin";

const Dashboard = () => {
  const [isAdmin, adminLoading] = useAdmin();
  const [isSurveyor, surveyorLoading] = useSurveyor();
  const [isProUser,proUserLoading]=useProUser()
  console.log(isAdmin, isSurveyor,isProUser);
  if (adminLoading || surveyorLoading || proUserLoading) {
    return <span className="loading loading-spinner text-secondary"></span>;
  }
  return (
    <div className="flex">
      <div className="w-64 min-h-screen bg-orange-400">
        <ul className="menu">
          {isAdmin?.admin && (
            <>
              <li>
                <NavLink to="/dashboard/adminHome">Admin Home</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/allUsers">All Users</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/allPayments">All Payments</NavLink>
              </li>
            </>
          )}
          {isSurveyor?.surveyor && (
            <>
              <li>
                <NavLink to="/dashboard/surveyorHome">Surveyor Home</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addSurvey">Survey Creation</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/surveyManagement">Survey Managment</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/allVoters">All Voters</NavLink>
              </li>
            </>
          )}
          { isProUser?.proUser && (
             <>
             <li>
             <NavLink to="/dashboard/proUserHome">ProUser Home</NavLink>
             </li>
             </>
          )}
          {!isAdmin?.admin && !isSurveyor?.surveyor && !isProUser?.proUser &&
            <li>
              <NavLink to="/dashboard/userHome">User Home</NavLink>
            </li>
          }
          {/* shared navlinks */}
          <div className="divider"></div>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/allSurveys">All Surveys</NavLink>
          </li>
          <li>
            <NavLink to="/proUser">Pro User</NavLink>
          </li>
        </ul>
      </div>
      <div className="flex justify-center w-full">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
