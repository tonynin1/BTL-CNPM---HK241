/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PaymentOrderDto } from './dtos/payment-order.dto';
import { PaymentOrderService } from './services/database/payment-order/order.service';
import { PaymentOfficeUpdateDto } from './dtos/payment.office-update.dto';

@Controller('payment')
export class PaymentController {
    constructor(private payment_order : PaymentOrderService) {}

    @Get('customerId=:customerId/purchaseTime=:purchaseTime')
    displayRecords(@Param('customerId') customerId : number, @Param('purchaseTime') purchaseTime : string) {
        return this.payment_order.display(+customerId, new Date(purchaseTime))
    }

    @Post('method=office')
    createRecordOffice(@Body() order_data : PaymentOrderDto) {
        return this.payment_order.createRecord(order_data, +order_data.customerId, "Office")
    }

    @Post('method=office/update-status')
    updateRecordOffice(@Body() data : PaymentOfficeUpdateDto) {
        return this.payment_order.updateRecord(data)
    }

    @Post('method=on-site')
    createRecordOnsite(@Body() order_data : PaymentOrderDto) {
        return this.payment_order.createRecord(order_data, +order_data.customerId, "Onsite")
    }
}
