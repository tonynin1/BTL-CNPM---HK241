import { Module } from '@nestjs/common';
import { FileUploadController } from './upload.controller';
import { FileUploadService } from './upload.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'your-secret-key',  // Thêm secret key ở đây
      signOptions: { expiresIn: '1h' },  // Thêm thời gian hết hạn nếu cần
    }),
  ],
  controllers: [FileUploadController],
  providers: [FileUploadService],
})
export class FileUploadModule {}
