'use client';
import Image from "next/image";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setCookie } from 'nookies';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  async function handleSignIn(email: string, password: string) {
    try {
      const response = await fetch("http://127.0.0.1:8080/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      
      // Lưu accessToken và refreshToken vào cookie
      setCookie(null, "accessToken", data.accessToken, {
        path: "/",
        maxAge: 60 * 15, // 15 phút
      });
      setCookie(null, "refreshToken", data.refreshToken, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 ngày
      });

      // Gọi API để lấy thông tin người dùng
      const userResponse = await fetch("http://127.0.0.1:8080/auth/me", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${data.accessToken}`
        },
      });

      if (!userResponse.ok) {
        throw new Error("Failed to fetch user info");
      }

      const userData = await userResponse.json();
      
      // Điều hướng dựa trên vai trò của người dùng
      if (userData.role === 'STUDENT') {
        router.push("/student");
      } else {
        router.push("/spso");
      }
      
    } catch (error: any) {
      setErrorMessage(error.message || "Login failed");
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
