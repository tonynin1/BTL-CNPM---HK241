'use client';

import { useState } from "react";
import Image from "next/image";
import React from 'react';
import Script from 'next/script';

export default function Home() {
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
              <button type="button" className="file-selector">Browse Files</button>
              <input type="file" className="file-selector-input" multiple />
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
      <Script id="upload-script" strategy="lazyOnload">
      {`
        const dropArea = document.querySelector('.drop-section')
        const listSection = document.querySelector('.list-section')
        const listContainer = document.querySelector('.list')
        const fileSelector = document.querySelector('.file-selector')
        const fileSelectorInput = document.querySelector('.file-selector-input')

        // upload files with browse button
        fileSelector.onclick = () => fileSelectorInput.click()
        fileSelectorInput.onchange = () => {
            [...fileSelectorInput.files].forEach((file) => {
                if(typeValidation(file.type)){
                    uploadFile(file)
                }
            })
        }

        // when file is over the drag area
        dropArea.ondragover = (e) => {
            e.preventDefault();
            [...e.dataTransfer.items].forEach((item) => {
                if(typeValidation(item.type)){
                    dropArea.classList.add('drag-over-effect')
                }
            })
        }
        // when file leave the drag area
        dropArea.ondragleave = () => {
            dropArea.classList.remove('drag-over-effect')
        }
        // when file drop on the drag area
        dropArea.ondrop = (e) => {
            e.preventDefault();
            dropArea.classList.remove('drag-over-effect')
            if(e.dataTransfer.items){
                [...e.dataTransfer.items].forEach((item) => {
                    if(item.kind === 'file'){
                        const file = item.getAsFile();
                        if(typeValidation(file.type)){
                            uploadFile(file)
                        }
                    }
                })
            }else{
                [...e.dataTransfer.files].forEach((file) => {
                    if(typeValidation(file.type)){
                        uploadFile(file)
                    }
                })
            }
        }


        function typeValidation(type){
            return true
        }

        // upload file function
        function uploadFile(file){
            listSection.style.display = 'block'
            var li = document.createElement('li')
            li.classList.add('in-prog')
            li.innerHTML = \`
                <div className="col" style="display: flex; flex: .15; text-align: center; align-items: center; justify-content: center;">
                    <img className="logo" src="\${iconSelector(file.type)}"  style="height="40px" width="40px"" alt="">
                </div>
                <div className="col" style="flex: .75;  text-align: left; font-size: 0.9rem; color: white; padding: 8px 10px;">
                    <div className="file-name">
                        <div className="name">\${file.name}</div>
                        <span style="color: white; float: right;">0%</span>
                    </div>
                    <div className="file-progress" style="width: 100%; height: 5px; margin-top: 8px; border-radius: 8px; background-color: #dee6fd;">
                        <span style="display: block; width: 0%; height: 100%; border-radius: 8px; background-image: linear-gradient(120deg, #6b99fd, #9385ff); transition-duration: 0.4s;"></span>
                    </div>
                    <div className="file-size" style="font-size: 0.75rem; margin-top: 3px; color: white;">\${(file.size / (1024 * 1024)).toFixed(2)} MB</div>
                </div>
                <div className="col" style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis; max-width: 250px; display: inline-block;">
                    <svg xmlns="http://www.w3.org/2000/svg" style="fill: #8694d2; background-color: #dee6fd; position: relative; left: 50%; top: 50%; transform: translate(-50%, -50%); border-radius: 50%;" class="cross" height="20" width="20">
                        <path d="m5.979 14.917-.854-.896 4-4.021-4-4.062.854-.896 4.042 4.062 4-4.062.854.896-4 4.062 4 4.021-.854.896-4-4.063Z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" style="fill: #8694d2; background-color: #dee6fd; position: relative; left: 50%; top: 50%; transform: translate(-50%, -50%); border-radius: 50%; fill: #50a156; background-color: transparent;" class="tick" height="20" width="20">
                        <path d="m8.229 14.438-3.896-3.917 1.438-1.438 2.458 2.459 6-6L15.667 7Z"/>
                    </svg>
                </div>
            \`;
            listContainer.prepend(li)
            var http = new XMLHttpRequest()
            var data = new FormData()
            data.append('file', file)
            http.onload = () => {
                li.classList.add('complete')
                li.classList.remove('in-prog')
            }
            http.upload.onprogress = (e) => {
                var percent_complete = (e.loaded / e.total)*100
                li.querySelectorAll('span')[0].innerHTML = Math.round(percent_complete) + '%'
                li.querySelectorAll('span')[1].style.width = percent_complete + '%'
            }
            http.open('POST', '/app/sender.php', true)
            http.send(data)
            li.querySelector('.cross').onclick = () => http.abort()
            http.onabort = () => li.remove()
        }

        function iconSelector(type) {
            const iconMap = {
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx.png',
                'application/pdf': 'pdf.png',
                'image/jpeg': 'image.png',
                'image/png': 'image.png',
                'text/plain': 'text.png',

            };

            if (iconMap[type]) {
                return iconMap[type];
            }

            var splitType = type.split('/')[0];
            return splitType + '.png'; // default icon based on type
        }
      `}
    </Script>
      <Script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js" />
      <Script src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"/>
    </main>
  );
}