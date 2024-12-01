import { AiOutlineLoading } from "react-icons/ai";

export default function LoadingPage() {
  return (
    <div className=" text-5xl absolute z-50 top-0 left-0 right-0 bottom-0 bg-black/[0.2] flex justify-center items-center text-white">
        <AiOutlineLoading className="animate-spin ease-in" />
    </div>
  )
}
