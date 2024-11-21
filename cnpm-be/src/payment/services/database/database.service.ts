/* eslint-disable prettier/prettier */
import { Body, Injectable, Param } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PaymentDto } from 'src/payment/dtos/payment.dto';

@Injectable()
export class PrismaService extends PrismaClient {
    async createRecord(@Body() data : PaymentDto) {
        return await this.pagePurchaseOrder.create({
            data : {
                ppoId : data.ppoId,
                purchaseTime : data.purchaseTime,
                customerId : data.customerId,
                ppoStatus : data.ppoStatus,
                pageOrder : data.pageOrder,
                price : data.price,
                paymentMethod : data.paymentMethod
            }
        })
    }

    async updateRecord(@Param('customerId') customerId: number, @Body() data: PaymentDto) {
        if(data.paymentMethod == "Office") {
            return await this.pagePurchaseOrder.update({
                where: { ppoId: customerId },
                data: {
                    ppoStatus: data.ppoStatus,
                }
            });
        }

        

    }
    async display(@Param('customerId') customerId: number, @Param('purchaseTime') purchaseTime: Date) {
        if(purchaseTime == null) {
            return await this.pagePurchaseOrder.findMany({
                where: {
                    customerId : customerId
                }
            })
        }

        if(purchaseTime != null) {
            return await this.pagePurchaseOrder.findMany({
                where: {
                    customerId : customerId,
                    purchaseTime : purchaseTime
                }
            })
        }
    }
}