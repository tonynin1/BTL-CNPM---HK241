import React from "react";
import StudentHeader from "@/app/ui/StudentHeader";

export default function page() {
  return (
    <div className="bg-[#353535] h-[100vh] ">
      <StudentHeader />
      <div className="flex justify-center p-6">
        <div
          className="w-3/4 bg-white shadow-2xl shadow-gray
        -500 p-4"
        >
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th>Song</th>
                <th>Artist</th>
                <th>Year</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                <td>Malcolm Lockyer</td>
                <td>1961</td>
              </tr>
              <tr>
                <td>Witchy Woman</td>
                <td>The Eagles</td>
                <td>1972</td>
              </tr>
              <tr>
                <td>Shining Star</td>
                <td>Earth, Wind, and Fire</td>
                <td>1975</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
