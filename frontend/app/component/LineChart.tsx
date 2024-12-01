"use client";
import dynamic from 'next/dynamic';
import 'chart.js/auto';
const Line = dynamic(() => import('react-chartjs-2').then((mod) => mod.Line), {
  ssr: false,
});
const data = {
  labels: ['January', 'February', 'March', 'April', 'May'],
  datasets: [
    {
      label: 'GeeksforGeeks Line Chart',
      data: [65, 59, 80, 81, 56],
      fill: true    ,
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: "rgb(75, 192, 192,0.1)",
      tension: 0.1,
    },
    {
      label: 'GeeksforGeeks Line Chart2',
      data: [28, 48, 40, 19, 86],
      fill: true,
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: "rgb(255, 99, 132,0.1)",
      tension: 0.1,
    }
  ],
};
const LineChart = () => {
  return (
    <div >
      <h1>Example 1: Line Chart</h1>
      <Line 
        data={data} 
        itemType='line'
      />
    </div>
  );
};
export default LineChart;