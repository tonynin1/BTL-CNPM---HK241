/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { OnSiteDepositDto } from './dtos/on-site.deposit.dto';
import { OnSiteAccountService } from './on-site/on-site.service';

@Controller('onsite-account')
export class TransactionAccountsController {
    constructor(private onsite_account : OnSiteAccountService) {}
    @Post('/deposit')
    async deposit(@Body() data : OnSiteDepositDto) {
        return await this.onsite_account.accountDeposit(data, +data.customerId)
    }

    @Get('/deposit/history')
    async getDepositHistory(@Query('customerId') customerId: string) {
        return await this.onsite_account.getDepositHistory(+customerId);
    }
    
    @Get('/balance')
    async getAccountBalance(@Param() customerId : number) {
        return await this.onsite_account.getAccountBalance(customerId)
    }
}
