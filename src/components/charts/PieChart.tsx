
import React from 'react';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

type PieChartProps = {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
      borderWidth?: number;
    }[];
  };
  height?: number;
};

export const PieChart: React.FC<PieChartProps> = ({ data, height = 350 }) => {
  // Transform data to format required by Recharts
  const transformedData = data.labels.map((label, index) => {
    return {
      name: label,
      value: data.datasets[0].data[index],
    };
  });

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsPieChart>
        <Pie
          data={transformedData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        >
          {transformedData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={data.datasets[0].backgroundColor[index % data.datasets[0].backgroundColor.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
};
