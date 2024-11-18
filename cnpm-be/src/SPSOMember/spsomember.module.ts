import { Module } from '@nestjs/common';
import { SpsomemberController } from './spsomember.controller';
import { SpsomemberService } from './spsomember.service';

@Module({
  controllers: [SpsomemberController],
  providers: [SpsomemberService]
})
export class SpsomemberModule {}
