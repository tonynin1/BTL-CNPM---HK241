/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PaymentOnsiteService } from './on-site.service';

@Module({
  providers: [PaymentOnsiteService],
  exports: [PaymentOnsiteService],
})
export class PaymentOnsiteModule {}
