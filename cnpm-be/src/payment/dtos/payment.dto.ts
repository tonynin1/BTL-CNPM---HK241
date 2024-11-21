/* eslint-disable prettier/prettier */
import { Prisma } from "@prisma/client";

export class PaymentDto {
    ppoId : number;
    purchaseTime : Date;
    customerId : number;
    ppoStatus : string;
    pageOrder : Prisma.InputJsonValue;
    price : number;
    paymentMethod : string
}