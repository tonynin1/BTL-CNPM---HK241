'use client';

import React, { useEffect } from 'react';
import StudentHeader, { StudentHeaderProps } from "@/app/ui/StudentHeader"
import { useUserSession } from "@/app/API/getMe";
import { redirect } from 'next/navigation';
import { getAllPendingRequest } from '@/app/API/student-trackingReq/student-trackingReq';

let list = [
  {
    printOrderId: 5,
    "attributes": "Blue",
    "startTime": "2023-10-19 12:34:56.789",
    "endTime": "2023-10-19 12:34:56.789",
    "poStatus": "Pending",
    "numCopies": 3

  },
  {
    printOrderId: 3,
    "attributes": "Red",
    "startTime": "2023-10-19 12:34:56.789",
    "endTime": "2023-10-19 12:34:56.789",
    "poStatus": "Pending",
    "numCopies": 1
  }
]
export default function Home() {
  const { userInfo, loggedIn } = useUserSession();
const [allPendingReq, setAllPendingReq] = React.useState<any>([Object]); // Đặt giá trị mặc định là mảng rỗng
const fetching = async () => {
  if (!userInfo) return; // Thoát sớm nếu userInfo chưa sẵn sàng
  try {
    let data = await getAllPendingRequest(userInfo.customerId); // Thay thế allPendingReq bằng API gọi thực tế
    setAllPendingReq(data.data); // Thay đổi state thành dữ liệu mới
    console.log(data.data); // Log dữ liệu mới thay vì state
  } catch (error) {
    console.log("Error fetching data:", error);
    // window.location.reload();
  }
};

useEffect(() => {
  if (userInfo) {
    fetching();
  }
}, [userInfo]); // Chỉ gọi fetching khi userInfo thay đổi

if (!userInfo) {
  return <div>Loading</div>;
}

if (userInfo.role === "SPSO") {
  redirect("/spso");
}
  return (
    <main className="bg-[#353535] pb-[500px]">
      <StudentHeader header={userInfo as StudentHeaderProps} />
      <div className="inner_wrap container">
        <div className="container upload_container">
          
        <h1 className="text-white">Bảng Dữ Liệu Khách Hàng</h1>
        <table className="table table-dark table-striped">
        <thead>
            <tr>
                <th>Chọn</th>
                <th>Print Order Id</th>
                <th>Attributes</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>PO Status</th>
                <th>Num Copies</th>
            </tr>
        </thead>
        <tbody>
            {allPendingReq.map((item : any, index: number) => (
              <tr key={index}>
                <td className="align-middle"><input type="checkbox" /></td>
                <td className="align-middle">{item.printOrderId}</td>
                <td className="align-middle">{item.attributes}</td>
                <td className="align-middle">{item.startTime}</td>
                <td className="align-middle">{item.endTime}</td>
                <td className="align-middle">{item.poStatus}</td>
                <td className="align-middle">{item.numCopies}</td>
              </tr>
            ))}
        </tbody>
      </table>
        <div className="Button">
          <button type="button" className="btn btn-outline-success">Edit</button>
          <button type="button" className="btn btn-outline-danger">Delete</button>
        </div>

        </div>
      </div>
    </main>
  );
}