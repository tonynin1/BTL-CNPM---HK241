'use client'

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { VscAccount } from "react-icons/vsc";
import { FaAngleDown } from "react-icons/fa6";
import { logout } from "../API/authService";

export interface StudentHeaderProps {
  fname: string;
  role: string;
  customerId: number;
}
export default function StudentHeader(
  {header}: {header: StudentHeaderProps}
) {
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

  const pathName = usePathname();

  const links = [
    {
      name: 'Trang chủ',
      href: '/student',
    },
    {
      name: 'In tài liệu',
      href: '/student/print-documents',
    },
    {
      name: 'Mua trang in',
      href: '/student/buy-prints',
    },
    {
      name: 'Nạp tiền',
      href: '/student/deposit',
    },
    {
      name: "Các đơn chờ in",
      href: '/student/trackingReq'
    },
    {
      name: 'Lịch sử in',
      href: '/student/print-history',
    },
    {
      name: 'Thông tin sinh viên',
      href: '/student/information',
    },
  ]

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
        <h1 className="text-xl text-white sm:text-2xl font-semibold">HCMUT SPSO</h1>
      </div>


      <nav className="flex gap-4 flex-grow justify-center">
        <div className="flex space">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center justify-center px-6 h-12 text-sm sm:text-base no-underline text-gray-700 dark:text-gray-300 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-400 transition duration-300 rounded ${
                pathName === link.href
                  ? "bg-blue-600 text-white"
                  : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </nav>

      <div className="text-white w-[250px] ">
        <div className="student_account relative flex items-center gap-2 items-center transition-all hover:cursor-pointer"
            
        >
          <span className="uppercase">{header.fname}</span>
          <VscAccount className="text-xl"/>
          <FaAngleDown />

          <div className="student_dropdown w-[150px] absolute top-7 left-0 hidden"
          >
            <ul className="text-black rounded bg-white overflow-hidden pl-0 text-center">
              <li className="px-4 py-2 hover:bg-red-600 hover:cursor-pointer transition-all rounded-sm"
                onClick={logout}
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