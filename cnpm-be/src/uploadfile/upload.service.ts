import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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
  async uploadFiles(
    files: Express.Multer.File[], 
    attribute: string, 
    customerId: number,
    printerId: number,
    docQuantity: number,

  ): Promise<any> {
    const fileUrls = [];
    const documents = [];
    try {
      customerId = Number(customerId);

      // check if remaining pages of customer is enough
      const customer = await this.prisma.customer.findFirst({
        where: { customerId: customerId },
      });

      if (!customer) {
        return {
          message: 'Customer not found',
          status: 404,
        }
      }
      if (customer && customer.remainPages < docQuantity) {
        return {
          message: 'Not enough pages to print',
          status: 400,
        }
      }
      else{
        await this.prisma.customer.update({
          where: { customerId: customerId },
          data: {
            remainPages: customer.remainPages - docQuantity,
          },
        });
      }
      const cusID = Number(customerId)
    for (let i = 0; i < 1; i++) {
      const file = files[0];
      const uploadResult = await this.uploadFileToS3(file);
      const docName = file.originalname;    
      const docLink = uploadResult.Location;

      const newDocument = await this.prisma.document.create({
        data: {
          docName: docName,  
          docLink: docLink,  
          customerId: Number(customerId),  
          docQuantity: Number(docQuantity),  
        },
      });
    const printOrder = await this.prisma.printOrder.create({
      data: {
        attributes: String(attribute),  
        startTime: new Date(),
        endTime: new Date(), 
        poStatus: 'Pending',
        printerId: Number(printerId),
        numCopies: Number(docQuantity), 
        customerId: Number(customerId),
        docId: Number(newDocument.documentId)
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


