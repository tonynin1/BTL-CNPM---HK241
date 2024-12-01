import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FileUploadService {
  private s3: AWS.S3;

  constructor(
    private readonly prisma: PrismaService,
  ) {
    this.s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });
  }

  // Phương thức upload file
  async uploadFiles(
    files: Express.Multer.File[], 
    customerId: number,
    printerIds: number[],    // Mảng các printerId tương ứng với các file
    docQuantities: number[]  // Mảng số lượng tài liệu tương ứng với các file
  ): Promise<any> {
    const fileUrls = [];
    const documents = [];
  
    try {
      if (!customerId) {
        throw new UnauthorizedException('Invalid token or missing customerId in token');
      }
      if (files.length !== docQuantities.length || files.length !== printerIds.length) {
        throw new Error('The number of uploaded files must match docQuantities and printerIds');
      }

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const docQuantity = docQuantities[i];  // Lấy số lượng tài liệu cho file này
        const printerId = printerIds[i];      // Lấy printerId tương ứng

        // Upload file lên S3
        const uploadResult = await this.uploadFileToS3(file);
        const docName = file.originalname;    // Tên file từ local
        const docLink = uploadResult.Location; // URL của file trên S3

        // Tạo document để lưu vào DB
        const newDocument = await this.prisma.document.create({
          data: {
            docName: docName,  // Tên file
            docLink: docLink,  // URL của file
            customerId: Number(customerId),  // Lưu customerId từ token
            printerId: Number(printerId),  // Lưu printerId
            docQuantity: Number(docQuantity),  // Lưu số lượng tài liệu
          },
        });

        documents.push(newDocument);  // Thêm vào danh sách các document đã tạo
        fileUrls.push(docLink);  // Thêm vào danh sách các URL file đã upload
      }

      return { fileUrls, documents };  // Trả về danh sách URL và documents đã tạo
    } catch (error) {
      throw new Error('File upload failed: ' + error.message);
    }
  }

  // Phương thức phụ trợ để upload file lên S3
  private async uploadFileToS3(file: Express.Multer.File): Promise<AWS.S3.ManagedUpload.SendData> {
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,  // Tên bucket S3 của bạn
      Key: `${Date.now()}-${file.originalname}`,  // Tên file khi upload lên S3 (bao gồm timestamp để tránh trùng tên)
      Body: file.buffer,  // Nội dung file
      ContentType: file.mimetype,  // Kiểu file (image/jpeg, application/pdf, ...)
      ACL: 'public-read',  // Quyền truy cập cho file (có thể thay đổi tùy theo yêu cầu)
    };

    try {
      const uploadResult = await this.s3.upload(params).promise();
      return uploadResult;  // Trả về kết quả upload
    } catch (error) {
      throw new Error('S3 upload failed: ' + error.message);
    }
  }
}
