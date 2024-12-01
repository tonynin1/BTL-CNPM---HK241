/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PaymentOrderService } from './order.service';
import { PaymentOnsiteModule } from '../payment-method/on-site/on-site.module';
@Module({
  providers: [PaymentOrderService],
  exports: [PaymentOrderService],
  imports: [PaymentOnsiteModule],
})
export class PaymentOrderModule {}