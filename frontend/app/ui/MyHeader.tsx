'use client'

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

export default function MyHeader() {
  const [time, setTime] = useState(10) 
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

  return (
    <header className="sticky top-0 left-0 w-full flex items-center justify-between p-4 sm:p-6 bg-gray-100 dark:bg-gray-900 shadow-md transition-colors duration-300 z-10">
      <div className="flex items-center gap-2">
        <Image  
          src="/home/bk.png"
          alt="Next.js logo"
          width={60}
          height={40}
          priority
        />
        <h1 className="text-xl text-white sm:text-2xl font-semibold">HCMUT SPSO</h1>
      </div>

      <Link
        href="/signin"
        className="flex items-center justify-center no-underline w-32 h-12 text-sm sm:text-base text-gray-700 dark:text-gray-300 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-400 transition duration-300 rounded"
      >
        Đăng nhập
      </Link>

    </header>
  );
}