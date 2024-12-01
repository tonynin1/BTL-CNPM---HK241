"use client";
import dynamic from 'next/dynamic';
import 'chart.js/auto';
const Line = dynamic(() => import('react-chartjs-2').then((mod) => mod.Line), {
  ssr: false,
});

const LineChart = ({ data, width, height } : { data: any, width: string, height: string} ) => {
  return (
    <div style={{width: `${width}`, height: `${height}`}}>
      <Line 
        data={data} 
        itemType='line'
      />
    </div>
  );
};
export default LineChart;