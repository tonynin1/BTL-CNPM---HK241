"use client";
import React, { useEffect, useState, useRef } from "react";
import StudentHeader, { StudentHeaderProps } from "@/app/ui/StudentHeader";
// import { getUserInfo } from "@/app/API/userInfo";
import { redirect } from "next/navigation";
import { useUserSessionForCustomer } from "@/app/API/getMe";
import LoadingPage from "@/app/ui/LoadingPage";
import { Edit } from "lucide-react";
import { editUser } from "@/app/API/student-information/student-information";

export default function Page() {
  const { userInfo, loggedIn } = useUserSessionForCustomer();

  // Step 1: Define state to hold form data

  // Handle redirect logic with state
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [editFamilyName, setEditFamilyName] = useState(false);
  const [editFName, setEditFName] = useState(false);
  const inputLNameRef = useRef<HTMLInputElement>(null);
  const inputFNameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!loggedIn) {
      setShouldRedirect(true);
    } else if (userInfo && userInfo.role === "SPSO") {
      setShouldRedirect(true);
    }
    setFormData({
      fname: userInfo?.fname || "",
      lname: userInfo?.lname || "",
    });
  }, [loggedIn, userInfo]);
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
  });
  
  // Handle redirect after state update
  if (shouldRedirect) {
    if (!loggedIn) redirect("/");
    if (userInfo?.role === "SPSO") redirect("/spso");
    return null; // Return null while redirecting
  }

  if (!userInfo) {
    return <LoadingPage></LoadingPage>;
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault(); // Prevent default form submission behavior
    console.log("Form data:", formData);
    const res = await editUser(formData.fname, formData.lname, "");

    if (res){
      setEditFamilyName(false);
      setEditFName(false);
    }
  };
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // console.log(name, value);
  };

  return (
    <div className="bg-[#353535] h-[100vh] overflow-hidden">
      <StudentHeader header={userInfo as StudentHeaderProps} />
      <div className="flex justify-center p-6 h-[100vh]">
        <div className="w-1/2 bg-white h-fit rounded-lg p-4 shadow-lg shadow-slate-200">
          <div className="text-lg text-center font-semibold pb-6">Thông tin chi tiết</div>
          <div>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="flex justify-between items-center px-10 gap-10 ">
                <label htmlFor="lname" className="w-1/3">
                  Họ
                </label>
                <input
                  type="text"
                  name="lname"
                  className="flex-auto text-center p-2"
                  onChange={handleInputChange}
                  placeholder="enter your family name"
                  // {!EditFamilyName  && value={userInfo.lname}}
                  defaultValue={userInfo.lname}
                  disabled={!editFamilyName}
                  autoFocus={editFamilyName}
                  ref={inputLNameRef}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-edit-3 h-4 w-4 cursor-pointer"
                  onClick={() => {
                    setEditFamilyName(true);
                    if (inputLNameRef.current) {
                      inputLNameRef.current.focus();
                    }
                  }}
                >
                  <path d="M12 20h9"></path>
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                </svg>
              </div>
              <div className="flex justify-between items-center px-10 gap-10 ">
                <label htmlFor="fname" className="w-1/3">
                  Tên
                </label>
                <input
                  type="text"
                  name="fname"
                  className="flex-auto text-center p-2 "
                  onChange={handleInputChange}
                  placeholder="enter your family name"
                  defaultValue={userInfo.fname}
                  disabled={!editFName}
                  autoFocus={editFName}
                  ref={inputFNameRef}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-edit-3 h-4 w-4 cursor-pointer"
                  onClick={() => {
                    setEditFName(true);
                    if (inputFNameRef.current) {
                      inputFNameRef.current.focus();
                    }
                  }}
                >
                  <path d="M12 20h9"></path>
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                </svg>
              </div>
              <div className="flex justify-between items-center px-10 gap-10 ">
                <span>Mã số sinh viên</span>
                <span>{userInfo.customerId} </span>
              </div>
              <div className="flex justify-between items-center px-10 gap-10 ">
                <span>Số dư tài khoản</span>
                <span>{userInfo.accBalance} VND</span>
              </div>
              <div className="flex justify-between items-center px-10 gap-10 ">
                <span>Số dư trang</span>
                <span>{userInfo?.remainPages} Trang</span>
              </div>

              {(editFName || editFamilyName) && (
                <button
                  type="submit"
                  className="bg-[#353535] text-white rounded-lg p-2"
                  onClick={async () => {
                    
                  }}
                >
                  Change information
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
