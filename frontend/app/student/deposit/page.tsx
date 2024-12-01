"use client";
import React, { useEffect, useState } from "react";
import StudentHeader, { StudentHeaderProps } from "@/app/ui/StudentHeader";
import { getUserInfo } from "@/app/API/userInfo";
import { redirect } from "next/navigation";
import { useUserSessionForCustomer } from "@/app/API/getMe";
import LoadingPage from "@/app/ui/LoadingPage";

export default function Page() {
  const { userInfo, loggedIn } = useUserSessionForCustomer();
  const [currType, setCurrType] = useState("null");
  const [totalPages, setTotalPages] = useState(NaN);

  // Step 1: Define state to hold form data
  const [formData, setFormData] = useState({
    money: NaN,
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

  // Handle redirect after state update
  if (shouldRedirect) {
    if (!loggedIn) redirect("/");
    if (userInfo?.role === "SPSO") redirect("/spso");
    return null; // Return null while redirecting
  }

  if (!userInfo) {
    return <LoadingPage></LoadingPage>;
  }

  // Step 2: Handle input changes
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Step 3: Handle form submission
  const handleSubmit = async (e: any) => {
    e.preventDefault(); // Prevent default form submission behavior
    console.log("Form data:", formData);
  };

  return (
    <div className="bg-[#353535] h-fit min-h-[100vh]">
      <StudentHeader header={userInfo as StudentHeaderProps} />
      <div className="flex justify-center p-6 h-fit">
        <div className="w-1/2 bg-white h-fit rounded-lg p-4 shadow-gray-500 shadow-2xl">
          <div>
            <div className="text-lg text-center font-semibold pb-6">
              Nạp tiền
            </div>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="flex justify-between items-center px-10 gap-10 ">
                <label htmlFor="money" className="w-1/3">
                  Amount of money
                </label>
                <input
                  type="number"
                  name="money"
                  className="flex-auto text-center p-2"
                  onChange={handleInputChange}
                  placeholder="enter a number"
                />
              </div>
              <button
                type="submit"
                className="bg-[#353535] text-white rounded-lg p-2"
              >
                Confirm
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="bg-[#353535] h-fit ">
        <div className="flex justify-center p-6">
          <div className="w-3/4 bg-white shadow-2xl shadow-gray-500 p-4  rounded-xl">
            <table className="table-auto w-full">
              <thead className="text-center">
                <tr>
                  <th className="w-[calc(100%-80%)]">Transaction Id</th>
                  <th className="w-[calc(100%-80%)]">Transactions day</th>
                  <th className="w-[calc(100%-80%)]">Total pages</th>
                  <th className="w-[calc(100%-80%)]">Total money</th>
                  <th className="w-[calc(100%-80%)]">payment method</th>
                </tr>
              </thead>
              <tbody className="text-center">
                <tr>
                  <td>1</td>
                  <td>12/12/2222</td>
                  <td>2</td>
                  <td>4</td>
                  <td>Malcolm Lockyer</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
