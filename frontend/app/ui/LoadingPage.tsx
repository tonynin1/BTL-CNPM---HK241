import { AiOutlineLoading } from "react-icons/ai";
import { GoDotFill } from "react-icons/go";

export default function LoadingPage() {
  const dots = [1,2,3,4,5,6]

  return (
    <div className=" text-5xl absolute z-50 top-0 left-0 right-0 bottom-0 bg-black/[0.1] flex justify-center items-center text-white">
        {/* <AiOutlineLoading className="animate-spin ease-in" /> */}
        {
            dots.map((dot, index) => (
                <div className={`animate-bounce`} key={index}
                  style={{animationDelay: `${index*40}ms`}}
                >
                  <GoDotFill />
                </div>
            ))
        }
    </div>
  )
}
