import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { PrintHistoryService } from './print_history.service';
import { UpdatePrintRequestDto } from './dto/updateRequest';
import { CreatePrintRequestDto } from './dto/createRequest';

@Controller('print-history')
export class PrintHistoryController {
  constructor(private readonly printHistoryService: PrintHistoryService) {}

  @Get('print/:customerId')
  async getPrintOrdersByCustomerId(@Param('customerId') customerId: number) {
    return await this.printHistoryService.getPrintOrdersByCustomerId(customerId);
  }

  @Get('page/:customerId')
  async getPagePurchaseOrdersByCustomerId(@Param('customerId') customerId: number) {
    return await this.printHistoryService.getPagePurchaseOrdersByCustomerId(customerId);
  }

  @Delete('print-history/delete/:customerId/:orderId')
  async deletePrintOrder(
    @Param('customerId') customerId: number,
    @Param('orderId') orderId: number,
  ) {
    return await this.printHistoryService.deletePrintOrder(customerId, orderId);
  }

  @Delete('page-history/delete/:customerId/:orderId')
  async deletePagePurchaseOrder(
    @Param('customerId') customerId: number,
    @Param('orderId') orderId: number,
  ) {
    return await this.printHistoryService.deletePagePurchaseOrder(customerId, orderId);
  }

  @Post('request/new')
  async addPrintRequest(@Body() dto: CreatePrintRequestDto) {
    return await this.printHistoryService.addPrintRequest(dto);
  }

  @Put('request/:id')
  async updatePrintRequest(
    @Param('id') id: number,
    @Body() dto: UpdatePrintRequestDto,
  ) {
    return await this.printHistoryService.updatePrintRequest(id, dto);
  }

  @Delete('request/delete/:id')
  async deletePrintRequest(@Param('id') id: number) {
    return await this.printHistoryService.deletePrintRequest(id);
  }

}
