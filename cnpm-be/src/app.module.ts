import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CustomerModule } from './customer/customer.module';
import { SpsomemberModule } from './spsomember/spsomember.module';
import { ConfigModule } from '@nestjs/config';
import { AtGuard } from './auth/common/guards';
import { APP_GUARD } from '@nestjs/core';
import { FeedbackService } from './feedback/feedback.service';
import { FeedbackModule } from './feedback/feedback.module';
import { PrinterModule } from './printer/printer.module';

@Module({
  imports: [
    PrismaModule, 
    UserModule, 
    AuthModule, 
    CustomerModule, 
    SpsomemberModule,
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    FeedbackModule,
    PrinterModule
  ],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: AtGuard,
    // },
    FeedbackService,
  ],
})
export class AppModule {}
