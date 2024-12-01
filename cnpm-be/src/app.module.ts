import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { PaymentModule } from './payment/payment.module';
import { TransactionAccountsModule } from './transaction-accounts/transaction-accounts.module';

import { AuthModule } from './auth/auth.module';
import { CustomerModule } from './customer/customer.module';
import { SpsomemberModule } from './spsomember/spsomember.module';
import { ConfigModule } from '@nestjs/config';
import { AtGuard } from './auth/common/guards';
import { APP_GUARD } from '@nestjs/core';
import { PrintHistoryModule } from './print_history/print_history.module';
import { FeedbackService } from './feedback/feedback.service';
import { FeedbackModule } from './feedback/feedback.module';
import { FileUploadModule } from './uploadfile/upload.module';
import { PrinterModule } from './printer/printer.module';
import { DocumentController } from './document/document.controller';
import { DocumentService } from './document/document.service';
import { DocumentModule } from './document/document.module';
import { ContainsModule } from './contains/contains.module';

@Module({
  imports: [
    PrismaModule, 
    UserModule, 
    AuthModule, 
    FileUploadModule,
    CustomerModule,
    PaymentModule,
    TransactionAccountsModule,
    SpsomemberModule,
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    PrinterModule,
    PrintHistoryModule,
    FeedbackModule,
    DocumentModule,
    ContainsModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
    FeedbackService,
    DocumentService,
  ],
  controllers: [DocumentController],
})
export class AppModule {}
