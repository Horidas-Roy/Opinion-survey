import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import {
    Cell,
    PieChart,
    Pie,
    Legend,
  } from "recharts";
  
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];
 

const AdminHome = () => {
     const axiosPublic=useAxiosPublic()
     

     const {data:surveys=[]}=useQuery({
        queryKey:['surveys'],
        queryFn:async()=>{
            const res=await axiosPublic.get('/surveys')
            return res.data;
        }
     })

     // custom shape for pie chart
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
     
     const pieChartData=surveys.map(survey=>{
         return {name:survey.title,value:survey.options.total}
     })

     console.log(pieChartData)


    return (
        <div>
        <div className="flex justify-evenly gap-10 my-4">
          <h2 className="text-3xl">All Suveys</h2>
          <h2 className="text-3xl">Total surveys: {surveys.length}</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Survey Title</th>
                <th>Vote</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {surveys?.map((survey, index) => (
                <tr key={survey._id}>
                  <th>{index + 1}</th>
                  <td>{survey.title}</td>
                  <td>{survey.options.total}</td>
                  <td>{survey.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="my-10">
        <PieChart width={400} height={400}>
          <Pie
            data={pieChartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {pieChartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend></Legend>
        </PieChart>
        </div>
      </div>
    );
};

export default AdminHome;