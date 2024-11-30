'use client'
import React, { useEffect, useState } from "react";
import StudentHeader, { StudentHeaderProps } from "@/app/ui/StudentHeader";
import { getUserInfo } from "@/app/API/userInfo";
import { redirect } from "next/navigation";

export default function page() {
  const [userInfo, setUserInfo] = useState<StudentHeaderProps | null>(null);
  const [loggedIn, setLoggedIn] = useState(true)
  const getUser = async () => {
    let data = await getUserInfo();
    console.log(data);
    if (!data){
      setLoggedIn(false);
    }
    setUserInfo(data)
  }
  useEffect(() => {
    getUser();
  },[])

  if (!loggedIn){
    // router.replace('http://localhost:8080')
    redirect('/')
  }
  if (!userInfo){
    // waiting to render
    return <>Reloading</>
  }
  if (userInfo.role === 'SPSO'){
    // router.replace('http://localhost:8080')
    redirect('/spso')
  }
  return (
    <div className="bg-[#353535] h-[100vh] ">
      <StudentHeader header={userInfo as StudentHeaderProps} />
      <div className="flex justify-center p-6">
        <div
          className="w-3/4 bg-white shadow-2xl shadow-gray
        -500 p-4"
        >
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th>Song</th>
                <th>Artist</th>
                <th>Year</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                <td>Malcolm Lockyer</td>
                <td>1961</td>
              </tr>
              <tr>
                <td>Witchy Woman</td>
                <td>The Eagles</td>
                <td>1972</td>
              </tr>
              <tr>
                <td>Shining Star</td>
                <td>Earth, Wind, and Fire</td>
                <td>1975</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
