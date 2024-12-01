import Image from "next/image";

import Rating from "./Rating";

export default function UserFeedbackCard({ rating = 0, imgSrc } : { rating: number, imgSrc: any }) {
  return (
    <div className="rounded shadow p-2 mb-4">
        <Image
            className="rounded w-full"
            alt="avatar" 
            src={imgSrc}
        />
        <div>
            <p className="text-lg font-semibold">Nguyễn Văn A</p>
            <p className="text-md ">"Dịch vụ in ấn tại đây rất chất lượng, từ độ sắc nét của bản in đến tốc độ hoàn thành. Nhân viên nhiệt tình, hỗ trợ nhanh chóng, giá cả hợp lý. Rất hài lòng và sẽ tiếp tục sử dụng dịch vụ!"</p>
            <p className="text-sm text-gray-500">2022-2023</p>
        </div>
        <Rating currentRate={rating} />
    </div>
  )
}
