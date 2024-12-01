'use client';

import React, { useEffect, useState } from 'react';
import StudentHeader, { StudentHeaderProps } from "@/app/ui/StudentHeader";
import { useUserSession } from "@/app/API/getMe";
import { redirect } from 'next/navigation';
import { getAllPendingRequest } from '@/app/API/student-trackingReq/student-trackingReq';
import Script from 'next/script';

export default function Home() {
    const { userInfo } = useUserSession();
    const [allPendingReq, setAllPendingReq] = useState<any>([]);
    const [pageOption, setPageOption] = useState('default');
    const [showCustomInput, setShowCustomInput] = useState(false);
    const [marginOption, setMarginOption] = useState('default');
    const [showMarginInput, setShowMarginInput] = useState(false);

    const fetching = async () => {
        if (!userInfo) return;
        try {
            let data = await getAllPendingRequest(userInfo.customerId);
            setAllPendingReq(data.data);
            console.log(data.data);
        } catch (error) {
            console.log("Error fetching data:", error);
        }
    };

    useEffect(() => {
        if (userInfo) {
            fetching();
        }
    }, [userInfo]);

    if (!userInfo) {
        return <div>Loading</div>;
    }

    if (userInfo.role === "SPSO") {
        redirect("/spso");
    }

    const handlePageOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setPageOption(value);
        setShowCustomInput(value === 'custom');
    };

    const handleMarginOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setMarginOption(value);
        setShowMarginInput(value === 'custom');
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
                                <th>Chọn</th>
                                <th>Print Order Id</th>
                                <th>Attributes</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                <th>PO Status</th>
                                <th>Num Copies</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allPendingReq.map((item: any, index: number) => (
                                <tr key={index}>
                                    <td className="align-middle"><input type="checkbox" /></td>
                                    <td className="align-middle">{item.printOrderId}</td>
                                    <td className="align-middle">{item.attributes}</td>
                                    <td className="align-middle">{item.startTime}</td>
                                    <td className="align-middle">{item.endTime}</td>
                                    <td className="align-middle">{item.poStatus}</td>
                                    <td className="align-middle">{item.numCopies}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="Button">
                        <button type="button" className="btn btn-outline-success" data-toggle="modal" data-target="#exampleModalCenter">Edit</button>
                        <button type="button" className="btn btn-outline-danger">Delete</button>
                    </div>
                    <div className="modal fade" id="exampleModalCenter" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLongTitle">Edit Document</h5>
                                </div>
                                <div className="modal-body">
                                    <div className="settings-container">
                                        <div className="settings">
                                            <div className="setting">
                                                <label>Destination:</label>
                                                <select className="Option" id="destination">
                                                    <option>Microsoft Print to PDF</option>
                                                    <option>Printer 1</option>
                                                    <option>Printer 2</option>
                                                </select>
                                            </div>
                                            <div className="setting">
                                                <label>Pages:</label>
                                                <select className="Option" id="pageOptions" value={pageOption} onChange={handlePageOptionChange}>
                                                    <option value="all">All</option>
                                                    <option value="custom">Custom</option>
                                                </select>
                                            </div>

                                            {showCustomInput && (
                                                <div className="setting">
                                                    <label style={{ color: "red" }}>Nhập số trang:</label>
                                                    <input type="text" id="pages" className="Option" placeholder="e.g. 1-5, 8, 11-13" />
                                                </div>
                                            )}
                                            <div className="setting">
                                                <label>Margin:</label>
                                                <select className="Option" id="marginOptions" value={marginOption} onChange={handleMarginOptionChange}>
                                                    <option value="default">Default</option>
                                                    <option value="none">None</option>
                                                    <option value="minimum">Minimum</option>
                                                    <option value="custom">Custom</option>
                                                </select>
                                            </div>

                                            {showMarginInput && (
                                                <div className="setting">
                                                    <label style={{ color: "red" }}>Nhập Margin:</label>
                                                    <input type="number" id="Margin" className="Option" min={1} placeholder="Margin" />
                                                </div>
                                            )}
                                            <div className="setting">
                                                <label>Layout:</label>
                                                <select className="Option" id="layout">
                                                    <option>Portrait</option>
                                                    <option>Landscape</option>
                                                    <option>Portrait (flipped)</option>
                                                    <option>Landscape (flipped)</option>
                                                </select>
                                            </div>
                                            <div className="setting">
                                                <label>Color:</label>
                                                <select className="Option" id="color">
                                                    <option>Color</option>
                                                    <option>Black & White</option>
                                                </select>
                                            </div>
                                            <div className="setting">
                                                <label>Page size:</label>
                                                <select className="Option" id="page-size">
                                                    <option>Letter</option>
                                                    <option>Tabloid</option>
                                                    <option>Statement</option>
                                                    <option>Executive</option>
                                                    <option>A3</option>
                                                    <option>A4</option>
                                                    <option>A5</option>
                                                    <option>B4</option>
                                                    <option>B5</option>
                                                </select>
                                            </div>
                                            <div className="setting">
                                                <label>Pages per sheet:</label>
                                                <select className="Option" id="pages-per-sheet">
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>4</option>
                                                    <option>5</option>
                                                    <option>9</option>
                                                    <option>16</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary">Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></Script>
            <Script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></Script>
            <Script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></Script>
        </main>
    );
}