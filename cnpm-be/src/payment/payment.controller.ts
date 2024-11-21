/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PaymentDto } from './dtos/payment.dto';
import { PrismaService } from './services/database/database.service';


@Controller('payment')
export class PaymentController {
    constructor(private prisma : PrismaService) {}

    @Get(':customerID')
    displayRecords(@Param('customerID') customerID : number,
                    @Param('purchaseTime') purchaseTime : Date) {
        return this.prisma.display(customerID, purchaseTime)
    }

    @Post()
    createRecord(@Body() data : PaymentDto) {
        this.prisma.createRecord(data)
    }

    @Post(':customerID')
    updateStatus(@Param('customerID') customerID : number,
                @Body() data : PaymentDto) {
        
        this.prisma.updateRecord(customerID, data)           
    }
}
