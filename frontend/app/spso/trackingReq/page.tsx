'use client';

import React, { useEffect, useState } from 'react';
import StudentHeader, { StudentHeaderProps } from "@/app/ui/StudentHeader";
import { useUserSessionForSPSO } from "@/app/API/getMe";
import { redirect } from 'next/navigation';
import Script from 'next/script';
import LoadingPage from '@/app/ui/LoadingPage';
import SPSOHeader, { SPSOHeaderProps } from '@/app/ui/SPSOHeader';

export default function Home() {
    const { userInfo } = useUserSessionForSPSO();
    const [buttonStates, setButtonStates] = useState([false, false, false, false, false]); 

    const tableData = [
        { id: 1, attributes: 'Red', startTime: '2023-10-19 12:00:00', endTime: '2023-10-19 12:30:00', status: 'Pending', copies: 1 },
        { id: 2, attributes: 'Blue', startTime: '2023-10-19 12:10:00', endTime: '2023-10-19 12:40:00', status: 'Completed', copies: 2 },
        { id: 3, attributes: 'Green', startTime: '2023-10-19 12:20:00', endTime: '2023-10-19 12:50:00', status: 'Pending', copies: 3 },
        { id: 4, attributes: 'Yellow', startTime: '2023-10-19 12:30:00', endTime: '2023-10-19 13:00:00', status: 'Pending', copies: 4 },
        { id: 5, attributes: 'Purple', startTime: '2023-10-19 12:40:00', endTime: '2023-10-19 13:10:00', status: 'Completed', copies: 5 },
    ];

    if (!userInfo) {
        return <LoadingPage></LoadingPage>
    }

    if (userInfo.role === "STUDENT") {
        redirect("/student");
    }

    const toggleButton = (index) => {
        setButtonStates(prevStates => {
            const newStates = [...prevStates];
            newStates[index] = !newStates[index]; 
            return newStates;
        });
    };

    return (
        <main className="bg-[#353535] pb-[500px]">
            <SPSOHeader header={userInfo as SPSOHeaderProps} />
            <div className="inner_wrap container">
                <div className="container upload_container">
                    <h1 className="text-white">Bảng Dữ Liệu Khách Hàng</h1>
                    <table className="table table-dark table-striped">
                        <thead>
                            <tr>
                                <th>Print Order Id</th>
                                <th>Attributes</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                <th>PO Status</th>
                                <th>Num Copies</th>
                                <th>Chose</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((row, index) => (
                                <tr key={row.id}>
                                    <td>{row.id}</td>
                                    <td>{row.attributes}</td>
                                    <td>{row.startTime}</td>
                                    <td>{row.endTime}</td>
                                    <td>{row.status}</td>
                                    <td>{row.copies}</td>
                                    <td>
                                        <button
                                            onClick={() => toggleButton(index)}
                                            style={{
                                                backgroundColor: buttonStates[index] ? '#4caf50' : 'Red',
                                                color: buttonStates[index] ? 'black' : 'white',
                                            }}
                                        >
                                            <strong>{buttonStates[index] ? 'Done' : 'UnDone'}</strong>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Script src="https://c...content-available-to-author-only...y.com/jquery-3.5.1.slim.min.js"></Script>
            <Script src="https://c...content-available-to-author-only...r.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></Script>
            <Script src="https://s...content-available-to-author-only...n.com/bootstrap/4.5.2/js/bootstrap.min.js"></Script>
        </main>
    );
}
