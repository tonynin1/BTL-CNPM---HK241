import { Module } from '@nestjs/common';
import { ContainsController } from './contains.controller';
import { ContainsService } from './contains.service';

@Module({
  controllers: [ContainsController],
  providers: [ContainsService]
})
export class ContainsModule {}
