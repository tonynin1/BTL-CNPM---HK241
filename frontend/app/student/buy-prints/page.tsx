"use client";
import React, { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import api from '@/app/API/axiosInstance';
import StudentHeader, { StudentHeaderProps } from "@/app/ui/StudentHeader";
import { redirect } from "next/navigation";
import { useUserSessionForCustomer } from "@/app/API/getMe";
import LoadingPage from "@/app/ui/LoadingPage";

type Payment = {
    ppoId: string;
    purchaseTime: string; 
    pageNum: number; 
    price: number; 
    paymentMethod: string; 
    ppoStatus: string; 
  };

export default function Page() {
  const { userInfo, loggedIn } = useUserSessionForCustomer();
  const [money, setMoney] = useState(0);
  const moneyOfA4 = 1000;
  const [totalPages, setTotalPages] = useState(NaN);
  const [paymentHistory, setPaymentHistory] = useState<Payment[]>([]);

  const [formData, setFormData] = useState({
    totalPages: NaN,
    paymentMethod: "",
  });

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

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        const cookies = parseCookies();
        const accessToken = cookies.accessToken;

        if (!accessToken) {
          throw new Error("Access token not found.");
        }

        const paymentHistoryResponse = await api.get('payment/history', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            customerId: userInfo?.customerId
          }
        });
        setPaymentHistory(paymentHistoryResponse.data);
        localStorage.setItem('paymentHistory', JSON.stringify(paymentHistoryResponse.data));
      } catch (error) {
        console.error(`Error fetching payment history:`, error);
        alert('Failed to load payment history. Please try again later.');
      }
    };

    if (userInfo?.customerId) {
      fetchPaymentHistory();
    }
  }, [userInfo?.customerId]);

  if (shouldRedirect) {
    if (!loggedIn) redirect("/");
    if (userInfo?.role === "SPSO") redirect("/spso");
    return null; 
  }

  if (!userInfo) {
    return <LoadingPage></LoadingPage>
  }

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

   const handleSubmit = async (e: any) => {
    e.preventDefault(); // Prevent default form submission behavior
    const purchaseTime = Date.now();

    try {
      const cookies = parseCookies();
      const accessToken = cookies.accessToken;

      if (!accessToken) {
        throw new Error("Access token not found.");
      }

      let endpoint = formData.paymentMethod === "Office" ? 'payment/method/office' : 'payment/method/on-site';
      const response = await api.post(endpoint, {
        purchaseTime: purchaseTime,
        customerId: userInfo.customerId,
        ppoStatus: formData.paymentMethod === "Office" ? "Pending" : "Success",
        pageNum: +formData.totalPages,
        price: +money,
        paymentMethod: formData.paymentMethod,
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      });

      if (response.status === 201) {
        const paymentHistoryResponse = await api.get('payment/history', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            customerId: userInfo.customerId,
          }
        });
        setPaymentHistory(paymentHistoryResponse.data);
        alert(formData.paymentMethod === "Office" 
          ? "Please make the payment at the office to complete the purchase!"
          : "Successful purchase!");
      }
    } catch (error) {
      alert("Error: " + error);
    }
  };

  return (
    <div className="bg-[#353535] h-fit min-h-[100vh]">
      <StudentHeader header={userInfo as StudentHeaderProps} />
      <div className="flex justify-center p-6">
        <div className="w-1/2 bg-white h-fit rounded-lg p-4 shadow-lg shadow-slate-200">
          <div>
            <div className="text-lg text-center font-semibold pb-6">
              Mua thêm trang in
            </div>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="flex justify-between items-center px-10 gap-10 ">
                <label htmlFor="totalPages" className="w-1/3">
                  Số lượng trang 
                </label>
                <input
                  type="number"
                  name="totalPages"
                  className="flex-auto text-center p-2"
                  onChange={handleInputChange}
                  placeholder="Nhập số lượng trang"
                />
              </div>
              <div className="flex justify-between items-center px-10 gap-10 ">
                <label htmlFor="paperType" className="w-1/3">
                  Phương thức thanh toán
                </label>
                <select
                  name="paymentMethod"
                  id="paperType"
                  className="flex-auto text-center p-2"
                  onChange={handleInputChange}
                >
                  <option value="Office">Trả tại văn phòng</option>
                  <option value="Onsite">Thanh toán trực tiếp</option>
                </select>
              </div>

              <div className="flex justify-between items-center px-10 gap-10">
                <span>Tổng</span>
                <span>{money} VND</span>
              </div>
              <button
                type="submit"
                className="bg-[#353535] text-white rounded-lg p-2"
              >
                Hoàn tất
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="bg-[#353535] h-fit ">
        <div className="flex justify-center p-10">
          <div className="w-3/4 bg-white shadow-2xl shadow-gray-500 p-4  rounded-xl">
            <table className="table-auto w-full">
              <thead className="text-center">
                <tr>
                  <th className="w-[calc(100%-80%)]">Payment Id</th>
                  <th className="w-[calc(100%-80%)]">Payment date</th>
                  <th className="w-[calc(100%-80%)]">Number of pages</th>
                  <th className="w-[calc(100%-80%)]">Price</th>
                  <th className="w-[calc(100%-80%)]">Payment method</th>
                  <th className="w-[calc(100%-80%)]">Status</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {paymentHistory.map((payment) => ( 
                  <tr key={payment.ppoId}>
                    <td>{payment.ppoId}</td>
                    <td>{new Date(payment.purchaseTime).toLocaleDateString()}</td>
                    <td>{payment.pageNum}</td>
                    <td>{payment.price}</td>
                    <td>{payment.paymentMethod}</td>
                    <td>{payment.ppoStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
