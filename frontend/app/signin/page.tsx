'use client';

import { useState } from "react";
import Image from "next/image";
import React from 'react';
import Script from 'next/script';
import Link from 'next/link';

export default function Login() {
  return (
    <main>
      <div className="login-container container mt-[10%]">
        <div className="login-box">
          <div className="logo-container mb-8">
            <Image src="/HCMUT_official_logo.png" alt="Logo" width={60} height={60} className="logo" />
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
                className="w-[100%]"
              />
              <div className="password-container mb-8">
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Mật khẩu"
                  required
                  className="w-[100%]"
                />
              </div>
              <button type="submit" className="login-button">
                Đăng nhập
              </button>

              <button type="button" className="signup-button text-white">
                <Link href={"/signup"} className="text-white">
                  Đăng ký
                </Link>
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}


