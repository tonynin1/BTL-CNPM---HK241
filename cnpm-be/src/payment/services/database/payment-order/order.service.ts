/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PaymentOrderDto } from 'src/payment/dtos/payment-order.dto';
import { PaymentOnsiteService } from '../payment-method/on-site/on-site.service';
import { PaymentOfficeUpdateDto } from 'src/payment/dtos/payment.office-update.dto';

const prisma = new PrismaClient();
@Injectable()
export class PaymentOrderService{
    constructor(private payment_onsite : PaymentOnsiteService) {}
    
    async createRecord(order_data : PaymentOrderDto, customerId : number, method : string) {
        let purchaseTimeISO: string;
        try {
            const purchaseTime = order_data.purchaseTime ? new Date(order_data.purchaseTime) : new Date();
            purchaseTimeISO = purchaseTime.toISOString();
        } catch (error) {
            console.error('Error:', error);
        }

        const current_page_num = await prisma.customer.findUnique({
            where: {
                customerId: customerId
            },
            select: {
                remainPages: true
            }
        })

        
        if(method == "Onsite") {
            const customer_balance = await this.payment_onsite.getSSPSBalance(customerId)
            if(customer_balance < order_data.price) {
                await prisma.pagePurchaseOrder.create({
                    data: {
                        purchaseTime: purchaseTimeISO,
                        customerId: customerId,
                        ppoStatus: "failed",
                        pageNum: +order_data.pageNum,
                        price: order_data.price,
                        paymentMethod: order_data.paymentMethod,
                    }
                });

                return {
                    status : "fail",
                    message : "Balance not enough"
                }
            }

            await prisma.customer.update({
                where: {
                    customerId: customerId
                },
                data: {
                    remainPages: current_page_num.remainPages + +order_data.pageNum
                }
            })

            await this.payment_onsite.updateSSPSBalance(order_data, customer_balance)

            await prisma.pagePurchaseOrder.create({
                data: {
                    purchaseTime: purchaseTimeISO,
                    customerId: customerId,
                    ppoStatus: "success",
                    pageNum: +order_data.pageNum,
                    price: order_data.price,
                    paymentMethod: order_data.paymentMethod,
                }
            });

            return {
                status : "success",
                message : "Successful purchase!"
            }
        }
        if(method == "Office") {
            await prisma.customer.update({
                where: {
                    customerId: customerId
                },
                data: {
                    remainPages: current_page_num.remainPages + +order_data.pageNum
                }
            }) 

            return await prisma.pagePurchaseOrder.create({
                data: {
                    purchaseTime: purchaseTimeISO,
                    customerId: customerId,
                    ppoStatus: order_data.ppoStatus,
                    pageNum: +order_data.pageNum,
                    price: order_data.price,
                    paymentMethod: order_data.paymentMethod,
                }
            });
        }
    }

    async updateRecord(data : PaymentOfficeUpdateDto) {
        return await prisma.pagePurchaseOrder.update({
            where: { ppoId: data.ppoId },
            data: {
                ppoStatus: data.ppoStatus,
            }
        });
    }
    
    async display(customerId: number, purchaseTime?: Date) {
        if (!purchaseTime || isNaN(purchaseTime.getTime())) {
            return await prisma.pagePurchaseOrder.findMany({
                where: {
                    customerId: +customerId
                },
                select: {
                    ppoId: true,
                    purchaseTime: true,
                    ppoStatus: true,
                    pageNum: true,
                    price: true,
                    paymentMethod: true
                }
            });
        } else {
            // Create start and end of the day in local timezone
            const startOfDay = new Date(purchaseTime);
            startOfDay.setHours(0, 0, 0, 0);
            
            const endOfDay = new Date(purchaseTime);
            endOfDay.setHours(23, 59, 59, 999);

            return await prisma.pagePurchaseOrder.findMany({
                where: {
                    customerId: +customerId,
                    purchaseTime: {
                        gte: startOfDay,
                        lte: endOfDay
                    }
                },
                select: {
                    ppoId: true,
                    purchaseTime: true,
                    ppoStatus: true,
                    pageNum: true,
                    price: true,
                    paymentMethod: true
                }
            });
        }
    }
}