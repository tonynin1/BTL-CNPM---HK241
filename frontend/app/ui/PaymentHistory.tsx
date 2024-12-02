import { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import api from '@/app/API/axiosInstance';

type Payment = {
    ppoId: string;
    purchaseTime: string; 
    pageNum: number; 
    price: number; 
    paymentMethod: string; 
    ppoStatus: string; 
};

export default function PaymentHistory({ onClick, customerId }: { onClick: () => void; customerId: number }) {
    const [paymentHistory, setPaymentHistory] = useState<Payment[]>([]);

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
                customerId: customerId
              }
            });
            setPaymentHistory(paymentHistoryResponse.data);
            localStorage.setItem('paymentHistory', JSON.stringify(paymentHistoryResponse.data));
          } catch (error) {
            console.error(`Error fetching payment history:`, error);
            alert('Failed to load payment history. Please try again later.');
          }
        };
    
        if (customerId) {
          fetchPaymentHistory();
        }
      }, [customerId]);

      const handleStatusUpdate = async (ppoId: string, newStatus: string) => {
        try {
            const cookies = parseCookies();
            const accessToken = cookies.accessToken;

            if (!accessToken) {
                throw new Error("Access token not found.");
            }

            await api.put('payment/update-status/method/office', {
                ppoId : ppoId,
                ppoStatus: newStatus
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            });

            setPaymentHistory(prevHistory => 
                prevHistory.map(payment => 
                    payment.ppoId === ppoId 
                        ? { ...payment, ppoStatus: newStatus }
                        : payment
                )
            );

        } catch (error) {
            console.error('Error updating payment status:', error);
            alert('Failed to update payment status. Please try again later.');
        }
    };

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
                        {paymentHistory.map((item, index) => (
                            <tr key={index} className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {item.ppoId}
                                </th>
                                <td className="px-6 py-4">
                                    {item.purchaseTime}
                                </td>
                                <td className="px-6 py-4">
                                    {item.pageNum}
                                </td>
                                <td className="px-6 py-4">
                                    {item.price}
                                </td>    
                                <td className="px-6 py-4">
                                    {item.paymentMethod}
                                </td>
                                <td className="px-6 py-4">
                                    {item.paymentMethod === 'Office' ? (
                                        <select
                                            value={item.ppoStatus}
                                            onChange={(e) => handleStatusUpdate(item.ppoId, e.target.value)}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Success">Success</option>
                                            <option value="Failed">Failed</option>
                                        </select>
                                    ) : (
                                        <span className="px-2 py-1">{item.ppoStatus}</span>
                                    )}
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
