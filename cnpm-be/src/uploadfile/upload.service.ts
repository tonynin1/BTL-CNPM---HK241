import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class FileUploadService {
  private s3: AWS.S3;

  constructor() {
    // Khởi tạo AWS S3 client
    this.s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });
  }

  // Xử lý upload nhiều file lên S3 và trả về URL của các file
  async uploadFiles(files: Express.Multer.File[]): Promise<any> {
    const fileUrls = [];

    for (const file of files) {
      // Upload file lên S3 và lấy URL của file
      const uploadResult = await this.uploadFileToS3(file);
      
      // Thêm URL của file vào mảng fileUrls
      fileUrls.push(uploadResult.Location);
    }

    return { fileUrls };
  }

  // Hàm upload file lên S3 và trả về kết quả
  private async uploadFileToS3(file: Express.Multer.File) {
    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${Date.now()}-${file.originalname}`, // Tạo tên file duy nhất
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read',  // Đảm bảo file có thể truy cập công khai
    };

    // Upload file lên S3 và trả về kết quả
    return this.s3.upload(uploadParams).promise();
  }
}
