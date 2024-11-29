/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { OnSiteAccountService } from './on-site.service';

@Module({
  providers: [OnSiteAccountService],
  exports: [OnSiteAccountService],
})
export class OnSiteAccountModule {}
