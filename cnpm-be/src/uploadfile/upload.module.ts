import { Module } from '@nestjs/common';
import { FileUploadController } from './upload.controller';
import { FileUploadService } from './upload.service';



@Module({
  controllers: [FileUploadController],
  providers: [FileUploadService],
})
export class FileUploadModule {}


