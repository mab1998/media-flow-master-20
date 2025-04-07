
import React from 'react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type LineChartProps = {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor?: string;
      fill?: boolean;
    }[];
  };
  height?: number;
};

export const LineChart: React.FC<LineChartProps> = ({ data, height = 350 }) => {
  // Transform data to format required by Recharts
  const transformedData = data.labels.map((label, index) => {
    const dataPoint: Record<string, any> = { name: label };
    
    data.datasets.forEach(dataset => {
      dataPoint[dataset.label] = dataset.data[index];
    });
    
    return dataPoint;
  });

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsLineChart data={transformedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        {data.datasets.map((dataset, index) => (
          <Line
            key={index}
            type="monotone"
            dataKey={dataset.label}
            stroke={dataset.borderColor}
            fill={dataset.fill ? dataset.backgroundColor : undefined}
            activeDot={{ r: 8 }}
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};
