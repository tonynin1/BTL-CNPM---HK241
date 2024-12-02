'use client'

import React, {useEffect, useState} from 'react'
import AdminHeader, { ADMINHeaderProps } from '@/app/ui/AdminHeader'
import MyFooter from '../ui/MyFooter';
import { getAllUsers, getAllPrinters, updatePrinter, deletePrinter, deleteStudent, deleteSPSO } from '../API/admin/admin';
import AddPrinterModal from '../component/AddPrinterModal';
import { useUserSessionForADMIN } from '../API/getMe';
import { redirect } from 'next/navigation';
import LoadingPage from '../ui/LoadingPage';

export default function page() {

  const [allStudents, setAllStudents] = useState([]);
  const [allSpso, setAllSpso] = useState([]);
  const [allPrinters, setAllPrinters] = useState([]);

  const updatePrinterStatus = async (printerId: number, updateData: any) => {

    await updatePrinter(printerId, updateData);
    fetching();
  }

  const fetching = async () => {
    let users = await getAllUsers();

    setAllStudents(users.filter((item: any) => item.role === 'STUDENT'));

    setAllSpso(users.filter((item: any) => item.role === 'SPSO'));

    let printers = await getAllPrinters();

    setAllPrinters(printers);

  }



  const [isShowAddPrinterModal, setIsShowAddPrinterModal] = useState(false);
  
  useEffect(() => {
    fetching();
  }, []);

  const { userInfo, loggedIn } = useUserSessionForADMIN();

  if (!userInfo) {
    return <LoadingPage />
  }

  return (
    <div className='relative'>
      <AdminHeader header={userInfo as ADMINHeaderProps}/>
      {isShowAddPrinterModal && <AddPrinterModal onClick={() => setIsShowAddPrinterModal(false)}/>}

      <div className='container mx-auto relative overflow-x-auto shadow-2xl sm:rounded-lg p-8 my-4' style={{boxShadow: '10px 10px 30px 10px rgba(0, 0, 0, 0.3)'}}>
        <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mb-8'>
          <caption className="caption-top text-center uppercase text-xl">
            danh sách SPSO
          </caption>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
            <th scope="col" className='px-6 py-3 uppercase'>Tên</th>
              <th scope="col" className='px-6 py-3 uppercase'>Username</th>
              <th scope="col" className='px-6 py-3 uppercase'>Số điện thoại</th>
              <th scope="col" className='px-6 py-3 uppercase'>Ngày tham gia</th>
              <th scope="col" className='px-6 py-3 uppercase text-center'>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {allSpso.map((spso:any) => (
              <tr key={spso.userId} className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'>
                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{spso.fname} {spso.lname}</td>
                <td className='px-6 py-4'>{spso.email}</td>
                <td className='px-6 py-4'>{spso.phone}</td>
                <td className='px-6 py-4'>{new Date(spso.createAt).toLocaleDateString('en-GB')}</td>
                <td className='px-6 py-4'>
                  <button onClick={async () => {{
                    const res = await deleteSPSO(spso.userId);
                    if (res) {
                      alert('Xóa SPSO thành công');
                      window.location.reload();
                    }
                    else {
                      alert('SPSO này đang bận xủ lí đơn hàng, không thể xóa');
                    }
                  }}} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>
                    Xóa SPSO
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mb-8'>
          <caption className="caption-top text-center uppercase text-xl">
            danh sách student
          </caption>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope="col" className='px-6 py-3 uppercase'>Tên</th>
              <th scope="col" className='px-6 py-3 uppercase'>Username</th>
              <th scope="col" className='px-6 py-3 uppercase'>Số điện thoại</th>
              <th scope="col" className='px-6 py-3 uppercase'>Ngày tham gia</th>
              <th scope="col" className='px-6 py-3 uppercase text-center'>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {allStudents.map((student : any) => (
              <tr key={student.userId} className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'>
                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{student.fname} {student.lname}</td>
                <td className='px-6 py-4'>{student.email}</td>
                <td className='px-6 py-4'>{student.phone}</td>
                <td className='px-6 py-4'>{new Date(student.createAt).toLocaleDateString('en-GB')}</td>
                <td className='px-6 py-4'>
                  <button onClick={async () => {
                    const res = await deleteStudent(student.userId);

                    if (res.status === 200) {
                      alert('Xóa sinh viên thành công');
                      window.location.reload();
                    }
                    else {
                      alert('Sinh viên này đang bận xủ lí đơn hàng, không thể xóa');
                    }
                  }} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>
                    Xóa sinh viên
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 relative mb-8'>
          <caption className="caption-top text-center uppercase">
            danh sách máy in 
          </caption>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope="col" className='px-6 py-3 uppercase'>MODEL</th>
              <th scope="col" className='px-6 py-3 uppercase'>thương hiệu</th>
              <th scope="col" className='px-6 py-3 uppercase'>mô tả</th>
              <th scope="col" className='px-6 py-3 uppercase'>khoa</th>
              <th scope="col" className='px-6 py-3 uppercase'>tòa</th>
              <th scope="col" className='px-6 py-3 uppercase'>phòng</th>
              <th scope="col" className='px-6 py-3 uppercase'>SPSO ID</th>
              <th scope="col" className='px-6 py-3 uppercase text-center'>trạng thái</th>
              <th scope="col" className='px-6 py-3 uppercase text-center'>hành động</th>
            </tr>
          </thead>
          <tbody >
            {allPrinters.map((printer:any, index) => (
              <tr key={index} className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'>
                  <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{printer.model}</td>
                  <td className='px-6 py-4'>{printer.brand}</td>
                  <td className='px-6 py-4'>{printer.description? printer.description : 'Không có'}</td>
                  <td className='px-6 py-4'>{printer.facility}</td>
                  <td className='px-6 py-4'>{printer.building}</td>
                  <td className='px-6 py-4'>{printer.room}</td>
                  <td className='px-6 py-4 text-center'>{printer.spsomemberId}</td>
                  <td className='px-6 py-4 text-center'>
                      {
                        printer.status === 'VALID' ? (
                            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1.5 rounded dark:bg-green-900 dark:text-green-300">VALID</span>
                          ) : (
                            <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-1.5 rounded dark:bg-red-900 dark:text-red-300">INVALID</span>
                        )
                      }
                  </td>
                  <td className='px-6 py-4 text-center flex justify-center gap-2'>
                      {
                        printer.status === 'VALID' ? (
                            <button 
                              className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded duration-300'
                              onClick={e => {updatePrinterStatus(printer.printerId, {...printer, status: 'INVALID'})}}
                            >
                              Vô hiệu máy in
                            </button>
                          ) : (
                            <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded duration-300'
                              onClick={e => {updatePrinterStatus(printer.printerId, {...printer, status: 'VALID'})}}
                            >
                              Mở máy in
                            </button>
                        )
                      }
                      <button onClick={async () => {
                        // console log this printerId
                        if (confirm(`Bạn có chắc chắn muốn xóa máy in do SPSO có mã số ${printer.spsomemberId} quản lý không?`))
                       { 
                        const res = await deletePrinter(printer.printerId);
                        if (res.status === 200){
                          alert('Xóa máy in thành công');
                          window.location.reload();
                        }
                        else{
                          alert('Máy in này đang bận xủ lí đơn hàng, không thể xóa');
                        }
                      }

                      }}className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>Xóa máy in</button>
                  </td>
              </tr>
              ))}
          </tbody>
          <button 
            className='bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 mt-2 rounded absolute right-0'
            onClick={e => setIsShowAddPrinterModal(true)}
          >
            Thêm máy in
          </button>
        </table>

        
      </div>

      <MyFooter />
    </div>
  )
}
