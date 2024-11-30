"use client";
import React, { useEffect, useState } from "react";
import StudentHeader from "@/app/ui/StudentHeader";

export default function page() {
  const [money, setMoney] = useState(0);
  const moneyOfA4 = 1000;
  const moneyOfA3 = 2000;
  const [currType, setCurrType] = useState("null");
  const [totalPages, setTotalPages] = useState(NaN);
  // Step 1: Define state to hold form data
  const [formData, setFormData] = useState({
    totalPages: NaN,
    paperType: "null",
  });
  useEffect(() => {
    if (totalPages > 0) {
      if (currType === "a4") setMoney(totalPages * moneyOfA4);
      if (currType === "a3") setMoney(totalPages * moneyOfA3);
    }
  }, [currType, totalPages]);

  // Step 2: Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "paperType") {
      setCurrType(value);
    }
    if (name === "totalPages") {
      if (value > 0) setTotalPages(value);
    }

    console.log(name, value);
    console.log(money);
  };

  // Step 3: Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    console.log("Form data:", formData);
    // try {
    //   const response = await fetch("/api/submitForm", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(formData),
    //   });

    //   if (response.ok) {
    //     alert("Form submitted successfully!");
    //   } else {
    //     alert("There was an error submitting the form");
    //   }
    // } catch (error) {
    //   console.error("Error submitting form:", error);
    //   alert("Error occurred while submitting the form");
    // }
  };
  return (
    <div className="bg-[#353535] h-[100vh] overflow-hidden">
      <StudentHeader />
      <div className="flex justify-center p-6 h-[100vh]">
        <div className="w-1/2 bg-white h-fit rounded-lg p-4 shadow-lg shadow-slate-200">
          <div>
            <div className="text-lg text-center font-semibold pb-6">
              Buys pages
            </div>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="flex justify-between items-center px-10 gap-10 ">
                <label htmlFor="totalPages" className="w-1/3">
                  Number of pages
                </label>
                <input
                  type="number"
                  name="totalPages"
                  className="flex-auto text-center p-2"
                  onChange={handleInputChange}
                  placeholder="enter a number"
                />
              </div>
              <div className="flex justify-between items-center px-10 gap-10 ">
                <label htmlFor="paperType" className="w-1/3">
                  Type of paper
                </label>
                <select
                  name="paperType"
                  id="paperType"
                  className="flex-auto text-center p-2"
                  onChange={handleInputChange}
                >
                  <option value="null">Choose a paper type</option>
                  <option value="a4">A4</option>
                  <option value="a3">A3</option>
                </select>
              </div>

              <div className="flex justify-between items-center px-10 gap-10">
                <span>Total</span>
                <span>{money} vnd</span>
              </div>
              <button
                type="submit"
                className="bg-[#353535] text-white rounded-lg p-2"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
