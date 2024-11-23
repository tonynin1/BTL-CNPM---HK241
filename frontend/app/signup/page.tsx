'use client';

import { useState } from "react";
import Image from "next/image";
import React from "react";
import { signup } from "../API/signup";

export default function Login() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    userType: ""
  });

  // Cập nhật kiểu dữ liệu cho sự kiện
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Cập nhật kiểu dữ liệu cho sự kiện submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Kiểm tra logic mật khẩu
    if (formData.password !== formData.confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }

    // In dữ liệu ra console hoặc xử lý tiếp
    console.log("Form Submitted:", formData);
    let data = signup(formData);

  };

  return (
    <main>
      <div className="login-container">
        <div className="login-box mt-[5%]">
          <div className="flex items-center mb-4 mt-2 justify-center gap-2">
            <Image
              src="/HCMUT_official_logo.png"
              alt="Logo"
              width={60}
              height={60}
              className="logo my-0"
            />
            <span className="logo-text my-0">HCMUT SPSS</span>
          </div>
          <h2>Tạo tài khoản mới</h2>
          <form id="registerForm" onSubmit={handleSubmit}>
            <div className="input-row">
              <div className="input-group">
                <label htmlFor="firstname">Họ</label>
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  placeholder="Nhập họ"
                  value={formData.firstname}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="lastname">Tên</label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  placeholder="Nhập tên"
                  value={formData.lastname}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Nhập email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="phone">Số điện thoại</label>
              <input
                type="text"
                id="phone"
                name="phone"
                placeholder="Nhập số điện thoại"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Mật khẩu</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Nhập mật khẩu"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Xác nhận mật khẩu"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group flex flex-col">
              <label>Đối tượng</label>
              <div className="toggle-group flex">
                <input
                  type="radio"
                  id="student"
                  name="userType"
                  value="student"
                  onChange={handleChange}
                  required
                />
                <label htmlFor="student" className="toggle-option content-center">
                  <span>Sinh viên</span>
                </label>
                <input
                  type="radio"
                  id="manager"
                  name="userType"
                  value="manager"
                  onChange={handleChange}
                />
                <label htmlFor="manager" className="toggle-option content-center">
                  <span>Quản lý hệ thống</span>
                </label>
              </div>
            </div>
            <button type="submit" className="btn">
              Đăng ký
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
