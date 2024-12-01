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
import { useUserSession } from "@/app/API/getMe";
import LoadingPage from "@/app/ui/LoadingPage";
import MyFooter from "@/app/ui/MyFooter";
import UserFeedbackCard from "@/app/component/UserFeedbackCard";
import LineChart from "@/app/component/LineChart";
import BarChart from "@/app/component/BarChart";

export default function Home() {
  // const { userInfo, loggedIn } = useUserSession();

  // if (!userInfo) {
  //   return <LoadingPage></LoadingPage>
  // }

  // if (userInfo.role === 'STUDENT'){
  //   redirect('/student')
  // }
  return (
    <main className="bg-[hsl(0,7%,92%)]">
        {/* <SPSOHeader header={userInfo as SPSOHeaderProps} /> */}
        {/* <section className="inner_container p-0 container" id="tin_tuc">
        <div className="wrapper container rounded p-4">
            <ul className="list">
              <li>
                <div className="bg">
                      <Image 
                        src={img2}
                        alt="Tutorial"
                        objectFit="contain"
                        className="w-1/2 max-h-[700px]"
                      />           
                    <div className="detail">
                        <h2>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet tenetur accusamus voluptatibus ab laborum cumque, corporis eius porro iusto et molestiae, ex, distinctio quasi dolorem omnis aliquam ipsum pariatur! Fugit!</h2>                      
                    </div>
                </div>
              </li>
              <li>
                <div className="bg">
                    <a href="/vi/tin-tuc/phan-mem-erp-vidipha-su-dung-gd2" className="card-img-top">
                      <Image 
                        src={img3}
                        alt="Tutorial"
                        objectFit="contain"
                        className="w-1/2 max-h-[700px]"
                      />                    </a>
                    <div className="detail">
                          <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut animi voluptates, ex deleniti impedit facere rem at dolore, voluptatum atque, veniam rerum odit consequatur nostrum iure nisi beatae enim quibusdam.</h2>
                    </div>
                </div>
              </li>
              <li>
                <div className="bg">
                    <a href="/vi/tin-tuc/phan-mem-erp-thu-y-uv-su-dung" className="card-img-top">
                      <Image 
                        src={img4}
                        alt="Tutorial"
                        objectFit="contain"
                        className="w-1/2 max-h-[700px]"
                      />                  </a>
                    <div className="detail">
                        <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero corporis quis et obcaecati sed debitis dolores sunt repellendus a! Nostrum magni nihil, adipisci voluptatem mollitia consectetur id eligendi impedit ratione.</h2>
                    </div>
                </div>
              </li>
              <li>
                  <div className="bg">
                        <Image 
                          src={img5}
                          alt="Tutorial"
                          objectFit="contain"
                          className="w-1/2 max-h-[700px]"
                        />                       
                        <div className="detail">
                            <h2>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur minima sit praesentium maiores culpa sunt necessitatibus suscipit enim rem tempore non perferendis, consectetur accusantium. Tenetur non distinctio libero temporibus eveniet.</h2>
                        </div>
                  </div>
              </li>
            </ul>
        </div>
      </section> */}
      <div className="container">
          Số lượng người sử dụng
          <LineChart />
      </div>

      <div className="container">
          Số trang giấy đã in
          <BarChart />
      </div>

      <div className="container">
          Số tiền người dùng đã thanh toán
      </div>

      <div className="container">
        Đánh giá người dùng
        <UserFeedbackCard />
      </div>

      <MyFooter />
    </main>
  );
}