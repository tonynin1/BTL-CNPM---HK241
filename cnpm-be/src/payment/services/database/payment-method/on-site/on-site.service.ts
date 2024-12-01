/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PaymentOrderDto } from 'src/payment/dtos/payment-order.dto';

@Injectable()
export class PaymentOnsiteService extends PrismaClient {
    async getSSPSBalance(customerId: number): Promise<number> {
        const current_customer = await this.customer.findUnique({
            where: {
                customerId: customerId
            }
        })
        return current_customer.accBalance
    }

    async updateSSPSBalance(data : PaymentOrderDto, balance : number) : Promise<number> {
        const newBalance = balance - data.price
        const current_customer = await this.customer.update({
            where: {
                customerId : data.customerId
            },
            data: {
                accBalance : newBalance
            }
        })
        return current_customer.accBalance
    }
}
