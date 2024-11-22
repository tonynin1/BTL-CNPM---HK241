/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { OnSiteDepositDto } from '../dtos/on-site.deposit.dto';

@Injectable()
export class OnSiteAccountService extends PrismaClient {
    async deposit(data : OnSiteDepositDto) {
        return await this.customer.update({
            where: {
                customerId: data.customerId
            },
            data: {
                accBalance: {
                    increment: data.amount
                }
            }
        })
    }
}
