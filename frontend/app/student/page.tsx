import { useState } from "react";
import Image from "next/image";
import React from 'react';
import Script from 'next/script';
import img1 from "@/public/Home/image1.png"
import img2 from "@/public/Home/image2.png"
import img3 from "@/public/Home/image3.jpg"
import img4 from "@/public/Home/image4.jpg"
import img5 from "@/public/Home/image5.jpg"
import StudentHeader from "@/app/ui/StudentHeader"
import tutorial_img from "@/public/Home/tutorial.jpg"
import new_system_img from "@/public/Home/new-system.jpg"
import error_img from "@/public/Home/error.png"
import buy_pages_img from "@/public/Home/buy-pages.jpg"
import MyFooter from "../ui/MyFooter";

import person1 from "@/public/person1.jpg"
import person2 from "@/public/person2.jpg"
import person3 from "@/public/person3.jpg"

export default function Home() {
  return (
    <div>
      <StudentHeader />
      <div className="container mx-auto">
        <div className="column-1s flex">
          <Image 
            src={tutorial_img}
            alt="Tutorial"
            objectFit="contain"
            className="w-1/2 max-h-[700px]"
          />
          <div className="w-1/2 text-center content-center font-mono">
            <p className="text-5xl mb-8 text-wrap-style-2">Hướng dẫn sử dụng hệ thống</p>
            <p className="text-xl text-justify text-wrap-style-5">
              Hướng dẫn sử dụng dịch vụ in ấn trực tuyến rất đơn giản và dễ thực hiện. Đầu tiên, người dùng truy cập vào trang web hoặc ứng dụng, đăng nhập bằng tài khoản sinh viên. Sau đó, tải lên tệp tài liệu cần in, chọn các tùy chỉnh như khổ giấy, loại in (một mặt hoặc hai mặt), số lượng và chất lượng màu sắc. Cuối cùng, thanh toán trực tuyến qua các phương thức được hỗ trợ. Sau khi hoàn tất, hệ thống sẽ xác nhận đơn hàng và tiến hành in, đảm bảo giao đúng thời hạn với chất lượng cao.
            </p>
            <button className="flex gap-2 items-center mt-8 ml-auto hover:text-blue-500 transition-all p-4">
              <FaLongArrowAltRight />
              Xem thêm
            </button>
          </div>

        </div>
      </section>
      <div className="comment container">
          <h2>Ý kiến khách hàng</h2>
      </div>
      <div className="tcb-product-slider new-important container" data-aos="zoom-in-down">
        <div id="carousel-example-generic" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
                <div className="item active">
                    <div className="row">
                            <div className="col-xs-6 col-sm-3">
                                <div className="tcb-product-item">
                                    <div className="tcb-product-photo">
                                        <Image 
                                          src={person1}
                                          alt="Tutorial"
                                          objectFit="contain"
                                          className="w-1/2 max-h-[700px]"
                                        />  
                                    </div>
                                    <div className="tcb-product-info">
                                        <div className="tcb-product-title">
                                            <a href="">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta saepe voluptate, vel facere expedita cupiditate ex nemo earum a harum dolorum illum necessitatibus rem aliquid aspernatur et sapiente molestiae ab.</a>
                                        </div>
                                        <div className="tcb-product-rating">
Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime, impedit itaque? Commodi voluptatem ab aut? Tempora vel adipisci reiciendis alias harum laborum sed quibusdam odit quas commodi similique, minima mollitia?                                        </div>
                                        <div className="tcb-hline"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-6 col-sm-3">
                                <div className="tcb-product-item">
                                    <div className="tcb-product-photo">
                                        <Image 
                                          src={person2}
                                          alt="Tutorial"
                                          objectFit="contain"
                                          className="w-1/2 max-h-[700px]"
                                        />  

        <div className="columns-3 gap-8">
          <div className="">
            <Image 
              src={buy_pages_img}
              alt="Tutorial"
              objectFit="contain"
              className="h-[325px]"
            />
            <div className="text-center content-center font-mono">
              <p className="text-3xl my-8 h-[72px] leading-[36px] text-wrap-style-2">Làm sao để mua thêm trang in</p>
              <p className="text-base text-justify text-wrap-style-5">
                Hướng dẫn sử dụng dịch vụ in ấn trực tuyến rất đơn giản và dễ thực hiện. Đầu tiên, người dùng truy cập vào trang web hoặc ứng dụng, đăng nhập bằng tài khoản sinh viên. Sau đó, tải lên tệp tài liệu cần in, chọn các tùy chỉnh như khổ giấy, loại in (một mặt hoặc hai mặt), số lượng và chất lượng màu sắc. Cuối cùng, thanh toán trực tuyến qua các phương thức được hỗ trợ. Sau khi hoàn tất, hệ thống sẽ xác nhận đơn hàng và tiến hành in, đảm bảo giao đúng thời hạn với chất lượng cao.
              </p>
              <button className="flex gap-2 items-center mt-8 ml-auto hover:text-blue-500 transition-all p-4">
                <FaLongArrowAltRight />
                Xem thêm
              </button>
            </div>
          </div>

          <div className="">
            <Image 
              src={error_img}
              alt="Tutorial"
              objectFit="contain"
              className="h-[325px]"
            />
            <div className="text-center content-center font-mono">
              <p className="text-3xl my-8 h-[72px] leading-[36px] text-wrap-style">Thông báo lỗi</p>
              <p className="text-base text-justify text-wrap-style-5">
                Hướng dẫn sử dụng dịch vụ in ấn trực tuyến rất đơn giản và dễ thực hiện. Đầu tiên, người dùng truy cập vào trang web hoặc ứng dụng, đăng nhập bằng tài khoản sinh viên. Sau đó, tải lên tệp tài liệu cần in, chọn các tùy chỉnh như khổ giấy, loại in (một mặt hoặc hai mặt), số lượng và chất lượng màu sắc. Cuối cùng, thanh toán trực tuyến qua các phương thức được hỗ trợ. Sau khi hoàn tất, hệ thống sẽ xác nhận đơn hàng và tiến hành in, đảm bảo giao đúng thời hạn với chất lượng cao.
              </p>
              <button className="flex gap-2 items-center mt-8 ml-auto hover:text-blue-500 transition-all p-4">
                <FaLongArrowAltRight />
                Xem thêm
              </button>
            </div>
          </div>

          <div className="">
            <Image 
              src={new_system_img}
              alt="Tutorial"
              objectFit="contain"
              className="h-[325px]"
            />
            <div className="text-center content-center font-mono">
              <p className="text-3xl my-8 h-[72px] leading-[36px] text-wrap-style">Ra mắt hệ thống SPSS</p>
              <p className="text-base text-justify text-wrap-style-5">
                Hướng dẫn sử dụng dịch vụ in ấn trực tuyến rất đơn giản và dễ thực hiện. Đầu tiên, người dùng truy cập vào trang web hoặc ứng dụng, đăng nhập bằng tài khoản sinh viên. Sau đó, tải lên tệp tài liệu cần in, chọn các tùy chỉnh như khổ giấy, loại in (một mặt hoặc hai mặt), số lượng và chất lượng màu sắc. Cuối cùng, thanh toán trực tuyến qua các phương thức được hỗ trợ. Sau khi hoàn tất, hệ thống sẽ xác nhận đơn hàng và tiến hành in, đảm bảo giao đúng thời hạn với chất lượng cao.
              </p>
              <button className="flex gap-2 items-center mt-8 ml-auto hover:text-blue-500 transition-all p-4">
                <FaLongArrowAltRight />
                Xem thêm
              </button>
            </div>
        </div>
      </div>
      <MyFooter />
    </div>
    <section id="contact">
          <div className="contact container">
            <h2 className="text-center">Contact Us</h2>
            <div className="inner-wrap">
              <div className="row">
                <div className="col-lg-6">
                  <form action="#" method="POST">
                    <div className="row">
                      <div className="col-lg-6">
                        <input 
                          type="text" 
                          name="name" 
                          placeholder="Your name" 
                          className="form-control" 
                          required 
                        />
                      </div>
                      <div className="col-lg-6">
                        <input 
                          type="email" 
                          name="email" 
                          placeholder="Your email" 
                          className="form-control" 
                          required 
                        />
                      </div>
                      <div className="col-lg-12">
                        <textarea 
                          name="message" 
                          placeholder="Your message" 
                          className="form-control" 
                          required 
                        ></textarea>
                      </div>
                      <div className="col-lg-12 text-right">
                        <button type="submit">SUBMIT</button>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="col-lg-4 INFORMATION">
                  <h3>INFORMATION</h3>
                  <address>
                    <i className="fas fa-map-marker-alt"></i>
                    <p>
                      Đại học Bách Khoa thành phố Hồ Chí Minh <br />
                      Nhà H6, Bách Khoa cơ sở 2<br />
                      Đông Hoà, Dĩ An, Bình Dương
                    </p>
                  </address>
                  <p>
                    <i className="fas fa-phone-square-alt"></i>
                    +444 (Phone) 123456
                  </p>
                  <p>
                    <i className="fas fa-print"></i>
                    +123 (FAX) 0011223
                  </p>
                  <p>
                    <i className="far fa-envelope"></i>
                    info@bak-onecompany.com
                  </p>
                </div>
              </div>
            </div>
          </div>
          <footer>
            <div className="container-fluid">
              <p></p>
            </div>
            <a href="#" className="back-to-top">
              <i className="fas fa-chevron-up"></i>
            </a>
          </footer>
        </section>
    </main>
  );
}