import { Controller, Get, Param, Post, Body, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { PrintHistoryService } from './print_history.service';
import { UpdatePrintRequestDto } from './dto/updateRequest';
import { CreatePrintRequestDto } from './dto/createRequest';

@Controller('print-history')
export class PrintHistoryController {
  constructor(private readonly printHistoryService: PrintHistoryService) {}

  @Get('request/:customerId') // tested
  async getPrintOrdersByCustomerId(@Param('customerId', ParseIntPipe) customerId: number) {
    return await this.printHistoryService.getPrintOrdersByCustomerId(customerId);
  }

  @Get('request/completed/:customerId') // tested
  async getPrintOrdersByCustomerIdThatCompleted(@Param('customerId', ParseIntPipe) customerId: number) {
    return await this.printHistoryService.getAllPrintOrdersByCustomerIdThatCompleted(customerId);
  }

  @Get('request/pending/:customerId') // tested
  async getPrintOrdersByCustomerIdThatPending(@Param('customerId', ParseIntPipe) customerId: number) {
    return await this.printHistoryService.getAllPrintOrdersByCustomerIdThatPending(customerId);
  }
  @Delete('request/delete/:customerId/:orderId') // tested, delete print order by customerId and orderId
  async deletePrintOrder(
    @Param('customerId', ParseIntPipe) customerId: number,
    @Param('orderId', ParseIntPipe) orderId: number,
  ) {
    return await this.printHistoryService.deletePrintOrder(customerId, orderId);
  }

  @Post('request/new') // tested
  async addPrintRequest(@Body() dto: CreatePrintRequestDto) {
    return await this.printHistoryService.addPrintRequest(dto);
  }

  @Put('request/:id') // tested, không chỉnh được customerId (không cần chỉnh)
  async updatePrintRequest(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePrintRequestDto,
  ) {
    return await this.printHistoryService.updatePrintRequest(id, dto);
  }

  @Delete('request/delete/:id') // tested, delete print order by id
  async deletePrintRequest(@Param('id', ParseIntPipe) id: number) {
    return await this.printHistoryService.deletePrintRequest(id);
  }

  @Get('page/:customerId')
  async getPagePurchaseOrdersByCustomerId(@Param('customerId', ParseIntPipe) customerId: number) {
    return await this.printHistoryService.getPagePurchaseOrdersByCustomerId(customerId);
  }

  @Delete('page/delete/:customerId/:orderId') 
  async deletePagePurchaseOrder(
    @Param('customerId', ParseIntPipe) customerId: number,
    @Param('orderId', ParseIntPipe) orderId: number,
  ) {
    return await this.printHistoryService.deletePagePurchaseOrder(customerId, orderId);
  }
}
