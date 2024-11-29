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

@Module({
  imports: [
    PrismaModule, 
    UserModule, 
    AuthModule, 
    CustomerModule,
    PaymentModule,
    TransactionAccountsModule,
    SpsomemberModule,
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    PrintHistoryModule
    FeedbackModule
  ],
  controllers: [AppController],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: AtGuard,
    // },
    FeedbackService,
    AppService
  ],
})
export class AppModule {}
