import { Controller, Post, UploadedFiles, UseInterceptors, Body, Headers, BadRequestException } from '@nestjs/common';
import { FileUploadService } from './upload.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FileUploadDto } from './dto/file-upload.dto';
import { ApiOperation, ApiResponse, ApiConsumes, ApiBody, ApiBearerAuth } from '@nestjs/swagger';

@Controller('upload')
export class FileUploadController {
  constructor(
    private readonly fileUploadService: FileUploadService,

  ) {}

  @Post('')
  @ApiOperation({ summary: 'Create new print order and upload file' })
  @ApiResponse({ status: 201, description: 'Successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Only STUDENT account can create print order' })
  @ApiResponse({ status: 404, description: 'CustomerID not found or printerID not found' })
  @ApiBearerAuth() // Thêm Bearer Token cho Authorization
  @ApiConsumes('multipart/form-data') 
  @ApiBody({
    description: 'File upload and print order data',
    type: FileUploadDto,  
  })
  @UseInterceptors(FilesInterceptor('files')) 
  async uploadFiles(
    @UploadedFiles() files: Express.Multer.File[],     // Nhận các file upload
    @Body() fileUploadDto: FileUploadDto,              // Nhận thông tin khác như printerId, docQuantity từ body
  ) {
    // Kiểm tra file đã được upload chưa
    if (!files || files.length === 0) {
      throw new BadRequestException('No files uploaded');
    }
    return await this.fileUploadService.uploadFiles(files, fileUploadDto.attribute, fileUploadDto.customerId, fileUploadDto.printerId, fileUploadDto.docQuantity);
  }
}
