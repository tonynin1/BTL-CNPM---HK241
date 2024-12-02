"use client";
import React, { useEffect } from "react";

interface RatingProps {
  currentRate: number;
}

function Rating({ currentRate }: RatingProps) {
  const [starRate, setStarRate] = React.useState<number>(Number(currentRate));
  useEffect(() => {
    setStarRate(Number(currentRate));
  }, [currentRate]);

  return (
    <div className="flex items-center gap-2">
      <div className="flex flex-row items-center w-fit">
        {[...Array(5)].map((_, i) => {
          const ratingValue = i + 1;
          return (
            <label
              key={i}
              className="relative inline-block transform ease-linear duration-300"
            >
              {/* Adjust size of stars */}
              <div className="w-4"></div>
              <input
                type="radio"
                name="rating"
                value={ratingValue}
                className="absolute appearance-none -z-50"
              />
              <svg
                viewBox="0 0 576 512"
                xmlns="http://www.w3.org/2000/svg"
                className={`ease-linear duration-300 
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
      <span className="text-sm text-gray-500">{starRate}</span>
    </div>
  );
}

export default Rating;
