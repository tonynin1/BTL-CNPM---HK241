'use client';

import { useState } from "react";
import Image from "next/image";
import React from "react";

export default function Login() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    dob: "", // Thêm trường ngày sinh
    password: "",
    confirmPassword: "",
    userType: "",
  });

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }
    console.log("Form Submitted:", formData);
    alert("Đăng ký thành công!");
  };

  const togglePasswordVisibility = (field: "password" | "confirmPassword") => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
    console.log(`Toggle ${field}:`, showPassword[field]); // Kiểm tra trạng thái
  };

  return (
    <main>
      <div className="login-container">
        <div className="login-box">
          <div className="logo-text">
            <Image
              src="/HCMUT_official_logo.png"
              alt="Logo"
              width={60}
              height={60}
              className="logo"
            />
            HCMUT SPSS
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

            {/* Trường ngày tháng năm sinh */}
            <div className="input-group">
              <label htmlFor="dob">Ngày tháng năm sinh</label>
              <input
                type="date"
                id="dob"
                name="dob"
                placeholder="Chọn ngày tháng năm sinh"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Mật khẩu</label>
              <div className="password-container">
                <input
                  type={showPassword.password ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Nhập mật khẩu"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <span
                  id="eye-password"
                  onClick={() => togglePasswordVisibility("password")}
                >
                  {showPassword.password ? "🔓" : "🔒"}
                </span>
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
              <div className="password-container">
                <input
                  type={showPassword.confirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Xác nhận mật khẩu"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <span
                  id="eye-confirm-password"
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                >
                  {showPassword.confirmPassword ? "🔓" : "🔒"}
                </span>
              </div>
            </div>

            <div className="input-group">
              <label>Đối tượng</label>
              <div className="toggle-group">
                <input
                  type="radio"
                  id="student"
                  name="userType"
                  value="student"
                  onChange={handleChange}
                  required
                />
                <label htmlFor="student" className="toggle-option">
                  Sinh viên
                </label>
                <input
                  type="radio"
                  id="manager"
                  name="userType"
                  value="manager"
                  onChange={handleChange}
                />
                <label htmlFor="manager" className="toggle-option">
                  Quản lý hệ thống
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
