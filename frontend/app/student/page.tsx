'use client'
import Image from "next/image";
import { FaLongArrowAltRight } from "react-icons/fa";
import StudentHeader, { StudentHeaderProps } from "@/app/ui/StudentHeader";
import tutorial_img from "@/public/Home/tutorial.jpg";
import new_system_img from "@/public/Home/new-system.jpg";
import error_img from "@/public/Home/error.png";
import buy_pages_img from "@/public/Home/buy-pages.jpg";
import MyFooter from "../ui/MyFooter";
import { useEffect, useState } from "react";
import { getUserInfo } from "../API/userInfo";
import { redirect } from "next/navigation";
import { useUserSessionForCustomer } from "../API/getMe";
import LoadingPage from "../ui/LoadingPage";

export default function page() {
  const { userInfo, loggedIn } = useUserSessionForCustomer();

  if (!userInfo) {
    return <LoadingPage></LoadingPage>
  }

  if (userInfo.role === 'SPSO'){
    redirect('/spso')
  }
  return (
    <div>
      <StudentHeader header={userInfo as StudentHeaderProps}/>
      <div className="container mx-auto">
        <div className="column-1s flex">
          <Image
            src={tutorial_img}
            alt="Tutorial"
            objectFit="contain"
            className="w-1/2 max-h-[700px]"
          />
          <div className="w-1/2 text-center content-center font-mono">
            <p className="text-5xl mb-8 text-wrap-style-2">
              Hướng dẫn sử dụng hệ thống
            </p>
            <p className="text-xl text-justify text-wrap-style-5">
              Hướng dẫn sử dụng dịch vụ in ấn trực tuyến rất đơn giản và dễ thực
              hiện. Đầu tiên, người dùng truy cập vào trang web hoặc ứng dụng,
              đăng nhập bằng tài khoản sinh viên. Sau đó, tải lên tệp tài liệu
              cần in, chọn các tùy chỉnh như khổ giấy, loại in (một mặt hoặc hai
              mặt), số lượng và chất lượng màu sắc. Cuối cùng, thanh toán trực
              tuyến qua các phương thức được hỗ trợ. Sau khi hoàn tất, hệ thống
              sẽ xác nhận đơn hàng và tiến hành in, đảm bảo giao đúng thời hạn
              với chất lượng cao.
            </p>
            <button className="flex gap-2 items-center mt-8 ml-auto hover:text-blue-500 transition-all p-4">
              <FaLongArrowAltRight />
              Xem thêm
            </button>
          </div>
        </div>

        <div className="columns-3 gap-8">
          <div className="">
            <Image
              src={buy_pages_img}
              alt="Tutorial"
              objectFit="contain"
              className="h-[325px]"
            />
            <div className="text-center content-center font-mono">
              <p className="text-3xl my-8 h-[72px] leading-[36px] text-wrap-style-2">
                Làm sao để mua thêm trang in
              </p>
              <p className="text-base text-justify text-wrap-style-5">
                Hướng dẫn sử dụng dịch vụ in ấn trực tuyến rất đơn giản và dễ
                thực hiện. Đầu tiên, người dùng truy cập vào trang web hoặc ứng
                dụng, đăng nhập bằng tài khoản sinh viên. Sau đó, tải lên tệp
                tài liệu cần in, chọn các tùy chỉnh như khổ giấy, loại in (một
                mặt hoặc hai mặt), số lượng và chất lượng màu sắc. Cuối cùng,
                thanh toán trực tuyến qua các phương thức được hỗ trợ. Sau khi
                hoàn tất, hệ thống sẽ xác nhận đơn hàng và tiến hành in, đảm bảo
                giao đúng thời hạn với chất lượng cao.
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
              <p className="text-3xl my-8 h-[72px] leading-[36px] text-wrap-style">
                Thông báo lỗi
              </p>
              <p className="text-base text-justify text-wrap-style-5">
                Hướng dẫn sử dụng dịch vụ in ấn trực tuyến rất đơn giản và dễ
                thực hiện. Đầu tiên, người dùng truy cập vào trang web hoặc ứng
                dụng, đăng nhập bằng tài khoản sinh viên. Sau đó, tải lên tệp
                tài liệu cần in, chọn các tùy chỉnh như khổ giấy, loại in (một
                mặt hoặc hai mặt), số lượng và chất lượng màu sắc. Cuối cùng,
                thanh toán trực tuyến qua các phương thức được hỗ trợ. Sau khi
                hoàn tất, hệ thống sẽ xác nhận đơn hàng và tiến hành in, đảm bảo
                giao đúng thời hạn với chất lượng cao.
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
              <p className="text-3xl my-8 h-[72px] leading-[36px] text-wrap-style">
                Ra mắt hệ thống SPSS
              </p>
              <p className="text-base text-justify text-wrap-style-5">
                Hướng dẫn sử dụng dịch vụ in ấn trực tuyến rất đơn giản và dễ
                thực hiện. Đầu tiên, người dùng truy cập vào trang web hoặc ứng
                dụng, đăng nhập bằng tài khoản sinh viên. Sau đó, tải lên tệp
                tài liệu cần in, chọn các tùy chỉnh như khổ giấy, loại in (một
                mặt hoặc hai mặt), số lượng và chất lượng màu sắc. Cuối cùng,
                thanh toán trực tuyến qua các phương thức được hỗ trợ. Sau khi
                hoàn tất, hệ thống sẽ xác nhận đơn hàng và tiến hành in, đảm bảo
                giao đúng thời hạn với chất lượng cao.
              </p>
              <button className="flex gap-2 items-center mt-8 ml-auto hover:text-blue-500 transition-all p-4">
                <FaLongArrowAltRight />
                Xem thêm
              </button>
            </div>
          </div>
        </div>
      </div>
      <section id="contact">
        <div className="contact container-fluid">
          <h2 className="text-center">Contact Us</h2>
          <p className="text-center">Hãy đóng góp ý kiến của bạn về trải nghiệm sử dụng sản phẩm của chúng tôi.</p>
          <div className="row">
            <div className="col-lg-6">
              <form action="#" method="POST">
                <div className="row">
                  <div className="col-lg-6">
                    <input type="text" name="name" placeholder="Your name" className="form-control" />
                  </div>
                  <div className="col-lg-6">
                    <input type="email" name="email" placeholder="Your email" className="form-control" />
                  </div>
                  <div className="col-lg-12">
                    <textarea name="message" placeholder="Your message" className="form-control"></textarea>
                  </div>
                  <div className="col-lg-12 text-right">
                    <button type="submit">SUBMIT</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <a href="#" className="back-to-top">
            <i className="fas fa-chevron-up"></i>
          </a>
        </div>
      </section>
      <MyFooter />
    </div>
  );
}
