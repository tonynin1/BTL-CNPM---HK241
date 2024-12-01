"use client";
import dynamic from 'next/dynamic';
import 'chart.js/auto';
const Doughnut = dynamic(() => import('react-chartjs-2').then((mod) => mod.Doughnut), {
  ssr: false,
});

const DoughnutChart = ({data, width = '100%', height = '100%'} : {data: any, width: string, height: string}) => {
  return (
    <div style={{ width: `${width}`, height: `${height}` }}>
      <Doughnut data={data} />
    </div>
  );
};
export default DoughnutChart;