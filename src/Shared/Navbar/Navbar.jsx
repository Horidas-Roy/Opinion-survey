import { NavLink } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const Navbar = () => {
    const {user,logOut}=useAuth()
    const navLinks=<>
       <li><NavLink to='/'>Home</NavLink></li>
       <li><NavLink to='/allSurveys'>All Surveys</NavLink></li>
       <li><NavLink to='/proUsers'>Pro Users</NavLink></li>
       <li>
        {
          user ? <button onClick={logOut}>LogOut</button>
          :<NavLink to='/login'>Login</NavLink>
        }
       </li>
    </>
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
        <a className="text-3xl font-bold"><span className="text-[#ff5100] font-extrabold">O</span>piniun</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navLinks}
        </ul>
      </div>
      <div className="navbar-end">
        <a className="btn">Button</a>
      </div>
    </div>
  );
};

export default Navbar;
