'use client'
import SPSOHeader, { SPSOHeaderProps } from "@/app/ui/SPSOHeader";
import MyFooter from "@/app/ui/MyFooter";
import { useUserSessionForSPSO } from "@/app/API/getMe";
import LoadingPage from "@/app/ui/LoadingPage";
import { useEffect, useState } from "react";
import { get } from "http";
import { getAllPrinters, OnOffPrinter } from "@/app/API/spso-managePrinters/spso-managePrinters";

export default function page() {
    const { userInfo, loggedIn } = useUserSessionForSPSO();

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
    
    const [allPrinters, setAllPrinters] = useState<any>(null);
    
    const fetching = async () => {
      if (!userInfo) return;
      try{
        let data = await getAllPrinters(userInfo.sosoMemberId);
        setAllPrinters(data.data);
        console.log(data.data);
      }
      catch(e){
        console.log(e)
      }
    }

    useEffect(() => {
      if (userInfo) {
        fetching();
      }
    }, [userInfo]);

    if (!userInfo || !allPrinters) {
        return <LoadingPage></LoadingPage>
    }
      
  return (
    <div className="h-screen">
      <SPSOHeader header={userInfo as SPSOHeaderProps} />
      <div className='container mx-auto relative overflow-x-auto shadow-2xl sm:rounded-lg p-8 my-4' style={{boxShadow: '10px 10px 30px 10px rgba(0, 0, 0, 0.3)'}}>
        <table className='w-full text-sm text-left rtl:text-right text-gray-900 dark:text-gray-400 mb-8'>
            <thead className='text-md text-gray-700 uppercase dark:text-black'>
                <tr>
                    <th scope="col" className='px-6 py-3'>MODEL</th>
                    <th scope="col" className='px-6 py-3'>THƯƠNG HIỆU</th>
                    <th scope="col" className='px-6 py-3'>MÔ TẢ</th>
                    <th scope="col" className='px-6 py-3'>KHOA</th>
                    <th scope="col" className='px-6 py-3'>TÒA</th>
                    <th scope="col" className='px-6 py-3'>PHÒNG</th>
                    <th scope="col" className='px-6 py-3 text-center'>TRẠNG THÁI</th>
                    <th scope="col" className='px-6 py-3 text-center'>HOẠT ĐỘNG</th>
                </tr>
            </thead>
            <tbody>
                {allPrinters.map((printer : any, index: number) => (
                <tr key={index} className='odd:bg-white even:bg-gray-50 border-b dark:border-gray-700'>
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{printer.model}</td>
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
                              <button onClick={async () => {
                                // if confirmed
                                if (confirm('Are you sure you want to turn off this printer?')) {
                                  
                                  let newStatus =  await OnOffPrinter(printer.printerId);
                                  if (newStatus === 200) {
                                    let newPrinters = [...allPrinters];
                                    newPrinters[index].status = 'INVALID';
                                    setAllPrinters(newPrinters);
                                  }
                                }
                              }} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>INVALID</button>
                            ) : (
                              <button onClick={async () => {
                                if (confirm('Are you sure you want to turn on this printer?')) {
                                  let newStatus =  await OnOffPrinter(printer.printerId);
                                  if (newStatus === 200) {
                                    let newPrinters = [...allPrinters];
                                    newPrinters[index].status = 'VALID';
                                    setAllPrinters(newPrinters);
                                  }

                                }
                              }} className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>VALID</button>
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
