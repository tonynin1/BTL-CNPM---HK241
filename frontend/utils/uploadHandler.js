export function initializeUploadScript() {
    window.onload = () => {
      const dropArea = document.querySelector('.drop-section');
      const listSection = document.querySelector('.list-section');
      const listContainer = document.querySelector('.list');
      const fileSelector = document.querySelector('.file-selector');
      const fileSelectorInput = document.querySelector('.file-selector-input');
  
      if (!dropArea || !listSection || !listContainer || !fileSelector || !fileSelectorInput) {
        console.error("One or more elements were not found in the DOM.");
        return;
      }
  
      // Upload files with browse button
      fileSelector.onclick = () => fileSelectorInput.click();
      fileSelectorInput.onchange = () => {
        [...fileSelectorInput.files].forEach((file) => {
          if (typeValidation(file.type)) {
            uploadFile(file);
          }
        });
      };
  
      // Drag and drop handling
      dropArea.ondragover = (e) => {
        e.preventDefault();
        [...e.dataTransfer.items].forEach((item) => {
          if (typeValidation(item.type)) {
            dropArea.classList.add('drag-over-effect');
          }
        });
      };
      dropArea.ondragleave = () => {
        dropArea.classList.remove('drag-over-effect');
      };
      dropArea.ondrop = (e) => {
        e.preventDefault();
        dropArea.classList.remove('drag-over-effect');
        if (e.dataTransfer.items) {
          [...e.dataTransfer.items].forEach((item) => {
            if (item.kind === 'file') {
              const file = item.getAsFile();
              if (typeValidation(file.type)) {
                uploadFile(file);
              }
            }
          });
        } else {
          [...e.dataTransfer.files].forEach((file) => {
            if (typeValidation(file.type)) {
              uploadFile(file);
            }
          });
        }
      };
  
      function typeValidation(type) {
        const validTypes = [
          'application/pdf',
          'image/jpeg',
          'image/png',
          'text/plain',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ];
        return validTypes.includes(type);
      }
  
      function uploadFile(file) {
        listSection.style.display = 'block';
        var li = document.createElement('li');
        li.classList.add('in-prog');
        li.innerHTML = `
          <div class="col" style="display: flex; flex: .15; text-align: center; align-items: center; justify-content: center;">
            <img src="../${iconSelector(file.type)}" style="height: 40px; width: 40px;" alt="">
          </div>
          <div class="col" style="flex: .75; text-align: left; font-size: 0.9rem; color: white; padding: 8px 10px;">
            <div class="file-name">
              <div class="name">${file.name}</div>
              <span style="color: white; float: right;">0%</span>
            </div>
            <div class="file-progress" style="width: 100%; height: 5px; margin-top: 8px; border-radius: 8px; background-color: #dee6fd;">
              <span style="display: block; width: 0%; height: 100%; border-radius: 8px; background-image: linear-gradient(120deg, #6b99fd, #9385ff); transition-duration: 0.4s;"></span>
            </div>
            <div class="file-size" style="font-size: 0.75rem; margin-top: 3px; color: white;">${(file.size / (1024 * 1024)).toFixed(2)} MB</div>
          </div>
          <div class="col" style="max-width: 300px; display: inline-block; position: relative;">
            <svg xmlns="http://www.w3.org/2000/svg" style="fill: #8694d2; background-color: #dee6fd; position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); border-radius: 50%; fill: #50a156; background-color: transparent;" class="tick" height="20" width="20">
              <path d="m8.229 14.438-3.896-3.917 1.438-1.438 2.458 2.459 6-6L15.667 7Z"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" style="fill: #8694d2; background-color: #dee6fd; position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); border-radius: 50%; cursor: pointer;" class="cross" height="20" width="20">
              <path d="m5.979 14.917-.854-.896 4-4.021-4-4.062.854-.896 4.042 4.062 4-4.062.854.896-4 4.062 4 4.021-.854.896-4-4.063Z"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" style="fill: #8694d2; background-color: red; position: absolute; left: 150%; top: 50%; transform: translate(-50%, -50%); border-radius: 50%; cursor: pointer;" class="delete" height="20" width="20">
              <path d="m5.979 14.917-.854-.896 4-4.021-4-4.062.854-.896 4.042 4.062 4-4.062.854.896-4 4.062 4 4.021-.854.896-4-4.063Z"/>
            </svg>
          </div>
        `;
        listContainer.prepend(li);
        var http = new XMLHttpRequest();
        var data = new FormData();
        data.append('file', file);
        http.onload = () => {
          li.classList.add('complete');
          li.classList.remove('in-prog');
        };
        http.upload.onprogress = (e) => {
          var percent_complete = (e.loaded / e.total) * 100;
          li.querySelectorAll('span')[0].innerHTML = Math.round(percent_complete) + '%';
          li.querySelectorAll('span')[1].style.width = percent_complete + '%';
        };
        http.open('POST', 'http://localhost:8080/upload');
        http.send(data);
        li.querySelector('.cross').onclick = () => http.abort();
        li.querySelector('.delete').onclick = () => {
          http.abort();
          li.remove();
        };
  
        http.onabort = () => li.remove();
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
        return splitType + '.png'; // Default icon based on type
      }
    };
  }
  