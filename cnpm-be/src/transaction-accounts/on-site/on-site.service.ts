/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { OnSiteDepositDto } from '../dtos/on-site.deposit.dto';
// import { PaymentOnsiteService } from 'src/payment/services/database/payment-method/on-site/on-site.service';

@Injectable()
export class OnSiteAccountService extends PrismaClient {
    async accountDeposit(data : OnSiteDepositDto, customerId : number) {
        let depositTimeISO: string;
        try {
            const depositTime = data.depositTime ? new Date(data.depositTime) : new Date();
            depositTimeISO = depositTime.toISOString();
        } catch (error) {
            console.error('Error:', error);
        }
        await this.customer.update({
            where: {
                customerId: customerId
            },
            data: {
                accBalance: {
                    increment: data.amount
                }
            }
        })

        return await this.deposit.create({
            data: {
                depositTime: depositTimeISO,
                depositStatus: data.depositStatus,
                amount: data.amount,
                customerId: customerId
            }
        })
    }

    async getDepositHistory(customerId: number) {
        return await this.deposit.findMany({
            where: {
                customerId: customerId
            },
            select: {
                depositId: true,
                depositTime: true,
                depositStatus: true,
                amount: true
            }
        });
    }

    async getAccountBalance(customerId: number) {
        const data = await this.customer.findUnique({
            where: {
                customerId: customerId
            },
            select: {
                accBalance: true
            }
        })

        return data.accBalance
    }
}
