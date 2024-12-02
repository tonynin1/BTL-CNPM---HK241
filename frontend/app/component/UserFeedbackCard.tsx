import Image from "next/image";

import Rating from "./Rating";

export default function UserFeedbackCard({ name = 'Người dùng', time, rating = 0, content = '', imgSrc } : { name:string, time: string, rating: number, content:string, imgSrc: any }) {
  return (
    <div className="rounded shadow p-2 mb-4 h-full">
        <Image
            className="rounded w-full p-8"
            alt="avatar" 
            src={imgSrc}
        />
        <div className="flex flex-col">
            <p className="text-lg font-semibold">{name}</p>
            <p className="text-md">"{content}"</p>
            <p className="text-sm text-gray-500">{time}</p>
        </div>
        <Rating currentRate={rating} />
    </div>
  )
}
