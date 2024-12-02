import { useEffect } from "react";
import { userInfo } from "../API/userInfo";
import { parseCookies } from "nookies";

type Payment = {
    TransactionId: number;
    Date: string;
    PageNum: number;
    Price: number;
    PaymentMethod: string;
    Status: string;
};

export default function PaymentHistory(onClick: any) {
    const [paymentHistory, setPaymentHistory] = useState<Payment[]>([]);

    useEffect(() => {
        const fetchPaymentHistory = async () => {
          try {
            const cookies = parseCookies();
            const accessToken = cookies.accessToken;
    
            if (!accessToken) {
              throw new Error("Access token not found.");
            }
    
            const depositHistoryResponse = await api.get('payment/history', {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
              params: {
                customerId: userInfo?.customerId,
              }
            });
            setDepositHistory(depositHistoryResponse.data);
            // Save deposit history to local storage
            localStorage.setItem('depositHistory', JSON.stringify(depositHistoryResponse.data));
          } catch (error) {
            console.error(`Error fetching deposit history: ${error}`);
          }
        };
    
        if (userInfo) {
          fetchDepositHistory();
        } else {
    
          const savedHistory = localStorage.getItem('depositHistory');
          if (savedHistory) {
            setDepositHistory(JSON.parse(savedHistory));
          }
        }
      }, [userInfo]);
  const printOrders = [
    {
        printOrderId: "PO10001",
        attribute: "A4, Color",
        createdAt: "2024-12-01 08:00:00",
        printedAt: "2024-12-01 08:15:00",
        status: "Completed",
        copies: 10,
    },
    {
        printOrderId: "PO10002",
        attribute: "A3, Black & White",
        createdAt: "2024-12-01 09:00:00",
        printedAt: "2024-12-01 09:20:00",
        status: "Completed",
        copies: 5,
    },
    {
        printOrderId: "PO10003",
        attribute: "A4, Color",
        createdAt: "2024-12-01 10:30:00",
        printedAt: null, // Chưa in
        status: "Pending",
        copies: 3,
    },
    {
        printOrderId: "PO10004",
        attribute: "A5, Black & White",
        createdAt: "2024-12-01 11:00:00",
        printedAt: "2024-12-01 11:30:00",
        status: "Completed",
        copies: 15,
    },
    {
        printOrderId: "PO10005",
        attribute: "A4, Color",
        createdAt: "2024-12-01 12:00:00",
        printedAt: null, // Chưa in
        status: "Queued",
        copies: 7,
    },
    {
        printOrderId: "PO10006",
        attribute: "A3, Black & White",
        createdAt: "2024-12-01 13:00:00",
        printedAt: "2024-12-01 13:45:00",
        status: "Completed",
        copies: 12,
    },
    {
        printOrderId: "PO10007",
        attribute: "A4, Color",
        createdAt: "2024-12-01 14:00:00",
        printedAt: null, // Chưa in
        status: "Pending",
        copies: 20,
    },
    {
        printOrderId: "PO10007",
        attribute: "A4, Color",
        createdAt: "2024-12-01 14:00:00",
        printedAt: null, // Chưa in
        status: "Pending",
        copies: 20,
    },
    {
        printOrderId: "PO10007",
        attribute: "A4, Color",
        createdAt: "2024-12-01 14:00:00",
        printedAt: null, // Chưa in
        status: "Pending",
        copies: 20,
    },
    {
        printOrderId: "PO10007",
        attribute: "A4, Color",
        createdAt: "2024-12-01 14:00:00",
        printedAt: null, // Chưa in
        status: "Pending",
        copies: 20,
    },
    {
        printOrderId: "PO10007",
        attribute: "A4, Color",
        createdAt: "2024-12-01 14:00:00",
        printedAt: null, // Chưa in
        status: "Pending",
        copies: 20,
    },
    {
        printOrderId: "PO10007",
        attribute: "A4, Color",
        createdAt: "2024-12-01 14:00:00",
        printedAt: null, // Chưa in
        status: "Pending",
        copies: 20,
    },
    {
        printOrderId: "PO10007",
        attribute: "A4, Color",
        createdAt: "2024-12-01 14:00:00",
        printedAt: null, // Chưa in
        status: "Pending",
        copies: 20,
    },
    {
        printOrderId: "PO10007",
        attribute: "A4, Color",
        createdAt: "2024-12-01 14:00:00",
        printedAt: null, // Chưa in
        status: "Pending",
        copies: 20,
    },
    {
        printOrderId: "PO10007",
        attribute: "A4, Color",
        createdAt: "2024-12-01 14:00:00",
        printedAt: null, // Chưa in
        status: "Pending",
        copies: 20,
    },
    {
        printOrderId: "PO10007",
        attribute: "A4, Color",
        createdAt: "2024-12-01 14:00:00",
        printedAt: null, // Chưa in
        status: "Pending",
        copies: 20,
    },

    {
        printOrderId: "PO10007",
        attribute: "A4, Color",
        createdAt: "2024-12-01 14:00:00",
        printedAt: null, // Chưa in
        status: "Pending",
        copies: 20,
    },
    {
        printOrderId: "PO10007",
        attribute: "A4, Color",
        createdAt: "2024-12-01 14:00:00",
        printedAt: null, // Chưa in
        status: "Pending",
        copies: 20,
    },
    {
        printOrderId: "PO10007",
        attribute: "A4, Color",
        createdAt: "2024-12-01 14:00:00",
        printedAt: null, // Chưa in
        status: "Pending",
        copies: 20,
    },
    {
        printOrderId: "PO10007",
        attribute: "A4, Color",
        createdAt: "2024-12-01 14:00:00",
        printedAt: null, // Chưa in
        status: "Pending",
        copies: 20,
    },

    {
        printOrderId: "PO10007",
        attribute: "A4, Color",
        createdAt: "2024-12-01 14:00:00",
        printedAt: null, // Chưa in
        status: "Pending",
        copies: 20,
    },

];
      

  return (
    <div 
        className={`absolute top-0 left-0 right-0 bottom-0 flex justify-center z-50 bg-black/[0.2] print_history_modal`}
        onClick={onClick}
    >
        <div className="relative p-4 shadow-2xl sm:rounded-lg max-h-[700px] mt-8 bg-white dark:bg-gray-800">
            <div 
                className=" overflow-y-scroll max-h-[600px]"
                onClick={(e) => e.stopPropagation()}
            >
                <table className='w-full table-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                    <caption className="caption-top text-center uppercase">
                        lịch sử in
                    </caption>
                    <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                        <tr>
                        <th scope="col" className='px-6 py-3'>Payment ID</th>
                        <th scope="col" className='px-6 py-3'>Date</th>
                        <th scope="col" className='px-6 py-3'>Số trang mua</th>
                        <th scope="col" className='px-6 py-3'>Giá</th>
                        <th scope="col" className='px-6 py-3'>Phương thức thanh toán</th>
                        <th scope="col" className='px-6 py-3'>Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {printOrders.map((item, index) => (
                            <tr key={index} className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {item.printOrderId}
                                </th>
                                <td className="px-6 py-4">
                                    {item.attribute}
                                </td>
                                <td className="px-6 py-4">
                                    {item.createdAt}
                                </td>
                                <td className="px-6 py-4">
                                    {item.printedAt ? item.printedAt : 'Đang chờ xử lý'}
                                </td>    
                                <td className="px-6 py-4">
                                    {item.status}
                                </td>
                                <td className="px-6 py-4">
                                    {item.copies}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button className="absolute right-6 mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={onClick}>Close</button>
        </div>
    </div>
  )
}
