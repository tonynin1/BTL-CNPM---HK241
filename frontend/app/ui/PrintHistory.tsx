'use client'

import { useEffect, useState } from "react";
import LoadingPage from "./LoadingPage";
import { getPrintOrdersByCustomerId } from "../API/student-printHistory/student-printHistory";

export default function PrintHistory( {printOrder, customerId, onClick} : {
    printOrder?: object,
    onClick?: any,
    customerId?: number
} ) {
    const [printOrders, setPrintOrders] = useState<any[]>([]);
    const fetching = async () => {
        if (!customerId) return;
        try {
            let data = await getPrintOrdersByCustomerId(customerId);
            console.log(data.data);
            setPrintOrders(data.data);
            
        } catch (error) {
            console.log("Error fetching print orders by customer id:", error);
            
        }
    }
      
    useEffect(() => {
        fetching();
    }, [customerId]);
    if (!Array.isArray(printOrders)) {
        return <LoadingPage></LoadingPage>
    }
  return (
    <div 
        className={`absolute top-0 left-0 right-0 bottom-0 flex justify-center z-50 bg-black/[0.2] print_history_modal`}
        onClick={onClick}
    >
        <div className="relative p-4 shadow-2xl sm:rounded-lg max-h-[700px] mt-8 bg-white dark:bg-gray-800">
            <div 
                className=" overflow-y-scroll max-h-[600px]"
                onClick={(e) => e.stopPropagation()}
            >
                <table className='w-full table-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                    <caption className="caption-top text-center uppercase">
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
                        </tr>
                    </thead>
                    <tbody>
                        {printOrders.map((item, index) => (
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
                                <td className="px-6 py-4">
                                    {item.endTime ? item.endTime : 'Đang chờ xử lý'}
                                </td>    
                                <td className="px-6 py-4">
                                    {item.poStatus}
                                </td>
                                <td className="px-6 py-4">
                                    {item.numCopies}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button className="absolute right-6 mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={onClick}>Close</button>
        </div>
    </div>
  )
}
