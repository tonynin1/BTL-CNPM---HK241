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
    redirect('/spso')
  }

    
  return (
    <div >

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
                      <th scope="col" className='px-6 py-3'>ID đơn in</th>
                      <th scope="col" className='px-6 py-3'>Tên file</th>
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
                                  {item.document.docName}
                              </td>
                              <td className="px-6 py-4">
                                  {new Date(item.startTime).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                              </td>
                              <td className={`px-6 py-4 ${item.printedAt ? 'text-green-500' : 'text-yellow-500'}`}>
                                  {item.endTime ? new Date(item.startTime).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }) : 'Đang chờ xử lý'}
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