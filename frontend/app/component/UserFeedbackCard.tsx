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
      <div className="flex flex-col gap-4 justify-center items-center">
        <p className="text-lg font-semibold text-center">{name}</p>
        {content && (
          <p className="text-sm text-gray-500 self-start">{content}</p>
        )}
        <p className="text-sm text-gray-500">{time}</p>
        <Rating currentRate={rating} />
      </div>
    </div>
  );
}
