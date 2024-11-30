import { Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileUploadService } from './upload.service';  // Import service
import { FilesInterceptor } from '@nestjs/platform-express';  // Để sử dụng interceptor xử lý nhiều file

@Controller('upload')  // Định nghĩa route là '/upload'
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  // Định nghĩa route POST để upload file
  @Post()
  @UseInterceptors(FilesInterceptor('files'))  // 'files' là tên trường trong form-data
  async uploadFiles(@UploadedFiles() files: Express.Multer.File[]) {
    // Gọi phương thức uploadFiles trong service để upload các file lên S3
    const result = await this.fileUploadService.uploadFiles(files);

    // Trả về URL của các file đã upload lên S3
    return result;
  }
}
