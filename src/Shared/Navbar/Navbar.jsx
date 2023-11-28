import { NavLink } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAdmin from "../../Hooks/useAdmin";
import useSurveyor from "../../Hooks/useSurveyor";
import useProUser from "../../Hooks/useProUser";

const Navbar = () => {
  const { user, logOut, loading } = useAuth();
  const [isAdmin, adminLoading] = useAdmin();
  const [isSurveyor, surveyorLoading] = useSurveyor();
  const [isProUser, proUserLoading] = useProUser();
  console.log(isAdmin, isSurveyor, isProUser);
  if (adminLoading || surveyorLoading || proUserLoading || loading) {
    return <span className="loading loading-spinner text-secondary"></span>;
  }

  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/allSurveys">All Surveys</NavLink>
      </li>
      <li>
        <NavLink to="/proUser">Pro User</NavLink>
      </li>
      <li>
        {(user &&
          (isProUser.proUser || isAdmin.admin || isSurveyor.surveyor)) || (
          <NavLink to="/dashboard/userHome">Dashboard</NavLink>
        )}
      </li>
      <li>
        {isProUser.proUser && (
          <NavLink to="/dashboard/proUserHome">Dashboard</NavLink>
        )}
      </li>
      <li>
        {isAdmin.admin && (
          <NavLink to="/dashboard/adminHome">Dashboard</NavLink>
        )}
      </li>
      <li>
        {isSurveyor.surveyor && (
          <NavLink to="/dashboard/surveyorHome">Dashboard</NavLink>
        )}
      </li>
      <li>
        {user ? (
          <button onClick={logOut}>LogOut</button>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </li>
    </>
  );
  return (
    <div className="navbar bg-[#fff3de] text-[#0f1741] font-semibold h-10vh">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navLinks}
          </ul>
        </div>
        <a className="text-3xl font-bold">
          <span className="text-[#ff5100] font-extrabold">O</span>piniun
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>
      <div className="navbar-end">
        {user && (
          <div className="flex justify-center items-center gap-3">
            <h2>{user?.displayName}</h2>
            <img
              className="w-10 h-10 rounded-full"
              src={user?.photoURL}
              alt=""
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
