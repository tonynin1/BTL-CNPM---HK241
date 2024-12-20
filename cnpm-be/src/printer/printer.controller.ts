import { Body, Controller, Delete, Get, ParseIntPipe, Param, Patch, Post, Query } from '@nestjs/common';
import { PrinterService } from './printer.service';
import { createPrinterDto, updatePrinterDto } from './dto';

@Controller('printer')
export class PrinterController {
    constructor(
        private printerService: PrinterService
    ){}

    @Get()
    getAllPrinters(){
        return this.printerService.getAllPrinter(); 
    }

    @Get('printerId/:printerId')
    getPrinterbyId(
        @Param('printerId', ParseIntPipe) printerId: number
    ){
        return this.printerService.getPrinterById(printerId);
    }

    @Get('available')
    getAllPrintersThatIsAvailable(){
        return this.printerService.getAllPrintersThatIsAvailable();
    }
    
    @Get('spsoMemberId/:spsoMemberId')
    getPrintersBySPSOMemberId(
        @Param('spsoMemberId', ParseIntPipe) spsoMemberId: number
    ){
        return this.printerService.getallPrinterBySPSOMemberId(spsoMemberId);
    }

    @Post('create')
    async createPrinter(@Body() createPrinterDto: createPrinterDto ) {
        return this.printerService.createPrinter(createPrinterDto);
    }

    @Patch('update/:printerId')
    async updatePrinter(@Param('printerId', ParseIntPipe) printerId: number,@Body() updatePrinterDto: updatePrinterDto) {
        return this.printerService.updatePrinter(printerId, updatePrinterDto);
    }

    @Delete('delete/:printerId')
    async deletePrinter(@Param('printerId', ParseIntPipe) printerId: number) {
        return this.printerService.deletePrinter(printerId);
    }
}
