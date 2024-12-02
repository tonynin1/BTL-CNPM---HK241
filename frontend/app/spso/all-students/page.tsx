'use client';
import MyFooter from "@/app/ui/MyFooter";
import PrintHistory from "@/app/ui/PrintHistory";
import SPSOHeader, { SPSOHeaderProps } from "@/app/ui/SPSOHeader";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation"; // Để điều hướng
import { useUserSessionForSPSO } from "@/app/API/getMe";
import { getAllStudents } from "@/app/API/spso-allStudents/spso-allStudents";
import LoadingPage from "@/app/ui/LoadingPage";
import PaymentHistory from "@/app/ui/PaymentHistory";

export default function Page() {
  const { userInfo, loggedIn } = useUserSessionForSPSO();
  const [allStudents , setAllStudents] = useState<any>(null);
  const [isShowPrintHis, setIsShowPrintHis] = useState(false);
  const [isShowPagePayment, setIsShowPagePayment] = useState(false);

  const fetching = async () => {
    let data = await getAllStudents();
    setAllStudents(data);
  }
  
  useEffect(() => {
    fetching();
  }, []);
  console.log(allStudents);
  

  if (!userInfo || !allStudents) {
    return <LoadingPage></LoadingPage>
  }


  if (userInfo.role === 'STUDENT'){
    redirect('/student')
  }

  function handlePrintHistory() {
    setIsShowPrintHis(!isShowPrintHis);
  }

  function handlePaymentHistory() {
    setIsShowPagePayment(!isShowPagePayment);
  }

  return (
    <div className="h-screen relative">
      {isShowPrintHis 
      && <PrintHistory onClick={handlePrintHistory}/>
      && <PaymentHistory onClick={handlePaymentHistory}/>}

      <SPSOHeader header = {userInfo as SPSOHeaderProps}/>
      <div className="h-full p-4">
        <div className='container mx-auto relative overflow-x-auto shadow-2xl sm:rounded-lg p-8' style={{boxShadow: '10px 10px 30px 10px rgba(0, 0, 0, 0.3)'}}>
          <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th scope="col" className='px-6 py-3'>Tên</th>
                <th scope="col" className='px-6 py-3'>MSSV</th>
                <th scope="col" className='px-6 py-3'>Lần sử dụng gần nhất</th>
                <th scope="col" className='px-6 py-3'>Lịch sử in</th>
                <th scope="col" className='px-6 py-3'>Lịch sử mua trang</th>
              </tr>
            </thead>
            <tbody>
              {allStudents.map((student : any) => (
                <tr key={student.userId} className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'>
                  <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{student.fname + ' ' + student.lname}</td>
                  <td className='px-6 py-4'>{student.userId}</td>
                  <td className='px-6 py-4'>{student.usageHistory? student.usageHistory : student.createAt}</td>
                  <td className='px-6 py-4'>
                    <button 
                      className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
                      onClick={handlePrintHistory}  
                    >
                      Xem lịch sử in
                    </button>
                  </td>
                  <td className='px-6 py-4'>
                    <button 
                      className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
                      onClick={handlePrintHistory}  
                    >
                      Xem lịch sử mua trang
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <MyFooter />
    </div>
  );
}
