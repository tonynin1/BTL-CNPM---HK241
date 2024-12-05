'use client'

import Image from "next/image";
import { useEffect, useState } from "react";
import { VscAccount } from "react-icons/vsc";
import { FaAngleDown } from "react-icons/fa6";
import '@/app/globals.css'

export interface ADMINHeaderProps {
  fname: string;
  role: string;
}
export default function StudentHeader({header}: {header: ADMINHeaderProps}) {
  const [time, setTime] = useState(900) 
  const [minute, setMinute] = useState(Math.floor(time/60))
  const [second, setSecond] = useState(Number(time%60))

  useEffect(() => {
    if(time < 0) return
    const timer = setTimeout(() => {
      setTime(prev => prev-1)
      setMinute(Math.floor(time/60))
      setSecond(time%60)
    }, 1000)

    return () => clearTimeout(timer)
  })

  const handleLogout = () => {
    // localStorage.removeItem('token')
    window.location.href = '/'
  }

  return (
    <header className="sticky top-0 left-0 w-full flex items-center justify-between p-4 sm:p-6 bg-gray-100 dark:bg-gray-900 shadow-md transition-colors duration-300 z-10">
      <div className="flex items-center gap-2">
        <Image  
          src="/home/bk.png"
          alt="Next.js logo"
          width={60}
          height={60}
          priority
        />
        <h1 className="text-xl text-white sm:text-2xl font-semibold">HCMUT SSPS</h1>
      </div>

      <div className="text-white w-[250px] ">
        <div className="student_account relative flex items-center gap-2 items-center transition-all hover:cursor-pointer"
            
        >
          <span className="uppercase">q.vinh</span>
          <VscAccount className="text-xl"/>
          <FaAngleDown />

          <div className="student_dropdown w-[150px] absolute top-7 left-0 hidden"
          >
            <ul className="text-black rounded bg-white overflow-hidden shadow-xl">
              <li className="px-4 py-2 hover:bg-red-600 hover:cursor-pointer transition-all rounded-sm text-center"
                onClick={handleLogout}
              >
                Đăng xuất
              </li>
            </ul>
          </div>
        </div>
        
        <p>
          {time >= 0? `Thời gian đăng nhập còn: ${minute? minute + 'm' : ''} ${second?  second + 's' : ''}` : 'Vui lòng đăng nhập lại'}
        </p>

      </div>
    </header>
  );
}