import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createPrinterDto , updatePrinterDto} from './dto';

@Injectable()
export class PrinterService {
    constructor(
        private prisma: PrismaService
    ) {}

    async getAllPrinter() {
        try {
            
            return await this.prisma.printer.findMany();
        } catch (error) {
            return {
                message: 'Internal server error: ' + error.message,
                status: 500
            }
        }
    }

    async getallPrinterBySPSOMemberId(spsoMemberId: number) {
        try {
            const printers = await this.prisma.printer.findMany({
                where: {
                    spsomemberId: spsoMemberId
                }
            });
            return {
                data: printers,
                status: 200
            }
        } catch (error) {
            return {
                message: 'Internal server error: ' + error.message,
                status: 500
            }
        }
    }
    async getPrinterById(printerId: number) {
        try {
            const printer = await this.prisma.printer.findFirst({
                where: {
                    printerId: printerId
                }
            });
    
            if (!printer) {
                return {
                    message: 'Printer not found',
                    status: 404
                }
            }
            return {
                data: printer,
                status: 200
            }
            
        } catch (error) {
            return {
                message: 'Internal server error: ' + error.message,
                status: 500
            }
            
        }
    }

    async createPrinter(createPrinterDto: createPrinterDto) {
       
        try{
            const feedback = await this.prisma.printer.create({
                
                data: {
                    printerId: createPrinterDto.printerId,
                    model: createPrinterDto.model,
                    brand: createPrinterDto.brand,
                    description: createPrinterDto.description,
                    facility: createPrinterDto.facility,
                    building: createPrinterDto.building,
                    room: createPrinterDto.room,
                    spsomemberId: createPrinterDto.spsomemberId
                }
            });

            return {
                status: 200,
                message: 'Printer created',
            }
        }
        catch(error){
            return {
                status: 500,
                message: 'Internal server error: ' + error.message,
            }
        }
    }

    async updatePrinter(printerId: number, updateDto: updatePrinterDto) {

        try {
            await this.prisma.printer.update({
                where: {
                    printerId: printerId
                },
                data: {
                    building: updateDto.building,
                    facility: updateDto.facility,
                    room: updateDto.room,
                    spsomemberId: updateDto.spsomemberId,
                    status: updateDto.status
                }
            });
            return {
                message: 'Printer updated',
                status: 200
            }
        } catch (error) {
            return {
                message: 'Error updating Printer, error: ' + error.message,
                status: 500
            }
        }
    }
    async deletePrinter(printerId: number){

        try {
            await this.prisma.printer.delete({
                where: {
                    printerId: printerId
                }
            });
            return {
                message: 'Printer deleted',
                status: 200
            }
        } catch (error) {
            return {
                message: 'Error deleting printer, error: ' + error.message,
                status: 500
            }
        }

    }
}