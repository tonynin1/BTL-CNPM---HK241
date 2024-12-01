"use client";
import dynamic from 'next/dynamic';
import 'chart.js/auto';
const Bar = dynamic(() => import('react-chartjs-2').then((mod) => mod.Bar), {
  ssr: false,
});

const BarChart = ({data, width = '100%', height = '100%'} : {data: any, width: string, height: string}) => {
  return (
    <div style={{ width: `${width}`, height: `${height}` }}>
      <Bar data={data} />
    </div>
  );
};
export default BarChart;