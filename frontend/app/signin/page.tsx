'use client';
import Image from "next/image";
import React, { useState } from 'react';
import { redirect, useRouter } from 'next/navigation';
import { setCookie } from 'nookies';
import { login } from "../API/signin";
import { getUserInfo } from "../API/userInfo";

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  async function handleSignIn(email: string, password: string) {
      let res = await login(email, password)   
      
      let user = null
      if (res){
        user = await getUserInfo();
      }
      else {
        alert("Đăng nhập thất bại")
        window.location.reload();
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
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    handleSignIn(username, password);
  }

  return (
    <main>
      <div className="login-container container mt-[10%]">
        <div className="login-box">
          <div className="logo-container mb-8">
            <Image src="/HCMUT_official_logo.png" alt="Logo" width={60} height={60} className="logo" />
            <span className="logo-text">HCMUT SPSS</span>
          </div>
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
              <div className="password-container mb-8">
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Mật khẩu"
                  required
                  className="w-[100%]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {errorMessage && (
                <p className="text-red-500 mb-4">{errorMessage}</p>
              )}
              <button type="submit" className="login-button">
                Đăng nhập
              </button>
              <button type="button" className="signup-button text-white" onClick={() => {
                window.location.href = "http://localhost:3000/signup";
              }}>
                Đăng ký
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
