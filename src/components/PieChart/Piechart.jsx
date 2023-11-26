/* eslint-disable react/prop-types */
import {
    Cell,
    PieChart,
    Pie,
    Legend,
  } from "recharts";

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Piechart = ({survey}) => {
    const chartData=[
        {name:"Yes",value:survey?.options?.yes},
        {name:"No",value:survey?.options?.no},
    ]
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

//   const pieChartData= chartData.map(data=>{
//      return {name:data.category, value: data.revinue}
//   })
    return (
        <div>
            <PieChart width={400} height={400}>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend></Legend>
        </PieChart>
        </div>
    );
};

export default Piechart;