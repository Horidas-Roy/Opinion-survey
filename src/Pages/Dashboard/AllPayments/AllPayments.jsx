import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


const AllPayments = () => {
    const axiosSecure=useAxiosSecure()
    const {data:payments,isLoading}=useQuery({
        queryKey:['payments'],
        queryFn:async()=>{
            const res=await axiosSecure.get('/payments/proUsers')
            return res.data;
        }
    })
    if(isLoading){
        return <span className="loading loading-spinner text-secondary"></span>
    }
    return (
        <div>
        <div className="flex justify-evenly my-4">
          <h2 className="text-3xl">All Payments</h2>
          <h2 className="text-3xl">Total Users: {payments.length}</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Email</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {payments?.map((payment, index) => (
                <tr key={payment._id}>
                  <th>{index + 1}</th>
                  <td>{payment.email}</td>
                  <td>{payment.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default AllPayments;