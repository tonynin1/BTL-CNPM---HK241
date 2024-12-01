import { Controller, Post, UploadedFiles, UseInterceptors, Body } from '@nestjs/common';
import { FileUploadService } from './upload.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FileUploadDto } from './dto/file-upload.dto';

@Controller('upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}
  @Post()
  @UseInterceptors(FilesInterceptor('files'))  // 'files' là tên trường file trong form-data
  async uploadFiles(
  @UploadedFiles() files: Express.Multer.File[],  // Nhận các file upload
  @Body() fileUploadDto: FileUploadDto  // Nhận thông tin khác như customerId, printerId, docQuantity từ body
  ) {
    if (!files || files.length === 0) {
      throw new Error('No files uploaded');
    }
    const { customerId, printerId, docQuantities } = fileUploadDto;
    // Đảm bảo số lượng file và số lượng docQuantities phải khớp
    if (files.length !== docQuantities.length) {
      throw new Error('The number of docQuantities must match the number of uploaded files');
    }
    return this.fileUploadService.uploadFiles(files, customerId, printerId, docQuantities);
    }
}