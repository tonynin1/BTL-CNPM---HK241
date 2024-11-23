import Image from "next/image";
import Link from "next/link";
import MyHeader from "./ui/MyHeader";
import ImageSlider from "./ui/ImageSlider";

export default function Home() {
  return (
    <div className="">
      <MyHeader />
      <ImageSlider />
      <div className="py-20">
        <div className="container mx-auto font-mono">
          <p className="uppercase text-center text-4xl mb-8">
            dịch vụ
          </p>
          <p className="text-center text-xl">
            Dịch vụ in ấn trực tuyến dành cho sinh viên Bách khoa Hồ Chí Minh là giải pháp tiện lợi, nhanh chóng và tiết kiệm. Với giao diện thân thiện, sinh viên có thể dễ dàng tải lên tài liệu, lựa chọn định dạng, số lượng trang và các tùy chỉnh khác chỉ trong vài bước. Dịch vụ hỗ trợ in ấn đa dạng như tài liệu học tập, luận văn, đồ án và cả tài liệu màu. Đặc biệt, hệ thống giao hàng nhanh chóng, giúp sinh viên nhận tài liệu tận nơi mà không cần mất thời gian chờ đợi. Với mức giá ưu đãi và chất lượng in sắc nét, dịch vụ này là trợ thủ đắc lực cho các bạn sinh viên trong việc học tập và nghiên cứu. 
          </p>
        </div>
      </div>

      <div className="py-20 bg-gray-100">
        <div className="container mx-auto font-mono">
          <p className="uppercase text-center text-4xl mb-8">
            về chúng tôi
          </p>
          <p className="text-center text-xl">
            Nhóm sinh viên thực hiện dự án dịch vụ in ấn trực tuyến là tập hợp những bạn trẻ năng động, sáng tạo và đam mê công nghệ đến từ Đại học Bách khoa Hồ Chí Minh. Với mong muốn mang đến giải pháp in ấn tiện lợi và tối ưu cho cộng đồng sinh viên, nhóm đã kết hợp các kỹ năng lập trình, thiết kế và quản lý để xây dựng nền tảng trực tuyến hiện đại. Tinh thần làm việc nhóm, sự kiên trì và khả năng giải quyết vấn đề là những yếu tố giúp họ vượt qua thách thức. Không chỉ hướng đến việc cải thiện trải nghiệm in ấn, nhóm còn mong muốn tạo ra một môi trường học tập và làm việc hiệu quả, tiết kiệm thời gian và chi phí cho các bạn sinh viên.
          </p>
        </div>
      </div>

      <div className="py-20">
        <div className="container mx-auto font-mono">
          <p className="uppercase text-center text-4xl mb-8">
            Liên hệ
          </p>
          <p className="text-center text-xl">
            Nhóm sinh viên thực hiện dự án dịch vụ in ấn trực tuyến là tập hợp những bạn trẻ năng động, sáng tạo và đam mê công nghệ đến từ Đại học Bách khoa Hồ Chí Minh. Với mong muốn mang đến giải pháp in ấn tiện lợi và tối ưu cho cộng đồng sinh viên, nhóm đã kết hợp các kỹ năng lập trình, thiết kế và quản lý để xây dựng nền tảng trực tuyến hiện đại. Tinh thần làm việc nhóm, sự kiên trì và khả năng giải quyết vấn đề là những yếu tố giúp họ vượt qua thách thức. Không chỉ hướng đến việc cải thiện trải nghiệm in ấn, nhóm còn mong muốn tạo ra một môi trường học tập và làm việc hiệu quả, tiết kiệm thời gian và chi phí cho các bạn sinh viên.
          </p>
        </div>
      </div>
    </div>
  );
}
