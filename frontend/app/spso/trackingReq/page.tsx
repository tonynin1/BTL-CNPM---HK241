'use client';

import React, { useEffect, useState } from 'react';
import StudentHeader, { StudentHeaderProps } from "@/app/ui/StudentHeader";
import { useUserSessionForSPSO } from "@/app/API/getMe";
import { redirect } from 'next/navigation';
import Script from 'next/script';
import LoadingPage from '@/app/ui/LoadingPage';
import SPSOHeader, { SPSOHeaderProps } from '@/app/ui/SPSOHeader';
import { getAllPrinters } from '@/app/API/spso-managePrinters/spso-managePrinters';
import { getAllPendingRequestByPrinterId, triggerPending } from '@/app/API/spso-trackingReq/spso-trackingReq';

export default function Home() {
    const { userInfo } = useUserSessionForSPSO();
    const [buttonStates, setButtonStates] = useState([false, false, false, false, false]); 
    const [allPendingReq, setAllPendingReq] = useState<any>([]);
   
    const fetching = async () => {
        if (!userInfo) return;
        try {
            // set pending null first
            setAllPendingReq([]);
            console.log(userInfo);
            // get all printers by this spso
            let res = await getAllPrinters(userInfo.sosoMemberId)
            
            let printers = res.data;
            console.log(printers);

            if (printers.length > 0 ){

                printers.forEach(async (printer: any) => {
                    let res : any = await getAllPendingRequestByPrinterId(printer.printerId);

                    if (res.data.length > 0){
                        console.log(res.data);
                        setAllPendingReq((prev: any) => {
                            return [...prev, ...res.data];
                        })
                    }

                })
            }

        } catch (error) {
            console.log("Error fetching data: ", error);
        }
    }
    const toggleButton = (index : any, printOrderId: number) => {
        if (confirm("Do you sure you want to change the status of this print order?")) {
            triggerPending(printOrderId);
            setButtonStates(prevStates => {
                const newStates = [...prevStates];
                newStates[index] = !newStates[index]; 
                return newStates;
            });

        }
    };

    useEffect(() => {
        if (userInfo){
            fetching();
        }
    }, [userInfo]);

    if (!userInfo || !allPendingReq) {
        return <LoadingPage></LoadingPage>
    }

    if (userInfo.role === "STUDENT") {
        redirect("/student");
    }
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
                            {allPendingReq.map((row : any, index : number) => (
                                <tr key={row.printOrderId}>
                                    <td>{row.printOrderId}</td>
                                    <td>{row.attributes}</td>
                                    <td>{row.startTime}</td>
                                    <td>{row.endTime}</td>
                                    <td>{row.poStatus}</td>
                                    <td>{row.numCopies}</td>
                                    <td>
                                        <button
                                            onClick={() => toggleButton(index, row.printOrderId)}
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
