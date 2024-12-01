'use client'
import React, { useEffect, useState } from "react";
import StudentHeader, { StudentHeaderProps } from "@/app/ui/StudentHeader";
import { getUserInfo } from "@/app/API/userInfo";
import { redirect } from "next/navigation";
import { useUserSessionForCustomer } from "@/app/API/getMe";
import LoadingPage from "@/app/ui/LoadingPage";
import { getPrintOrdersByCustomerIdThatCompleted } from "@/app/API/student-printHistory/student-printHistory";
import build from "next/dist/build";

export default function page() {

  const { userInfo, loggedIn } = useUserSessionForCustomer();
  const [allPrintOrders, setAllPrintOrders] = useState<any[]>([]);

  const fetching = async () => {
    if (!userInfo)
      return;
    try {
      const data = await getPrintOrdersByCustomerIdThatCompleted(userInfo.customerId);
      console.log(data.data);
      setAllPrintOrders(data.data);
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(() => {
    if (userInfo){
      fetching();

    }
  }, [userInfo]);
  if (!userInfo || !allPrintOrders || !Array.isArray(allPrintOrders)) {
    console.log(allPrintOrders)
    return <LoadingPage></LoadingPage>
  }
  if (userInfo.role === 'SPSO'){
    // router.replace('http://localhost:8080')
    redirect('/spso')
  }

  const printOrders = [
    {
        printOrderId: "PO10001",
        attribute: "A4, Color",
        createdAt: "2024-12-01 08:00:00",
        printedAt: "2024-12-01 08:15:00",
        status: "Completed",
        copies: 10,
    },
    {
        printOrderId: "PO10002",
        attribute: "A3, Black & White",
        createdAt: "2024-12-01 09:00:00",
        printedAt: "2024-12-01 09:20:00",
        status: "Completed",
        copies: 5,
    },
    {
        printOrderId: "PO10003",
        attribute: "A4, Color",
        createdAt: "2024-12-01 10:30:00",
        printedAt: null, // Chưa in
        status: "Pending",
        copies: 3,
    },
    {
        printOrderId: "PO10004",
        attribute: "A5, Black & White",
        createdAt: "2024-12-01 11:00:00",
        printedAt: "2024-12-01 11:30:00",
        status: "Completed",
        copies: 15,
    },
    {
        printOrderId: "PO10005",
        attribute: "A4, Color",
        createdAt: "2024-12-01 12:00:00",
        printedAt: null, // Chưa in
        status: "Queued",
        copies: 7,
    },
    {
        printOrderId: "PO10006",
        attribute: "A3, Black & White",
        createdAt: "2024-12-01 13:00:00",
        printedAt: "2024-12-01 13:45:00",
        status: "Completed",
        copies: 12,
    },
    {
        printOrderId: "PO10007",
        attribute: "A4, Color",
        createdAt: "2024-12-01 14:00:00",
        printedAt: null, // Chưa in
        status: "Pending",
        copies: 20,
    },
    {
        printOrderId: "PO10007",
        attribute: "A4, Color",
        createdAt: "2024-12-01 14:00:00",
        printedAt: null, // Chưa in
        status: "Pending",
        copies: 20,
    },
    {
        printOrderId: "PO10007",
        attribute: "A4, Color",
        createdAt: "2024-12-01 14:00:00",
        printedAt: null, // Chưa in
        status: "Pending",
        copies: 20,
    },
    {
        printOrderId: "PO10007",
        attribute: "A4, Color",
        createdAt: "2024-12-01 14:00:00",
        printedAt: null, // Chưa in
        status: "Pending",
        copies: 20,
    },
    {
        printOrderId: "PO10007",
        attribute: "A4, Color",
        createdAt: "2024-12-01 14:00:00",
        printedAt: null, // Chưa in
        status: "Pending",
        copies: 20,
    },
    {
        printOrderId: "PO10007",
        attribute: "A4, Color",
        createdAt: "2024-12-01 14:00:00",
        printedAt: null, // Chưa in
        status: "Pending",
        copies: 20,
    },
    {
        printOrderId: "PO10007",
        attribute: "A4, Color",
        createdAt: "2024-12-01 14:00:00",
        printedAt: null, // Chưa in
        status: "Pending",
        copies: 20,
    },
    {
        printOrderId: "PO10007",
        attribute: "A4, Color",
        createdAt: "2024-12-01 14:00:00",
        printedAt: null, // Chưa in
        status: "Pending",
        copies: 20,
    },
    {
        printOrderId: "PO10007",
        attribute: "A4, Color",
        createdAt: "2024-12-01 14:00:00",
        printedAt: null, // Chưa in
        status: "Pending",
        copies: 20,
    },
    {
        printOrderId: "PO10007",
        attribute: "A4, Color",
        createdAt: "2024-12-01 14:00:00",
        printedAt: null, // Chưa in
        status: "Pending",
        copies: 20,
    },

    {
        printOrderId: "PO10007",
        attribute: "A4, Color",
        createdAt: "2024-12-01 14:00:00",
        printedAt: null, // Chưa in
        status: "Pending",
        copies: 20,
    },
    {
        printOrderId: "PO10007",
        attribute: "A4, Color",
        createdAt: "2024-12-01 14:00:00",
        printedAt: null, // Chưa in
        status: "Pending",
        copies: 20,
    },
    {
        printOrderId: "PO10007",
        attribute: "A4, Color",
        createdAt: "2024-12-01 14:00:00",
        printedAt: null, // Chưa in
        status: "Pending",
        copies: 20,
    },
    {
        printOrderId: "PO10007",
        attribute: "A4, Color",
        createdAt: "2024-12-01 14:00:00",
        printedAt: null, // Chưa in
        status: "Pending",
        copies: 20,
    },

    {
        printOrderId: "PO10007",
        attribute: "A4, Color",
        createdAt: "2024-12-01 14:00:00",
        printedAt: null, // Chưa in
        status: "Pending",
        copies: 20,
    },

];
    
  return (
    <div className="bg-[#353535] pb-[500px]">

      <StudentHeader header={userInfo as StudentHeaderProps} />

      <div className="container p-4 shadow-2xl sm:rounded-lg mt-8 bg-white dark:bg-gray-800">
          <div 
            className=" overflow-y-auto max-h-[90vh]"
          >
              <table className='w-full table-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>

                  <caption className="caption-top text-center uppercase text-3xl">
                      lịch sử in
                  </caption>
                  <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                      <tr>
                      <th scope="col" className='px-6 py-3'>Print order ID</th>
                      <th scope="col" className='px-6 py-3'>Thuộc tính</th>
                      <th scope="col" className='px-6 py-3'>Thời gian tạo</th>
                      <th scope="col" className='px-6 py-3'>Thời gian in</th>
                      <th scope="col" className='px-6 py-3'>Trạng thái</th>
                      <th scope="col" className='px-6 py-3'>Số lượng bản sao</th>

                      <th scope="col" className='px-6 py-3'>Tòa</th>
                      <th scope="col" className='px-6 py-3'>Phòng</th>
                      </tr>
                  </thead>
                  <tbody>
                      {allPrintOrders.map((item : any, index) => (
                          <tr key={index} className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'>
                              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                  {item.printOrderId}
                              </th>
                              <td className="px-6 py-4">
                                  {item.attributes}
                              </td>
                              <td className="px-6 py-4">
                                  {item.startTime}
                              </td>
                              <td className={`px-6 py-4 ${item.printedAt ? 'text-green-500' : 'text-yellow-500'}`}>
                                  {item.endTime ? item.endTime : 'Đang chờ xử lý'}
                              </td>    
                              <td className={`px-6 py-4 ${item.poStatus === 'Pending' ? 'text-yellow-500' : item.status === 'Queued' ? 'text-blue-500' : 'text-green-500'}`}>
                                  {item.poStatus}
                              </td>
                              <td className="px-6 py-4 text-center">
                                  {item.numCopies}
                              </td>
                              <td className="px-6 py-4">
                                  {item.printer.building}
                              </td>
                              <td className="px-6 py-4">
                                  {item.printer.room}
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
      </div>
    </div>
  );
}

let printers =[
  {
    building: "H6",
    room: "101"
  },
  {
    building: "H6",
    room: "102"
  },
  {
    building: "H2",
    room: "103"
  }
]