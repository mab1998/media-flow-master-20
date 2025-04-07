
import React from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type BarChartProps = {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string | string[];
      borderColor?: string;
    }[];
  };
  height?: number;
};

export const BarChart: React.FC<BarChartProps> = ({ data, height = 350 }) => {
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
      <RechartsBarChart data={transformedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        {data.datasets.map((dataset, index) => {
          let backgroundColor = dataset.backgroundColor;
          if (Array.isArray(backgroundColor)) {
            backgroundColor = backgroundColor[0];
          }
          
          return (
            <Bar 
              key={index} 
              dataKey={dataset.label} 
              fill={backgroundColor as string} 
            />
          );
        })}
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};
