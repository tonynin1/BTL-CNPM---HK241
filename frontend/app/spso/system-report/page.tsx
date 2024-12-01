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

export default function Home() {
  const { userInfo, loggedIn } = useUserSession();

  if (!userInfo) {
    return <LoadingPage></LoadingPage>
  }

  if (userInfo.role === 'STUDENT'){
    redirect('/student')
  }
  return (
    <main className="bg-[hsl(0,7%,92%)]">
        <SPSOHeader header={userInfo as SPSOHeaderProps} />
        <section className="inner_container container" id="tin_tuc">
        <div className="wrapper container">
            <ul className="list">
              {/* <li>
                <div className="bg">
                    <Image 
                      src={img1}
                      alt="Tutorial"
                      objectFit="contain"
                      className="w-1/2 max-h-[700px]"
                    />
                    <div className="detail">
                        <div className="desc">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, tempore asperiores voluptates sunt deleniti quisquam cumque alias voluptatem quaerat, officia impedit nobis culpa laborum, eos magni! Id expedita assumenda perspiciatis!
                        </div>
                    </div>
                </div>
            </li> */}
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
                                            <a href="/vi/tin-tuc/trien-khai-erp-pharmasoft-tai-nha-may-duoc-pham-eu-gmp-long-hau">Công ty EnterSoft triển khai phần mềm ERP-PharmaSoft cho Nhà Máy Dược Phẩm GMP-EU Long Hậu</a>
                                        </div>
                                        <div className="tcb-product-rating">
                                            Cuối năm 2023, Công ty Cổ phần Giải pháp Phần mềm EnterSoft đã ký kết hợp đồng triển khai phần mềm quản trị tổng thể doanh nghiệp ngành dược phẩm ERP-PharmaSoft cho Nhà Máy Dược Phẩm GMP-EU Long Hậu – Chi Nhánh Công Ty Cổ phần Dược phẩm 3/2 (FT-PHARMA).
                                        </div>
                                        <div className="tcb-hline"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-6 col-sm-3">
                                <div className="tcb-product-item">
                                    <div className="tcb-product-photo">
                                        <a href="/vi/tin-tuc/EnterSoft-chia-se-ve-cong-nghe-thong-minh-trong-quan-tri-doanh-nghiep-duoc-pham-tai-tech4life">
                                        <Image 
                                          src={person2}
                                          alt="Tutorial"
                                          objectFit="contain"
                                          className="w-1/2 max-h-[700px]"
                                        />  
                                        </a>
                                    </div>
                                    <div className="tcb-product-info">
                                        <div className="tcb-product-title">
                                            <a href="/vi/tin-tuc/EnterSoft-chia-se-ve-cong-nghe-thong-minh-trong-quan-tri-doanh-nghiep-duoc-pham-tai-tech4life">Lorem ipsum dolor sit amet consectetur adipisicing elit. Non vel recusandae magni quia, ipsam eligendi ad architecto consectetur voluptatibus in libero amet possimus aliquam neque, sapiente voluptates iusto. Natus, alias!</a>
                                        </div>
                                        <div className="tcb-product-rating">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Non vel recusandae magni quia, ipsam eligendi ad architecto consectetur voluptatibus in libero amet possimus aliquam neque, sapiente voluptates iusto. Natus, alias!                                        </div>
                                        <div className="tcb-hline"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-6 col-sm-3">
                                <div className="tcb-product-item">
                                    <div className="tcb-product-photo">
                                        <a href="/vi/tin-tuc/entersoft-gap-go-doanh-nghiep-duoc-pham-tai-trien-lam-pharmedi-vietnam-2023">
                                        <Image 
                                          src={person3}
                                          alt="Tutorial"
                                          objectFit="contain"
                                          className="w-1/2 max-h-[700px]"
                                        />  
                                        </a>
                                    </div>
                                    <div className="tcb-product-info">
                                        <div className="tcb-product-title">
                                            <a href="/vi/tin-tuc/entersoft-gap-go-doanh-nghiep-duoc-pham-tai-trien-lam-pharmedi-vietnam-2023">Lorem ipsum dolor sit amet consectetur adipisicing elit. Non vel recusandae magni quia, ipsam eligendi ad architecto consectetur voluptatibus in libero amet possimus aliquam neque, sapiente voluptates iusto. Natus, alias!</a>
                                        </div>
                                        <div className="tcb-product-rating">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Non vel recusandae magni quia, ipsam eligendi ad architecto consectetur voluptatibus in libero amet possimus aliquam neque, sapiente voluptates iusto. Natus, alias!
                                        </div>
                                        <div className="tcb-hline"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-6 col-sm-3">
                                <div className="tcb-product-item">
                                    <div className="tcb-product-photo">
                                        <a href="/vi/tin-tuc/entersoft-gop-mat-tai-trien-lam-pharmedi-vietnam-2023">
                                        <Image 
                                          src={person1}
                                          alt="Tutorial"
                                          objectFit="contain"
                                          className="w-1/2 max-h-[700px]"
                                        />  
                                        </a>
                                    </div>
                                    <div className="tcb-product-info">
                                        <div className="tcb-product-title">
                                            <a href="/vi/tin-tuc/entersoft-gop-mat-tai-trien-lam-pharmedi-vietnam-2023">Lorem ipsum dolor sit amet consectetur adipisicing elit. Non vel recusandae magni quia, ipsam eligendi ad architecto consectetur voluptatibus in libero amet possimus aliquam neque, sapiente voluptates iusto. Natus, alias!</a>
                                        </div>
                                        <div className="tcb-product-rating">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Non vel recusandae magni quia, ipsam eligendi ad architecto consectetur voluptatibus in libero amet possimus aliquam neque, sapiente voluptates iusto. Natus, alias!                                        </div>
                                        <div className="tcb-hline"></div>
                                    </div>
                                </div>
                            </div>


                    </div>
                </div>
                <div className="item">
                    <div className="row">
                            <div className="col-xs-6 col-sm-3">
                                <div className="tcb-product-item">
                                    <div className="tcb-product-photo">
                                        <a href="/vi/tin-tuc/trien-khai-thanh-cong-phan-mem-erp-pharmasoft-cho-lyna-pharmtech">
                                        <Image 
                                          src={person2}
                                          alt="Tutorial"
                                          objectFit="contain"
                                          className="w-1/2 max-h-[700px]"
                                        />  
                                        </a>
                                    </div>
                                    <div className="tcb-product-info">
                                        <div className="tcb-product-title">
                                            <a href="/vi/tin-tuc/trien-khai-thanh-cong-phan-mem-erp-pharmasoft-cho-lyna-pharmtech">Lorem ipsum dolor sit amet consectetur adipisicing elit. Non vel recusandae magni quia, ipsam eligendi ad architecto consectetur voluptatibus in libero amet possimus aliquam neque, sapiente voluptates iusto. Natus, alias!</a>
                                        </div>
                                        <div className="tcb-product-rating">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Non vel recusandae magni quia, ipsam eligendi ad architecto consectetur voluptatibus in libero amet possimus aliquam neque, sapiente voluptates iusto. Natus, alias!
                                        </div>
                                        <div className="tcb-hline"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-6 col-sm-3">
                                <div className="tcb-product-item">
                                    <div className="tcb-product-photo">
                                        <a href="/vi/tin-tuc/phan-mem-erp-longhiep-su-dung">
                                          <Image 
                                            src={person3}
                                            alt="Tutorial"
                                            objectFit="contain"
                                            className="w-1/2 max-h-[700px]"
                                          />  
                                        </a>
                                    </div>
                                    <div className="tcb-product-info">
                                        <div className="tcb-product-title">
                                            <a href="/vi/tin-tuc/phan-mem-erp-longhiep-su-dung">Lorem ipsum dolor sit amet consectetur adipisicing elit. Non vel recusandae magni quia, ipsam eligendi ad architecto consectetur voluptatibus in libero amet possimus aliquam neque, sapiente voluptates iusto. Natus, alias!</a>
                                        </div>
                                        <div className="tcb-product-rating">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Non vel recusandae magni quia, ipsam eligendi ad architecto consectetur voluptatibus in libero amet possimus aliquam neque, sapiente voluptates iusto. Natus, alias!
                                        </div>
                                        <div className="tcb-hline"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-6 col-sm-3">
                                <div className="tcb-product-item">
                                    <div className="tcb-product-photo">
                                        <a href="/vi/tin-tuc/entersoft-cung-cap-erp-cho-hutech-day">
                                        <Image 
                                          src={person1}
                                          alt="Tutorial"
                                          objectFit="contain"
                                          className="w-1/2 max-h-[700px]"
                                        />  
                                        </a>
                                    </div>
                                    <div className="tcb-product-info">
                                        <div className="tcb-product-title">
                                            <a href="/vi/tin-tuc/entersoft-cung-cap-erp-cho-hutech-day">Lorem ipsum dolor sit amet consectetur adipisicing elit. Non vel recusandae magni quia, ipsam eligendi ad architecto consectetur voluptatibus in libero amet possimus aliquam neque, sapiente voluptates iusto. Natus, alias!</a>
                                        </div>
                                        <div className="tcb-product-rating">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Non vel recusandae magni quia, ipsam eligendi ad architecto consectetur voluptatibus in libero amet possimus aliquam neque, sapiente voluptates iusto. Natus, alias!
                                        </div>
                                        <div className="tcb-hline"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-6 col-sm-3">
                                <div className="tcb-product-item">
                                    <div className="tcb-product-photo">
                                        <a href="/vi/tin-tuc/phan-mem-dms-phat-trien">
                                        <Image 
                                          src={person2}
                                          alt="Tutorial"
                                          objectFit="contain"
                                          className="w-1/2 max-h-[700px]"
                                        />  
                                        </a>
                                    </div>
                                    <div className="tcb-product-info">
                                        <div className="tcb-product-title">
                                            <a href="/vi/tin-tuc/phan-mem-dms-phat-trien">Lorem ipsum dolor sit amet consectetur adipisicing elit. Non vel recusandae magni quia, ipsam eligendi ad architecto consectetur voluptatibus in libero amet possimus aliquam neque, sapiente voluptates iusto. Natus, alias!</a>
                                        </div>
                                        <div className="tcb-product-rating">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Non vel recusandae magni quia, ipsam eligendi ad architecto consectetur voluptatibus in libero amet possimus aliquam neque, sapiente voluptates iusto. Natus, alias!
                                        </div>
                                        <div className="tcb-hline"></div>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
                <div className="item">
                    <div className="row">
                            <div className="col-xs-6 col-sm-3">
                                <div className="tcb-product-item">
                                    <div className="tcb-product-photo">
                                        <a href="/vi/tin-tuc/phan-mem-erp-thu-y-uv-su-dung">
                                        <Image 
                                          src={person3}
                                          alt="Tutorial"
                                          objectFit="contain"
                                          className="w-1/2 max-h-[700px]"
                                        />  
                                        </a>
                                    </div>
                                    <div className="tcb-product-info">
                                        <div className="tcb-product-title">
                                            <a href="/vi/tin-tuc/phan-mem-erp-thu-y-uv-su-dung">Lorem ipsum dolor sit amet consectetur adipisicing elit. Non vel recusandae magni quia, ipsam eligendi ad architecto consectetur voluptatibus in libero amet possimus aliquam neque, sapiente voluptates iusto. Natus, alias!</a>
                                        </div>
                                        <div className="tcb-product-rating">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Non vel recusandae magni quia, ipsam eligendi ad architecto consectetur voluptatibus in libero amet possimus aliquam neque, sapiente voluptates iusto. Natus, alias!
                                        </div>
                                        <div className="tcb-hline"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-6 col-sm-3">
                                <div className="tcb-product-item">
                                    <div className="tcb-product-photo">
                                        <a href="/vi/tin-tuc/phan-mem-erp-vidipha-su-dung-gd2">
                                        <Image 
                                          src={person1}
                                          alt="Tutorial"
                                          objectFit="contain"
                                          className="w-1/2 max-h-[700px]"
                                        />  
                                        </a>
                                    </div>
                                    <div className="tcb-product-info">
                                        <div className="tcb-product-title">
                                            <a href="/vi/tin-tuc/phan-mem-erp-vidipha-su-dung-gd2">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam tempora accusamus dolorum voluptatem voluptate! Quis, in ad! Sequi fugiat inventore eligendi, voluptates, asperiores fuga laboriosam reiciendis velit explicabo qui debitis?
                                            </a>
                                        </div>
                                        <div className="tcb-product-rating">
                                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam tempora accusamus dolorum voluptatem voluptate! Quis, in ad! Sequi fugiat inventore eligendi, voluptates, asperiores fuga laboriosam reiciendis velit explicabo qui debitis?
                                        </div>
                                        <div className="tcb-hline"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-6 col-sm-3">
                                <div className="tcb-product-item">
                                    <div className="tcb-product-photo">
                                        <a href="/vi/tin-tuc/phan-mem-erp-kim-cuong-su-dung">
                                        <Image 
                                          src={person2}
                                          alt="Tutorial"
                                          objectFit="contain"
                                          className="w-1/2 max-h-[700px]"
                                        />  
                                        </a>
                                    </div>
                                    <div className="tcb-product-info">
                                        <div className="tcb-product-title">
                                            <a href="/vi/tin-tuc/phan-mem-erp-kim-cuong-su-dung">Lorem ipsum dolor sit amet consectetur adipisicing elit. Non vel recusandae magni quia, ipsam eligendi ad architecto consectetur voluptatibus in libero amet possimus aliquam neque, sapiente voluptates iusto. Natus, alias!</a>
                                        </div>
                                        <div className="tcb-product-rating">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Non vel recusandae magni quia, ipsam eligendi ad architecto consectetur voluptatibus in libero amet possimus aliquam neque, sapiente voluptates iusto. Natus, alias!
                                        </div>
                                        <div className="tcb-hline"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-6 col-sm-3">
                                <div className="tcb-product-item">
                                    <div className="tcb-product-photo">
                                        <Image 
                                          src={person3}
                                          alt="Tutorial"
                                          objectFit="contain"
                                          className="w-1/2 max-h-[700px]"
                                        />  
                                    </div>
                                    <div className="tcb-product-info">
                                        <div className="tcb-product-title">
                                            <a href="/vi/tin-tuc/phan-mem-erp-rose-su-dung">Lorem ipsum dolor sit amet consectetur adipisicing elit. Non vel recusandae magni quia, ipsam eligendi ad architecto consectetur voluptatibus in libero amet possimus aliquam neque, sapiente voluptates iusto. Natus, alias!</a>
                                        </div>
                                        <div className="tcb-product-rating">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Non vel recusandae magni quia, ipsam eligendi ad architecto consectetur voluptatibus in libero amet possimus aliquam neque, sapiente voluptates iusto. Natus, alias!
                                        </div>
                                        <div className="tcb-hline"></div>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="xem_tatca" data-aos="zoom-in-down">
            <a href="/vi/tin-tuc">
                <span>
                    Xem thêm &gt;&gt;
                </span>
            </a>
        </div>
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