'use client'
import { useEffect, useState } from "react";
import React from 'react';

import person1 from "@/public/person1.jpg"
import person2 from "@/public/person2.jpg"
import person3 from "@/public/person3.jpg"
import SPSOHeader, { SPSOHeaderProps } from "@/app/ui/SPSOHeader";
import { redirect } from "next/navigation";
import { useUserSessionForSPSO } from "@/app/API/getMe";
import LoadingPage from "@/app/ui/LoadingPage";
import MyFooter from "@/app/ui/MyFooter";
import UserFeedbackCard from "@/app/component/UserFeedbackCard";
import LineChart from "@/app/component/LineChart";
import DoughnutChart from "@/app/component/DoughnutChart";

export default function Home() {

  const { userInfo, loggedIn } = useUserSessionForSPSO();

  if (!userInfo) {
    return <LoadingPage></LoadingPage>
  }

  if (userInfo.role === 'STUDENT'){
    redirect('/student')
  }
  return (
    <main className="bg-[hsl(0,7%,92%)]">
      <SPSOHeader header={userInfo as SPSOHeaderProps} />
        
      <div className="container mx-auto">
        <p>Thống kê số lượng người sử dụng dịch vụ</p>
      </div>

      <div className="container py-8 rounded shadow my-8">
        <p className="text-center font-bold text-3xl">Đánh giá người dùng</p>
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