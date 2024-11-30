'use client';
import { getAllStudents } from "@/app/API/spso_allStudent";
import MyFooter from "@/app/ui/MyFooter";
import SPSOHeader from "@/app/ui/SPSOHeader";
import { useEffect } from "react";
import { parseCookies } from "nookies"; // Thư viện đọc cookie
import { refreshAccessToken } from "@/app/API/authService";
import { useRouter } from "next/navigation"; // Để điều hướng
import { getUserInfo } from "@/app/API/userInfo";

export default function Page() {
  const router = useRouter();

  const students = [
    {
      name: 'Nguyen Van A',
      print_count: 'student1',
      id: '2213982',
    },
    {
      name: 'Le Thi B',
      print_count: 'student2',
      id: '2213983',
    },
    {
      name: 'Tran Van C',
      print_count: 'student3',
      id: '2213984',
    },
    {
      name: 'Pham Thi D',
      print_count: 'student4',
      id: '2213985',
    },
    {
      name: 'Nguyen Van E',
      print_count: 'student5',
      id: '2213986',
    },
    {
      name: 'Hoang Thi F',
      print_count: 'student6',
      id: '2213987',
    },
  ];

  // // Kiểm tra và làm mới accessToken nếu cần
  // useEffect(() => {
  //   const interval = setInterval(async () => {
  //     const cookies = parseCookies();
  //     const accessToken = cookies.accessToken;

  //     if (!accessToken) {
  //       await refreshAccessToken();
  //     }
  //   }, 14 * 60 * 1000); // Kiểm tra mỗi 14 phút

  //   return () => clearInterval(interval);
  // }, []);

  // Kiểm tra trạng thái đăng nhập và chuyển hướng nếu chưa đăng nhập
  // useEffect(() => {
  //   const cookies = parseCookies();
  //   const accessToken = cookies.accessToken;

  //   if (!accessToken) {
  //     router.push('/signin'); // Điều hướng về trang signin
  //   }
  // }, [router]);

  // async function fetchStudents() {
  //   const cookies = parseCookies();
  //   const accessToken = cookies.accessToken;

  //   if (!accessToken) {
  //     console.log("Access token not found in cookies");
  //     return;
  //   }

  //   console.log("Access Token:", accessToken);

  //   try {
  //     const response = await getAllStudents(); // Truyền accessToken vào API nếu cần
  //     console.log("Students Data:", response);
  //   } catch (error) {
  //     console.error("Error fetching students:", error);
  //   }
  // }
  const doSomething = async () => {
    let res = await getUserInfo();
    if (!res){
      // router.push
      router.replace('/signin');
      console.log(router);
      // adjust the router to localhost:8080/singin

    }
    else {
      console.log(res);
    }
  }
  useEffect(() => {
    // fetchStudents();
    doSomething();
  }, []);

  return (
    <div className="h-screen">
      <SPSOHeader />
      <div className="h-full">
        <div className='container mx-auto relative overflow-x-auto shadow-2xl sm:rounded-lg p-8 my-4 ' style={{boxShadow: '10px 10px 30px 10px rgba(0, 0, 0, 0.3)'}}>
          <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th scope="col" className='px-6 py-3'>Tên</th>
                <th scope="col" className='px-6 py-3'>MSSV</th>
                <th scope="col" className='px-6 py-3'>Số lần in</th>
                <th scope="col" className='px-6 py-3'>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'>
                  <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{student.name}</td>
                  <td className='px-6 py-4'>{student.id}</td>
                  <td className='px-6 py-4'>{student.print_count}</td>
                  <td className='px-6 py-4'>
                    <button className='font-medium text-blue-600 dark:text-blue-500 hover:underline'>
                      Xem lịch sử in
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <MyFooter />
    </div>
  );
}
