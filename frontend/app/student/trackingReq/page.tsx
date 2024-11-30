'use client';

import { useState } from "react";
import Image from "next/image";
import React from 'react';
import Script from 'next/script';
import StudentHeader from "@/app/ui/StudentHeader"

export default function Home() {
  return (
    <main className="bg-[#353535] pb-[500px]">
      <StudentHeader />
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
            <tr>
                <td className="align-middle"><input type="checkbox" /></td>
                <td className="align-middle">3</td>
                <td className="align-middle">Red</td>
                <td className="align-middle">2023-10-19 12:34:56.789</td>
                <td className="align-middle">2023-10-19 12:34:56.789</td>
                <td className="align-middle">Pending</td>
                <td className="align-middle">1</td>
            </tr>
            <tr>
                <td className="align-middle"><input type="checkbox" /></td>
                <td className="align-middle">5</td>
                <td className="align-middle">Blue</td>
                <td className="align-middle">2023-10-19 12:34:56.789</td>
                <td className="align-middle">2023-10-19 12:34:56.789</td>
                <td className="align-middle">Completed</td>
                <td className="align-middle">3</td>
            </tr>
            
        </tbody>
      </table>
        <div className="Button">
          <button type="button" className="btn btn-outline-success">Edit</button>
          <button type="button" className="btn btn-outline-danger">Delete</button>
        </div>

        </div>
      </div>
    </main>
  );
}