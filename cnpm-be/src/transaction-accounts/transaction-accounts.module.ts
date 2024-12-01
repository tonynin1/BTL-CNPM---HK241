/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { OnSiteAccountModule } from './on-site/on-site.module';
import { TransactionAccountsController } from './transaction-accounts.controller';
// import { PaymentOnsiteModule } from 'src/payment/services/database/payment-method/on-site/on-site.module';

@Module({
    controllers: [TransactionAccountsController],
    imports: [OnSiteAccountModule]
})
export class TransactionAccountsModule {}
