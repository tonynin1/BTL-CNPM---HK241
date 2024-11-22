/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PaymentOrderService } from './services/database/payment-order/order.service';

@Injectable()
export class PaymentService {
    constructor(private prisma : PaymentOrderService) {}
}
