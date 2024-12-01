'use client';

import React, { useEffect, useState } from 'react';
import StudentHeader, { StudentHeaderProps } from "@/app/ui/StudentHeader";
import { useUserSession } from "@/app/API/getMe";
import { redirect } from 'next/navigation';
import { deletePendingRequest, getAllPendingRequest, updatePendingRequest } from '@/app/API/student-trackingReq/student-trackingReq';
import Script from 'next/script';
import LoadingPage from '@/app/ui/LoadingPage';

export default function Home() {
    const { userInfo } = useUserSession();
    const [pageOption, setPageOption] = useState('Default');
    const [showCustomInput, setShowCustomInput] = useState(false);
    const [marginOption, setMarginOption] = useState('Default');
    const [showMarginInput, setShowMarginInput] = useState(false);
    const [isActive, setIsActive] = useState(false);
    if (!userInfo) {
        return <LoadingPage></LoadingPage>
    }

    if (userInfo.role === "SPSO") {
        redirect("/spso");
    }

    const toggleButton = () => {
        setIsActive(!isActive);
    };

    return (
        <main className="bg-[#353535] pb-[500px]">
            <StudentHeader header={userInfo as StudentHeaderProps} />
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
                                <tr>
                                    <td className="align-middle"></td>
                                    <td className="align-middle"></td>
                                    <td className='align-middle'></td>
                                    <td className="align-middle"></td>
                                    <td className="align-middle"></td>
                                    <td className="align-middle"></td>
                                    <td className="align-middle" style={styles.container}>
                                    <button
                                        onClick={toggleButton}
                                        style={{
                                            ...styles.button,
                                            backgroundColor: isActive ? '#4caf50' : 'Red',
                                            color: isActive ? 'black' : 'white',
                                        }}
                                    >
                                        <strong>{isActive ? 'Done' : 'UnDone'}</strong>
                                    </button>
                                                            </td>
                                </tr>
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

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#333',
    },
    button: {
        padding: '5px 10px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        width: '100px',
        transition: 'background-color 0.3s, color 0.3s',

    },
};