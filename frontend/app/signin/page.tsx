'use client';

import { useState } from "react";
import Image from "next/image";
import React from 'react';
import Script from 'next/script';
import Link from 'next/link';

// export default function Login() {
//   const [showPassword, setShowPassword] = useState(false);

//   const togglePasswordVisibility = () => {
//     console.log("Eye icon clicked!"); // Kiểm tra log
//     setShowPassword((prevState) => !prevState);
//   };
//   return (
//     <main>
//       <div className="login-container">
//         <div className="login-box">
//           <div className="logo-container">
//             <Image src="/HCMUT_official_logo.png" alt="Logo" width={60} height={60} className="logo" />
//             <span className="logo-text">HCMUT SPSS</span>
//           </div>
//           <div className="login-form">
//             <form action="#" method="POST">
//               <input
//                 type="text"
//                 id="username"
//                 name="username"
//                 placeholder="Tài khoản"
//                 required
//               />
//               <div className="password-container">
//                 <input
//                   type="password"
//                   id="password"
//                   name="password"
//                   placeholder="Mật khẩu"
//                   required
//                 />
//                 <span id="eye" onClick={togglePasswordVisibility}>
//                   {showPassword ? "🙈" : "👁️"}
//                 </span>
//               </div>
//               <button type="submit" className="login-button">
//                 Đăng nhập
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }


export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    console.log("Eye icon clicked!"); // Kiểm tra log
    setShowPassword((prevState) => !prevState);
  };

  return (
    <main>
      <div className="login-container">
        <div className="login-box">
          <div className="logo-container">
            <Image
              src="/HCMUT_official_logo.png"
              alt="Logo"
              width={60}
              height={60}
              className="logo"
            />
            <span className="logo-text">HCMUT SPSS</span>
          </div>
          <div className="login-form">
            <form action="#" method="POST">
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Tài khoản"
                required
              />
              <div className="password-container">
                {/* Liên kết trạng thái showPassword với type của input */}
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Mật khẩu"
                  required
                />
                {/* Biểu tượng mắt */}
                <span id="eye" onClick={togglePasswordVisibility}>
                {showPassword ? "🔓" : "🔒"}
                </span>
              </div>
              <button type="submit" className="login-button">
                Đăng nhập
              </button>
              <button type="submit" className="login-button">
                <Link href="/signup" className="sign_up">
                  Đăng ký tài khoản mới
                </Link>
            </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}