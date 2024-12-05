import Image from "next/image";

import Rating from "./Rating";

export default function UserFeedbackCard({
  name = "Người dùng",
  time,
  rating = 0,
  content = "",
  imgSrc,
}: {
  name: string;
  time: string;
  rating: number;
  content: string;
  imgSrc: any;
}) {
  return (
    <div className="rounded shadow p-2 mb-4 h-full">
      <Image className="rounded w-full p-8" alt="avatar" src={imgSrc} />
      <div className="flex flex-col gap-2 justify-center items-center">
        <p className="text-lg font-semibold text-center m-0">{name}</p>
        <Rating currentRate={rating} />
        {content && (
          <p className="text-sm text-gray-500 self-start mt-2 px-2">{content}</p>
        )}
        <p className="text-sm text-gray-500">{time}</p>
      </div>
    </div>
  );
}
