import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PaymentOrderModule } from './services/database/payment-order/order.module';

@Module({
  providers: [PaymentService],
  controllers: [PaymentController],
  imports: [PaymentOrderModule],
})
export class PaymentModule {}
