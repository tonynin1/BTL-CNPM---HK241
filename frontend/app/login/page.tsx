'use client';

import { useState } from "react";
import Image from "next/image";
import React from 'react';
import Script from 'next/script';
import Link from 'next/link';

// export default function Home() {
//   return (
//     <main>
//       <div className="login-container">
//         <div className="login-box">
//             <div className="logo-container">
//                 <Image src="/HCMUT_official_logo.png" alt="Logo" width={60} height={60} className="logo"/>
//                 <span className="logo-text">HCMUT SPSS</span>
//             </div>
//             <h2>Đăng nhập dành cho</h2>
//             <button className="account-option">
//                 <i className="icon-admin"></i> 
//                 <a href="../Login_BTL/index.html">Administrator</a>
//             </button>
//             <button className="account-option">
//                 <i className="icon-admin"></i> 
//                 <a href="../Login_BTL/index.html">Quản lý hệ thống (SPSO)</a>
//             </button>
//             <button className="account-option">
//                 <i className="icon-user"></i> 
//                 <a href="../Login_BTL/index.html">Sinh viên Trường đại học Bách khoa</a>
//             </button>
//             <div className="register-row">
//                 <a href="../Sign_up/index.html" className="sign_up">Đăng ký tài khoản mới</a>
//             </div>
//         </div>
//     </div>
//   </main>
//   );
// }
export default function Home() {
    return (
      <main>
        <div className="login-container">
          <div className="login-box">
            <div className="logo-container">
              <Image src="/HCMUT_official_logo.png" alt="Logo" width={60} height={60} className="logo" />
              <span className="logo-text">HCMUT SPSS</span>
            </div>
            <h2>Đăng nhập dành cho</h2>
            <button className="account-option">
              <i className="icon-admin"></i>
              <Link href="/signin">Administrator</Link>
            </button>
            <button className="account-option">
              <i className="icon-admin"></i>
              <Link href="/signin">Quản lý hệ thống (SPSO)</Link>
            </button>
            <button className="account-option">
              <i className="icon-user"></i>
              <Link href="/signin">Sinh viên Trường đại học Bách khoa</Link>
            </button>
            <button className="register-row">
              <Link href="/signup" className="sign_up">
                Đăng ký tài khoản mới
              </Link>
            </button>
          </div>
        </div>
      </main>
    );
  }
  