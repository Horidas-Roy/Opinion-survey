import useAuth from '../../../Hooks/useAuth';

const UserHome = () => {
  const {user}=useAuth()
  return (
      <div className=" p-10 text-center">
         <div>
         <h2 className="text-3xl flex gap-5 font-medium">
              <span>Hi </span>
              <span className=' bg-gradient-to-r from-[#e31048] to-[#ff5100] text-transparent bg-clip-text'>{user?.displayName}</span>
          </h2>
         </div>
          <div>
          <h2 className="text-center text-5xl">Welcome in Your Dashboard</h2>
          </div>
      </div>
  );
};

export default UserHome;