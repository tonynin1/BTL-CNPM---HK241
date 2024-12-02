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

  const students = [
    {
      name: 'Nguyen Van A',
      print_count: 'student1',
      id: '2213982',
    },
    {
      name: 'Le Thi B',
      print_count: 'student2',
      id: '2213983',
    },
    {
      name: 'Tran Van C',
      print_count: 'student3',
      id: '2213984',
    },
    {
      name: 'Pham Thi D',
      print_count: 'student4',
      id: '2213985',
    },
    {
      name: 'Nguyen Van E',
      print_count: 'student5',
      id: '2213986',
    },
    {
      name: 'Hoang Thi F',
      print_count: 'student6',
      id: '2213987',
    },
  ];
  const { userInfo, loggedIn } = useUserSessionForSPSO();
  const [allStudents , setAllStudents] = useState<any>(null);
  const [isShowPrintHis, setIsShowPrintHis] = useState(false);
  const [customerId, setCustomerId] = useState(0);
  const fetching = async () => {
    let data = await getAllStudents();
    setAllStudents(data);
  }
  
  useEffect(() => {
    fetching();
  }, []);
  

  if (!userInfo || !allStudents) {
    return <LoadingPage></LoadingPage>
  }


  if (userInfo.role === 'STUDENT'){
    redirect('/student')
  }

  function handlePrintHistory(customerId: number) {
    setCustomerId(customerId);
    setIsShowPrintHis(!isShowPrintHis);
  }

  return (
    <div className="h-screen relative">
      {isShowPrintHis 
      && <PrintHistory onClick={handlePrintHistory}/>
      // && <PaymentHistory onClick={handlePaymentHistory}/>
      }
      {isShowPrintHis && <PrintHistory onClick={handlePrintHistory} customerId={customerId}/>}

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
              {allStudents.map((student : any, index : number) => (
                <tr key={index} className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'>
                  <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{student.user.fname + ' ' + student.user.lname}</td>
                  <td className='px-6 py-4'>{student.customer.customerId}</td>
                  <td className='px-6 py-4'>{student.user.usageHistory? student.user.usageHistory : student.createAt}</td>
                  <td className='px-6 py-4'>
                    <button 
                      className='font-medium text-blue-600 dark:text-blue-500 hover:underline w-full text-center'
                      onClick={() => {
                        handlePrintHistory(student.customer.customerId);
                      }}  
                    >
                      Xem lịch sử in
                    </button>
                  </td>
                  <td className='px-6 py-4'>
                    <button 
                      className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
                      onClick={() => {
                        handlePrintHistory(student.customer.customerId);
                      }}  
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
