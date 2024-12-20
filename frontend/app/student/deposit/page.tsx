"use client";
import React, { useEffect, useState } from "react";
import StudentHeader, { StudentHeaderProps } from "@/app/ui/StudentHeader";
import api from "@/app/API/axiosInstance";
import { redirect } from "next/navigation";
import { useUserSessionForCustomer } from "@/app/API/getMe";
import LoadingPage from "@/app/ui/LoadingPage";
import { parseCookies } from "nookies";

type Deposit = {
  depositId: string;
  depositTime: string;
  amount: number;
  depositStatus: string;
};

export default function Page() {
  const { userInfo, loggedIn } = useUserSessionForCustomer();
  const [formData, setFormData] = useState({
    money: 0,
  });
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [depositHistory, setDepositHistory] = useState<Deposit[]>([]);
  const [accountBalance, setAccountBalance] = useState<number | null>(null);
  useEffect(() => {
    if (!loggedIn) {
      setShouldRedirect(true);
    } else if (userInfo && userInfo.role === "SPSO") {
      setShouldRedirect(true);
    }
  }, [loggedIn, userInfo]);

  useEffect(() => {
    if (userInfo) {
      // alert("User info: " + JSON.stringify(userInfo));
      const fetchAccountBalance = async () => {
        try {
          const cookies = parseCookies();
          const accessToken = cookies.accessToken;

          if (!accessToken) {
            throw new Error("Access token not found.");
          }
          setAccountBalance(userInfo.accBalance);
        } catch (error) {
          console.error(`Error fetching account balance: ${error}`);
        }
      };

      fetchAccountBalance();
    }
  }, [userInfo]);

  useEffect(() => {
    const fetchDepositHistory = async () => {
      try {
        const cookies = parseCookies();
        const accessToken = cookies.accessToken;

        if (!accessToken) {
          throw new Error("Access token not found.");
        }

        const depositHistoryResponse = await api.get(
          "onsite-account/deposit/history",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            params: {
              customerId: userInfo ? +userInfo.customerId : undefined,
            },
          }
        );
        setDepositHistory(depositHistoryResponse.data);
        localStorage.setItem(
          "depositHistory",
          JSON.stringify(depositHistoryResponse.data)
        );
      } catch (error) {
        console.error(`Error fetching deposit history: ${error}`);
      }
    };

    if (userInfo) {
      fetchDepositHistory();
    } else {
      const savedHistory = localStorage.getItem("depositHistory");
      if (savedHistory) {
        setDepositHistory(JSON.parse(savedHistory));
      }
    }
  }, [userInfo]);

  if (shouldRedirect) {
    if (!loggedIn) redirect("/");
    if (userInfo?.role === "SPSO") redirect("/spso");
    return null;
  }

  if (!userInfo) {
    return <LoadingPage></LoadingPage>;
  }

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault(); // Prevent default form submission behavior
    const depositTime = Date.now();

    try {
      const cookies = parseCookies();
      const accessToken = cookies.accessToken;

      if (!accessToken) {
        throw new Error("Access token not found.");
      }

      const response = await api.post(
        "onsite-account/deposit",
        {
          amount: +formData.money,
          depositTime: depositTime,
          customerId: userInfo.customerId,
          depositStatus: "Success",
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 201) {
        const depositHistoryResponse = await api.get(
          "onsite-account/deposit/history",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            params: {
              customerId: userInfo.customerId,
            },
          }
        );
        setDepositHistory(depositHistoryResponse.data);
        alert("Deposit successful!");
      }
    } catch (error) {
      alert(`Error: ${error}`);
    }
  };

  return (
    <div className="bg-[#353535] h-fit min-h-[100vh]">
      <StudentHeader header={userInfo as StudentHeaderProps} />
      <div className="flex justify-between p-6">
        <div className="flex-grow"></div>
        <div className="text-white">
          Số dư:{" "}
          {accountBalance !== null ? `${accountBalance} VND` : "Loading..."}
        </div>
      </div>
      <div className="flex justify-center p-6 h-fit">
        <div className="w-1/2 bg-white h-fit rounded-lg p-4 shadow-gray-500 shadow-2xl">
          <div>
            <div className="text-lg text-center font-semibold pb-6">
              Nạp tiền
            </div>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="flex justify-between items-center px-10 gap-10 ">
                <label htmlFor="money" className="w-1/3">
                  Số tiền muốn nạp
                </label>
                <input
                  type="number"
                  name="money"
                  className="flex-auto text-center p-2"
                  onChange={handleInputChange}
                  placeholder="Nhập số tiền"
                />
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
        <div className="flex justify-center p-6">
          <div className="w-3/4 bg-white shadow-2xl shadow-gray-500 p-4  rounded-xl">
            <table className="table-auto w-full">
              <thead className="text-center">
                <tr>
                  <th className="w-[calc(100%-80%)]">ID đơn nạp tiền</th>
                  <th className="w-[calc(100%-80%)]">Ngày nạp</th>
                  <th className="w-[calc(100%-80%)]">Số lượng</th>
                  <th className="w-[calc(100%-80%)]">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {depositHistory.map((deposit, index) => (
                  <tr key={index}>
                    <td>{deposit.depositId}</td>
                    <td>
                      {new Date(deposit.depositTime).toLocaleDateString()}
                    </td>
                    <td>{deposit.amount} VND</td>
                    <td>{deposit.depositStatus}</td>
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
