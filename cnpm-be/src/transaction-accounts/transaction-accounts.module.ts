/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { OnSiteAccountModule } from './on-site/on-site.module';
import { TransactionAccountsController } from './transaction-accounts.controller';

@Module({
    controllers: [TransactionAccountsController],
    imports: [OnSiteAccountModule]
})
export class TransactionAccountsModule {}
