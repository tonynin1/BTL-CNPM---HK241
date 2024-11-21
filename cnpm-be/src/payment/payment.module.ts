import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PrismaModule } from './services/database/database.module';
import { AccountModule } from './services/account/account.module';

@Module({
  providers: [PaymentService],
  controllers: [PaymentController],
  imports: [PrismaModule, AccountModule],
})
export class PaymentModule {}
