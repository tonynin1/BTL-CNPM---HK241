import { Module } from '@nestjs/common';
import { PrintHistoryService } from './print_history.service';
import { PrintHistoryController } from './print_history.controller';

@Module({
  providers: [PrintHistoryService],
  controllers: [PrintHistoryController]
})
export class PrintHistoryModule {}
