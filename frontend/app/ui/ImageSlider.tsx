"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { StaticImageData } from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import image1 from "@/public/Home/image4.jpg"
import image2 from "@/public/Home/image5.jpg"
import image3 from "@/public/Home/image6.jpg"

interface ImageData {
    src: StaticImageData;
    description?: string;
}

const images: ImageData[] = [
    {
      src: image1,
      description: "Hệ thống hiệu suất cao dành cho in ấn tài liệu, bài tập lớn, báo cáo khoa học, bài giảng và nhiều hơn thế nữa !!",
    },
    {
      src: image2,
      description: "Hệ thống in ấn dành cho sinh viên Bách Khoa Hồ Chí Minh cung cấp dịch vụ tiện lợi, hiện đại, hỗ trợ in ấn tài liệu học tập với chi phí hợp lý và quy trình nhanh chóng."
    },
    {
      src: image3,
      description: "Hệ thống in ấn dành cho sinh viên Bách Khoa Hồ Chí Minh cung cấp dịch vụ tiện lợi, hiện đại, hỗ trợ in ấn tài liệu học tập với chi phí hợp lý và quy trình nhanh chóng."
    },
  ];

export default function ImageSlider(): JSX.Element {
    // State to keep track of the current image index
    const [currentIndex, setCurrentIndex] = useState<number>(0);
  
    // State to determine if the image is being hovered over
    const [isHovered, setIsHovered] = useState<boolean>(false);
  
    // Function to show the previous slide
    const prevSlide = (): void => {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + images.length) % images.length
      );
    };
  
    // Function to show the next slide
    const nextSlide = (): void => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };
  
    // useEffect hook to handle automatic slide transition
    useEffect(() => {
      // Start interval for automatic slide change if not hovered
      if (!isHovered) {
        const interval = setInterval(() => {
          nextSlide();
        }, 3000);
  
        // Cleanup the interval on component unmount
        return () => {
          clearInterval(interval);
        };
      }
    }, [isHovered]);
  
    // Handle mouse over event
    const handleMouseOver = (): void => {
      setIsHovered(true);
    };
  
    // Handle mouse leave event
    const handleMouseLeave = (): void => {
      setIsHovered(false);
    };
  
    return (
      <div className="relative w-full mx-auto">
        <div
          className="relative h-[720px] group"
          onMouseOver={handleMouseOver}
          onMouseLeave={handleMouseLeave}
        >
          <Image
            src={images[currentIndex].src}
            alt={`Slider Image ${currentIndex + 1}`}
            fill
            className="transition-all duration-500 linear cursor-pointer"
            style={{objectFit: 'cover'}}
          />
          <div className={`absolute
                           ${currentIndex === 0? 'top-56 text-xl left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center': '' }
                           ${currentIndex === 1? 'top-1/2 text-xl left-48 transform text-center text-white': '' }
                           ${currentIndex === 2? 'top-1/2 text-xl right-48 transform text-center text-black': '' }
                `}
                style={currentIndex === 0? {left: '50.5%'} : {}}
          >
            <p className="w-[600px]">
              {images[currentIndex].description}
            </p>
            <button 
              className={`uppercase flex items-center justify-center m-auto mt-4 w-32 h-12 text-sm sm:text-base ${currentIndex === 1? 'border boder-slate-950': currentIndex === 2? 'border border-gray-900' : ''} text-${currentIndex === 1? 'white': 'black'} hover:bg-blue-600 hover:text-white dark:hover:bg-blue-400 transition duration-300 rounded`}
            >
              In ngay
            </button>
          </div>
        </div>
        {/* <button
          className="absolute left-0 top-1/2 transform h-[459px] rounded-xl hover:bg-[#1a222f] mx-1 -mt-[10px] -translate-y-1/2 bg-[#111927] text-white p-2 group"
          onClick={prevSlide}
        >
            <ChevronLeft className="text-gray-400 group-hover:text-white" />
        </button>
        <button
          className="absolute right-0 top-1/2 transform h-[459px] rounded-xl hover:bg-[#1a222f] mx-1 -mt-[10px] -translate-y-1/2 bg-[#111927] text-white p-2 group"
          onClick={nextSlide}
        >
            <ChevronRight className="text-gray-400 group-hover:text-white" />
        </button> */}
        <div className="flex justify-center mt-4">
          {images.map((_, index) => (
            <div
              key={index}
              className={`h-1 w-10 mx-1 ${
                index === currentIndex
                  ? "bg-[#beff46] rounded-xl"
                  : "bg-gray-300 rounded-xl"
              } transition-all duration-500 ease-in-out`}
            ></div>
          ))}
        </div>
      </div>
    );
}