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
    printerIds: number[],    
    docQuantities: number[]  
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
        const docQuantity = docQuantities[i];  
        const printerId = printerIds[i];      

        // Upload file lên S3
        const uploadResult = await this.uploadFileToS3(file);
        const docName = file.originalname;    
        const docLink = uploadResult.Location; 

        // Tạo document để lưu vào DB
        const newDocument = await this.prisma.document.create({
          data: {
            docName: docName,  
            docLink: docLink,  
            customerId: Number(customerId),  
            printerId: Number(printerId),  
            docQuantity: Number(docQuantity),  
          },
        });

        documents.push(newDocument);  
        fileUrls.push(docLink);  
      }

      return { fileUrls, documents };  
    } catch (error) {
      throw new Error('File upload failed: ' + error.message);
    }
  }

  // Phương thức phụ trợ để upload file lên S3
  private async uploadFileToS3(file: Express.Multer.File): Promise<AWS.S3.ManagedUpload.SendData> {
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,  
      Key: `${Date.now()}-${file.originalname}`,  
      Body: file.buffer,  
      ContentType: file.mimetype,  
      ACL: 'public-read',  
    };

    try {
      const uploadResult = await this.s3.upload(params).promise();
      return uploadResult;  
    } catch (error) {
      throw new Error('S3 upload failed: ' + error.message);
    }
  }
}
