'use client'; // Sửa lại thành "use client"

import { useState } from "react";
import Image from "next/image";
import React from 'react';
import Script from 'next/script';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Home() {
  const [file, setFile] = useState<File | null>(null); // Khởi tạo với null

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    try {
      const data = new FormData();
      data.set('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      });

      // Xử lý lỗi
      if (!res.ok) throw new Error(await res.text());
      // Có thể thêm logic để xử lý phản hồi thành công ở đây
    } catch (e: any) {
      console.error(e);
    }
  };

  return (
    <main>
      <div className="inner_container container">
        <div className="line"></div>
        <div className="navbar container narrow">
          <div className="header">
            <a href="">
              <Image className="logo" src="/HCMUT_official_logo.png" width={50} height={50} alt="Logo" />
            </a>
            <div className="HCMUT row">
              <a className="Home" href="Trang Chu">HCMUT SSPS</a>
            </div>
            <div className="text-center">
              <div className="inner_row row align-items-start">
                <a className="col" href="Trang Chu">TRANG CHỦ</a>
                <a className="col" href="Trang Chu">IN TÀI LIỆU</a>
                <a className="col" href="Trang Chu">MUA TRANG IN</a>
                <a className="col" href="Trang Chu">LỊCH SỬ IN</a>
              </div>
            </div>
            <div className="dropdown1">
              <button  className="inner_user">
                <ion-icon className="User" name="person-circle-outline"></ion-icon>
                <ion-icon name="chevron-down-outline"></ion-icon>
              </button>
              <div className="content">
                <a href="">A</a>
                <a href="">b</a>
                <a href="">c</a>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div className="inner_wrap container">
        <div className="container upload_container">
          <div className="drop-section container">
            <div className="col">
              <div className="cloud-icon">
                <Image className="cloud" src="/cloud.png" width={50} height={50} alt="Cloud" />
              </div>
              <span>Drag & Drop your files here</span>
              <span>OR</span>
              <button type="button" className="file-selector" onClick={() => document.querySelector('.file-selector-input')?.click()}>
                Browse Files
              </button>
              <input type="file" className="file-selector-input" onClick={() => document.querySelector('.file-selector-input')?.click() } multiple/>
            </div>
            <div className="col">
              <div className="drop-here">Drop Here</div>
            </div>
          </div>
          <div className="list-section">
            <div className="list-title">Uploaded Files</div>
            <div className="list"></div>
          </div>
          <div className="header-section row align-items-start">
              <input type="radio" id="PDF" name="fav_language" value="PDF" />
              <label className="col ishover" htmlFor="PDF">PDF</label>

              <input type="radio" id="DOCx" name="fav_language" value="DOCx" />
              <label className="col ishover" htmlFor="DOCx">DOCx</label>

              <input type="radio" id="TXT" name="fav_language" value="TXT" />
              <label className="col ishover" htmlFor="TXT">TXT</label>

              <label className="col">&lt; 50 MB</label>
          </div>
        </div>

        <div className="section">
          <div className="row align-items-start"> 
              <div className="form-group col">
                <p className="p">Số bản</p>
                <input type="number" className="form-control" id="so-ban" placeholder="Nhập số bản"/>
              </div>
              
              <div className="form-group col">
                <p className="p">Khổ giấy</p>
                <select className="form-control" id="kho-giay">
                  <option value="">Chọn khổ giấy</option>
                  <option value="a4">A4</option>
                  <option value="a3">A3</option>
                  <option value="a5">A5</option>
                </select>
              </div>
              </div>
            <br/>
            <div className="row align-items-start"> 
              <div className="form-group col">
                <p className="p">Kiểu in</p>
                <select className="form-control" id="kieu-in">
                  <option value="">Chọn kiểu in</option>
                  <option value="in-mau">In màu</option>
                  <option value="in-den-trang">In đen trắng</option>
                  <option value="in-2-mat">In 2 mặt</option>
                </select>
              </div>
            
            <div className="form-group col">
              <p className="p">Hướng giấy</p>
              <select className="form-control" id="huong-giay">
                <option value="">Chọn hướng giấy</option>
                <option value="doc">Dọc</option>
                <option value="ngang">Ngang</option>
              </select>
            </div>
            </div>
          </div>
      </div>
      <script src="script.js"></script>
      <script src="scroll.js"></script>
      <Script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js" />
      <Script src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"/>
    </main>
    
  );
}