import React from 'react'
import AdminHeader from '@/app/ui/AdminHeader'

export default function page() {
  const spsos = [
    {
      name: 'SPSO 1',
      username: 'spso1',
    },
    {
      name: 'SPSO 2',
      username: 'spso2',
    },
    {
      name: 'SPSO 3',
      username: 'spso3',
    },
    {
      name: 'SPSO 4',
      username: 'spso4',
    },
    {
      name: 'SPSO 5',
      username: 'spso5',
    },
    {
      name: 'SPSO 6',
      username: 'spso6',
    },
  ];

  
  const students = [
    {
      name: 'Nguyen Van A',
      username: 'student1',
      id: '2213982',
    },
    {
      name: 'Le Thi B',
      username: 'student2',
      id: '2213983',
    },
    {
      name: 'Tran Van C',
      username: 'student3',
      id: '2213984',
    },
    {
      name: 'Pham Thi D',
      username: 'student4',
      id: '2213985',
    },
    {
      name: 'Nguyen Van E',
      username: 'student5',
      id: '2213986',
    },
    {
      name: 'Hoang Thi F',
      username: 'student6',
      id: '2213987',
    },
  ];
  
  
  return (
    <div>
      <AdminHeader />

      <div className='container mx-auto relative overflow-x-auto shadow-md sm:rounded-lg p-8 mt-4'>
        <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mb-8'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope="col" className='px-6 py-3'>Tên</th>
              <th scope="col" className='px-6 py-3'>Username</th>
              <th scope="col" className='px-6 py-3'>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {spsos.map((spso) => (
              <tr key={spso.username} className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'>
                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{spso.name}</td>
                <td className='px-6 py-4'>{spso.username}</td>
                <td className='px-6 py-4'>
                  <button className='font-medium text-blue-600 dark:text-blue-500 hover:underline'>
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope="col" className='px-6 py-3'>Tên</th>
              <th scope="col" className='px-6 py-3'>Username</th>
              <th scope="col" className='px-6 py-3'>MSSV</th>
              <th scope="col" className='px-6 py-3'>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.username} className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'>
                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{student.name}</td>
                <td className='px-6 py-4'>{student.username}</td>
                <td className='px-6 py-4'>{student.id}</td>
                <td className='px-6 py-4'>
                  <button className='font-medium text-blue-600 dark:text-blue-500 hover:underline'>
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        
      </div>
    </div>
  )
}
