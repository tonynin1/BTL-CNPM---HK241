'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import React from 'react';
import Script from 'next/script';
import StudentHeader, { StudentHeaderProps } from "@/app/ui/StudentHeader"
import { redirect } from "next/navigation";
import { useUserSessionForCustomer } from "@/app/API/getMe";
import LoadingPage from "@/app/ui/LoadingPage";
import { getAllPrinsAvailable, uploadFiles } from "@/app/API/student-printDoc/student-printDoc";
import { parseCookies } from "nookies";

function getFileIcon(fileName) {
  const fileExtension = fileName.split('.').pop()?.toLowerCase();

  // Các biểu tượng tệp khác nhau dựa trên phần mở rộng
  switch (fileExtension) {
    case 'pdf':
      return '/icons/pdf-icon.png'; // Đường dẫn đến icon PDF
    case 'docx':
      return '/icons/word-icon.png'; // Đường dẫn đến icon Word
    case 'txt':
      return '/icons/text-icon.png'; // Đường dẫn đến icon Text
    case 'jpg':
    case 'jpeg':
    case 'png':
      return '/icons/image-icon.png'; // Đường dẫn đến icon ảnh
    default:
      return '/icons/default-icon.png'; // Icon mặc định nếu không nhận diện được
  }
}

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const { userInfo, loggedIn } = useUserSessionForCustomer();
  const [AllPrinters, setAllPrinters] = useState<any[]>([]);
  const [printerId, setPrinterId] = useState<number | null>(null);
  const [myForm, setMyForm] = useState<any>(null);
  const fetching = async () => {
    if (!userInfo) return;
    try {
      let data = await getAllPrinsAvailable();
      setAllPrinters(data.data);
    } catch (error) {
      console.log("Error fetching user info:", error);
      
    }
  }
  useEffect(() => {
    fetching();
  }, [userInfo]);
  
  if (!userInfo || !AllPrinters) {
    return <LoadingPage></LoadingPage>
  }
  if (userInfo.role === 'SPSO'){
    redirect('/spso')
  }
  return (
    <main className="bg-[#353535] pb-[100px]">
      <StudentHeader header={userInfo as StudentHeaderProps} />
      <div className="inner_wrap container">
        <div className="container upload_container">
          <div className="drop-section container">
            <div className="col">
              <div className="cloud-icon">
                <Image className="cloud" src="/cloud.png" width={50} height={50} alt="Cloud" />
              </div>
              <span>Drag & Drop your files here</span>
              <span>OR</span>
              <button type="button" className="file-selector" onClick={() => {
                const fileInput = document.getElementById('file-input');
                if (fileInput) {
                  (fileInput as HTMLInputElement).click();
                }
              }}>
                Browse Files
              </button>
              <input
                id="file-input"
                type="file"
                style={{ display: 'none' }}
                onChange={(event) => {
                  const file = event.target.files[0];
                  if (file) {
                    setFile(file);
                  }
                }}
              />
              <div className="file-info">
                {file ? (
                  <p>{file.name} (Size: {Math.round(file.size / 1024)} KB)</p>
                ) : (
                  <p>No file selected</p>
                )}
              </div>

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
              <p className="p">Chọn máy in</p>
              <select
                className="form-control"
                onChange={(e) => {
                  const selectedPrinter = JSON.parse(e.target.value);
                  setPrinterId(selectedPrinter.printerId); // Assuming each printer object has an `id` field
                }}
              >
                <option value="">Chọn máy in</option>
                {AllPrinters.map((printer, index) => (
                  <option key={index} value={JSON.stringify(printer)}>
                    {`Địa điểm: ${printer.building} - ${printer.room}; Model: ${printer.model}; Brand: ${printer.brand}`} 
                  </option>
                ))}
              </select>
            </div>

              
              <div className="form-group col">
                <p className="p">Margin</p>
                <input type="number" className="form-control" id="so-ban" placeholder="Default"/>
              </div>
            </div>
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
            <div className="inner_submit">
            <button
              className="submit"
              onClick={async () => {
                console.log("Selected Printer ID:", printerId); // Log the printer ID
                const margin = (document.getElementById('so-ban') as HTMLInputElement).value;
                const copies = parseInt((document.getElementById('so-ban') as HTMLInputElement).value, 10);
                const paperSize = (document.getElementById('kho-giay') as HTMLSelectElement).value;
                const printType = (document.getElementById('kieu-in') as HTMLSelectElement).value;
                const paperOrientation = (document.getElementById('huong-giay') as HTMLSelectElement).value;
                
                let attribute = `margin=${margin};paperSize=${paperSize};printType=${printType};paperOrientation=${paperOrientation}`;
                
                if (!file){
                  alert('Please select a file to upload');
                  return;
                }
                if (!printerId){
                  alert('Please select a printer');
                  return;
                }
                if (!copies){
                  alert('Please enter the number of copies');
                  return;
                }
                let res = await uploadFiles(file, printerId, copies, attribute, userInfo.customerId);
                if (res){
                  console.log('Upload successful');
                  console.log('Response:', res);
                } else {
                  alert('Upload failed');
                }
              }}
            >
              SUBMIT
            </button>

            </div>
            
          </div>
      </div>
      <Script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js" />
      <Script src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"/>
    </main>
  );
}