'use client';
import Image from "next/image";
import React, { useState } from 'react';
import { redirect, useRouter } from 'next/navigation';
import { setCookie } from 'nookies';
import { login } from "../API/signin";
import { getUserInfo } from "../API/userInfo";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FaRegEye, FaRegEyeSlash  } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignIn(email: string, password: string) {
      setIsLoading(true);
      let res = await login(email, password)   
      
      let user = null
      if (res){
        user = await getUserInfo();
      }
      else {
        toast.error("Đăng nhập thất bại")
        // window.location.reload();
      }

      // routing based on user role
      if (user.role === 'STUDENT') {
        // router.push('/student');
        redirect('/student')
      }
      else {
        // router.push('/spso');
        redirect('/spso')
      }

      setIsLoading(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    handleSignIn(username, password);
  }

  function handleShowPassword() {
    setIsShowPassword(!isShowPassword);
  }

  return (
    <main>
      <div className="login-container container mt-[10%]">
        <div className="login-box">
          <div className="logo-container mb-8">
            <Image src="/HCMUT_official_logo.png" alt="Logo" width={60} height={60} className="logo" />
            <span className="logo-text">HCMUT SPSS</span>
          </div>
          <ToastContainer />
          <div className="login-form">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Tài khoản"
                required
                className="w-[100%]"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <div className="password-container mb-8 relative">
                <input
                  type={isShowPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="Mật khẩu"
                  required
                  className="w-[100%]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="absolute top-1/2 right-3 transform -translate-y-1/2 text-lg hover:opacity-50 hover:cursor-pointer ease-in-out duration-300"
                     onClick={handleShowPassword}
                >
                  { isShowPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </div>
              </div>
              {errorMessage && (
                <p className="text-red-500 mb-4">{errorMessage}</p>
              )}
              <button type="submit" className="login-button disabled:opacity-75" disabled={isLoading}>
                Đăng nhập
              </button>
              <button 
                type="button" 
                className="signup-button text-white disabled:opacity-75"  
                onClick={() => {
                  window.location.href = "http://localhost:3000/signup";
                }}
                disabled={isLoading}
              >
                Đăng ký
              </button>
              {
                isLoading && (
                  <div className="flex justify-center mt-4 text-2xl">
                    <AiOutlineLoading3Quarters className="animate-spin" />
                  </div>
                )
              }
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
