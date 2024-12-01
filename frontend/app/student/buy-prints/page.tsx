"use client";
import React, { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import api from '@/app/API/axiosInstance';
import * as request from '../../axios/axios';
import StudentHeader, { StudentHeaderProps } from "@/app/ui/StudentHeader";
import { redirect } from "next/navigation";
import { useUserSessionForCustomer } from "@/app/API/getMe";
import LoadingPage from "@/app/ui/LoadingPage";

export default function Page() {
  const { userInfo, loggedIn } = useUserSessionForCustomer();
  const [money, setMoney] = useState(0);
  const moneyOfA4 = 1000;
  const [totalPages, setTotalPages] = useState(NaN);

  // Step 1: Define state to hold form data
  const [formData, setFormData] = useState({
    totalPages: NaN,
    paymentMethod: "",
  });

  // Handle redirect logic with state
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (!loggedIn) {
      setShouldRedirect(true);
    } else if (userInfo && userInfo.role === "SPSO") {
      setShouldRedirect(true);
    }
  }, [loggedIn, userInfo]);

  useEffect(() => {
    if (totalPages > 0) {
      setMoney(totalPages * moneyOfA4);
    }
  }, [totalPages]);

  // Handle redirect after state update
  if (shouldRedirect) {
    if (!loggedIn) redirect("/");
    if (userInfo?.role === "SPSO") redirect("/spso");
    return null; // Return null while redirecting
  }

  if (!userInfo) {
    return <LoadingPage></LoadingPage>
  }

  // Step 2: Handle input changes
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "totalPages") {
      if (value > 0) setTotalPages(value);
    }

    console.log(name, value);
    console.log(money);
  };

  // Step 3: Handle form submission
   const handleSubmit = async (e: any) => {
    e.preventDefault(); // Prevent default form submission behavior
    let base_api_endpoint = ''
    const purchaseTime = Date.now();
    if(formData.paymentMethod === "Office") {
        base_api_endpoint = 'payment/method/office'
    }

    if(formData.paymentMethod === "Onsite") {
        base_api_endpoint = 'payment/method/on-site'
    }

    try {
        const cookies = parseCookies();
        const accessToken = cookies.accessToken;

        if (!accessToken) {
            throw new Error("Access token not found.");
        }

        const response = await api.post(base_api_endpoint, {
            purchaseTime: purchaseTime,
            customerId: userInfo.customerId,
            ppoStatus: "Pending",
            pageNum: formData.totalPages,
            price: money,
            paymentMethod: formData.paymentMethod,
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        });

        alert(response.data.message)
    } catch (error) {
        alert("Error: " + error);
    }
  };

  return (
    <div className="bg-[#353535] h-[100vh] overflow-hidden">
      <StudentHeader header={userInfo as StudentHeaderProps} />
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
                  Payment method
                </label>
                <select
                  name="paymentMethod"
                  id="paperType"
                  className="flex-auto text-center p-2"
                  onChange={handleInputChange}
                >
                  <option value="null">Payment method</option>
                  <option value="Office">Pay at office</option>
                  <option value="Onsite">Pay on site</option>
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
