"use client";
import dynamic from "next/dynamic";
import "chart.js/auto";
const Bar = dynamic(() => import("react-chartjs-2").then((mod) => mod.Bar), {
  ssr: false,
});

const BarChart = ({ data }: { data: any }) => {
  return (
    <div className="w-full my-auto">
      <Bar data={data} />
    </div>
  );
};
export default BarChart;
