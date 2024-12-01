/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { OnSiteDepositDto } from './dtos/on-site.deposit.dto';
import { OnSiteAccountService } from './on-site/on-site.service';

@Controller('onsite-account')
export class TransactionAccountsController {
    constructor(private onsite_account : OnSiteAccountService) {}

    @Post('/deposit')
    async deposit(@Body() data : OnSiteDepositDto) {
        return await this.onsite_account.deposit(data)
    }
}
