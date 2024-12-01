import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('API Documentation') // Tiêu đề tài liệu API
    .setDescription('The API description') // Mô tả về API
    .setVersion('1.0') // Phiên bản API
    .addBearerAuth() // Thêm phương thức xác thực Bearer token (nếu cần)
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Thiết lập đường dẫn tài liệu API
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:8080'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });


  await app.listen(8080);
}
bootstrap();


// const app = await NestFactory.create(AppModule);

//   app.enableCors({

//     origin: 'http://localhost:3000',

//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',

//     credentials: true,

//   });