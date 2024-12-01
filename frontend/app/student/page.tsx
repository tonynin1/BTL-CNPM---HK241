"use client";
import Image from "next/image";
import { FaLongArrowAltRight } from "react-icons/fa";
import StudentHeader, { StudentHeaderProps } from "@/app/ui/StudentHeader";
import tutorial_img from "@/public/Home/tutorial.jpg";
import new_system_img from "@/public/Home/new-system.jpg";
import error_img from "@/public/Home/error.png";
import buy_pages_img from "@/public/Home/buy-pages.jpg";
import MyFooter from "../ui/MyFooter";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useUserSessionForCustomer } from "../API/getMe";
import LoadingPage from "../ui/LoadingPage";

export default function page() {
  const currentRate = NaN;

  const { userInfo, loggedIn } = useUserSessionForCustomer();
  const [starRate, setStarRate] = useState<number>(Number(currentRate));
  const [formData, setFormData] = useState({
    starRating: NaN,
    content: undefined,
  });
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      starRating: starRate,
    }));
  }, [starRate]);

  if (!userInfo) {
    return <LoadingPage></LoadingPage>;
  }

  if (userInfo.role === "SPSO") {
    redirect("/spso");
  }
  const handleSubmit = async (e: any) => {
    // e.preventDefault(); // Prevent default form submission behavior
    console.log("Form data:", formData);
  };
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    console.log(name, value);
  };
  return (
    <div>
      <StudentHeader header={userInfo as StudentHeaderProps} />
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
      <section id="contact" className="flex justify-center">
        <div className="w-6/12">
          <h2 className="text-center font-bold text-2xl">Your review</h2>
          <p className="text-center">
            Hãy đóng góp ý kiến của bạn về trải nghiệm sử dụng sản phẩm của
            chúng tôi.
          </p>
          <div className="">
            <div className="">
              <form action={handleSubmit}>
                <div className="">
                  <div className="col-lg-12">
                    <textarea
                      name="content"
                      placeholder="Your review"
                      className="rounded-lg w-full h-32 p-4"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex flex-row items-center w-fit">
                      {[...Array(5)].map((_, i) => {
                        const ratingValue = i + 1;
                        return (
                          <label
                            key={i}
                            className="relative cursor-pointer inline-block transform ease-linear duration-300 hover:scale-120 hover:fill-[#ff9e0b] hover:drop-shadow-[0_0_5px_rgba(255,158,11,0.9)]"
                          >
                            {/* Adjust size of stars */}
                            <div className="w-4"></div>
                            <input
                              type="radio"
                              name="rating"
                              value={ratingValue}
                              onClick={() => setStarRate(ratingValue)}
                              className="absolute appearance-none -z-50"
                            />
                            <svg
                              viewBox="0 0 576 512"
                              xmlns="http://www.w3.org/2000/svg"
                              className={`cursor-pointer ease-linear duration-300 hover:fill-[#ff9e0b] hover:scale-110 hover:drop-shadow-[0_0_5px_rgba(255,158,11,0.9)]
                            ${
                              ratingValue <= starRate
                                ? "fill-[#ff9e0b] drop-shadow-[0_0_5px_rgba(255,158,11,0.9)]"
                                : "fill-[#666]"
                            }`}
                            >
                              <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                            </svg>
                          </label>
                        );
                      })}
                    </div>
                    <span className="text-sm text-gray-500">
                      {starRate ? starRate : ""}
                    </span>
                  </div>
                  <div className=" w-fit ml-auto px-4 py-2 rounded-md text-white bg-blue-400">
                    <button>SUBMIT</button>
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
