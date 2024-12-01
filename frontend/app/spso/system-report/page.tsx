'use client'
import { useEffect, useState } from "react";
import Image from "next/image";
import React from 'react';



import img2 from "@/public/Home/image2.png"
import img3 from "@/public/Home/image3.jpg"
import img4 from "@/public/Home/image4.jpg"
import img5 from "@/public/Home/image5.jpg"

import person1 from "@/public/person1.jpg"
import person2 from "@/public/person2.jpg"
import person3 from "@/public/person3.jpg"
import SPSOHeader, { SPSOHeaderProps } from "@/app/ui/SPSOHeader";
import { getUserInfo } from "@/app/API/userInfo";
import { redirect } from "next/navigation";
import { useUserSessionForSPSO } from "@/app/API/getMe";
import LoadingPage from "@/app/ui/LoadingPage";
import MyFooter from "@/app/ui/MyFooter";
import UserFeedbackCard from "@/app/component/UserFeedbackCard";
import LineChart from "@/app/component/LineChart";
import DoughnutChart from "@/app/component/DoughnutChart";

export default function Home() {

  const { userInfo, loggedIn } = useUserSessionForSPSO();

  // if (!userInfo) {
  //   return <LoadingPage></LoadingPage>
  // }

  // if (userInfo.role === 'STUDENT'){
  //   redirect('/student')
  // }
  const data1 = {
    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3',],
    datasets: [
      {
        label: 'Số lượng giấy đã in',
        data: [65, 59, 80,],
        fill: true    ,
        borderColor: 'rgba(255, 206, 86, 1)',
        backgroundColor: 'rgba(255, 206, 86, 0.1)',
        tension: 0.1,
      },
    ],
  };

  const data4 = {
    labels: [
      'Sinh viên',
      'SPSO',
    ],
    datasets: [{
      label: 'Số lượng người sử dụng',
      data: [300, 50],
      backgroundColor: [
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
      ],
      hoverOffset: 4
    }]
  };

  return (
    <main className="bg-white">
        {/* <SPSOHeader header={userInfo as SPSOHeaderProps} /> */}
      <div className="container py-8 rounded shadow my-8 max-h-[600px] text-center flex items-center flex-col">
          <p>Số lượng người sử dụng dịch vụ</p>
          <DoughnutChart data={data4} width="500px" height="500px"/>
      </div>

      <div className="container py-8 rounded shadow my-8 max-h-[600px] text-center flex items-center flex-col">
          <p>Số lượng trang giấy đã in</p>
          <LineChart data={data1} width="1000px" height="500px"/>
      </div>

      <div className="container py-8 rounded shadow my-8">
        <p className="text-center font-bold text-xl">Đánh giá người dùng</p>
        <div className="flex flex-wrap gap-2 justify-center">
          <div className="w-[23%]">
            <UserFeedbackCard rating={4} imgSrc={person1}/>
          </div>
          <div className="w-[23%]">
            <UserFeedbackCard rating={4} imgSrc={person2}/>
          </div>
          <div className="w-[23%]">
            <UserFeedbackCard rating={4} imgSrc={person3}/>
          </div>
        </div>
      </div>


      <MyFooter />
    </main>
  );
}