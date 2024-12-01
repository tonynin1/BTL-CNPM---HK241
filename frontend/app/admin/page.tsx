import React from 'react'
import AdminHeader from '@/app/ui/AdminHeader'
import MyFooter from '../ui/MyFooter';

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
  
  const printers = [
    {
      model: "LaserJet Pro M404dn",
      brand: "HP",
      description: "Monochrome Laser Printer",
      facility: "Main Office",
      building: "Building A",
      room: "Room 101",
      status: 'INVALID'
    },
    {
      model: "PIXMA G7020",
      brand: "Canon",
      description: "Color Inkjet All-in-One",
      facility: "Admin Office",
      building: "Building B",
      room: "Room 202",
      status: 'INVALID'
    },
    {
      model: "EcoTank ET-2760",
      brand: "Epson",
      description: "Wireless Color All-in-One",
      facility: "IT Department",
      building: "Building C",
      room: "Room 303",
      status: 'VALID'
    },
    {
      model: "VersaLink C405",
      brand: "Xerox",
      description: "Color Multifunction Printer",
      facility: "Marketing",
      building: "Building D",
      room: "Room 404",
      status: 'INVALID'
    },
    {
      model: "DeskJet 3755",
      brand: "HP",
      description: "Compact Inkjet Printer",
      facility: "HR Department",
      building: "Building A",
      room: "Room 105",
      status: 'VALID'
    },
    {
      model: "DCP-L2550DW",
      brand: "Brother",
      description: "Monochrome Laser All-in-One",
      facility: "Finance Department",
      building: "Building B",
      room: "Room 206",
      status: 'INVALID'
    },
    {
      model: "OfficeJet Pro 9015",
      brand: "HP",
      description: "Smart Wireless All-in-One",
      facility: "Sales Office",
      building: "Building E",
      room: "Room 502",
      status: 'INVALID'
    },
    {
      model: "WorkForce Pro WF-3820",
      brand: "Epson",
      description: "High-Speed Wireless Printer",
      facility: "Production Floor",
      building: "Building F",
      room: "Room 601",
      status: 'INVALID'
    },
    {
      model: "ImageCLASS MF743Cdw",
      brand: "Canon",
      description: "Color Multifunction Laser",
      facility: "Design Studio",
      building: "Building G",
      room: "Room 702",
      status: 'INVALID'
    },
    {
      model: "Phaser 6510",
      brand: "Xerox",
      description: "Color Laser Printer",
      facility: "Executive Suite",
      building: "Building H",
      room: "Room 801",
      status: 'INVALID'
    }
  ];
  
  
  return (
    <div>
      <AdminHeader />

      <div className='container mx-auto relative overflow-x-auto shadow-2xl sm:rounded-lg p-8 my-4' style={{boxShadow: '10px 10px 30px 10px rgba(0, 0, 0, 0.3)'}}>
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
                  <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mb-8'>
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
                  <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>
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
              <th scope="col" className='px-6 py-3'>MODEL</th>
              <th scope="col" className='px-6 py-3'>BRAND</th>
              <th scope="col" className='px-6 py-3'>DESCRIPTION</th>
              <th scope="col" className='px-6 py-3'>FACILITY</th>
              <th scope="col" className='px-6 py-3'>BUILDING</th>
              <th scope="col" className='px-6 py-3'>ROOM</th>
              <th scope="col" className='px-6 py-3 text-center'>STATUS</th>
              <th scope="col" className='px-6 py-3 text-center'>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {printers.map((printer, index) => (
              <tr key={index} className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'>
                  <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{printer.model}</td>
                  <td className='px-6 py-4'>{printer.brand}</td>
                  <td className='px-6 py-4'>{printer.description}</td>
                  <td className='px-6 py-4'>{printer.facility}</td>
                  <td className='px-6 py-4'>{printer.building}</td>
                  <td className='px-6 py-4'>{printer.room}</td>
                  <td className='px-6 py-4 text-center'>
                      {
                        printer.status === 'VALID' ? (
                            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1.5 rounded dark:bg-green-900 dark:text-green-300">VALID</span>
                          ) : (
                            <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-1.5 rounded dark:bg-red-900 dark:text-red-300">INVALID</span>
                        )
                      }
                  </td>
                  <td className='px-6 py-4 text-center'>
                      {
                        printer.status === 'VALID' ? (
                            <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>INVALID</button>
                          ) : (
                            <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>VALID</button>
                        )
                      }
                  </td>
              </tr>
              ))}
          </tbody>
        </table>

        
      </div>

      <MyFooter />
    </div>
  )
}
