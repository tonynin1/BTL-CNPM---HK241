import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PrintHistoryService {
    constructor(private prismaService: PrismaService) {}

    async getPrintOrdersByCustomerId(customerId: number) {
        const customerExists = await this.prismaService.customer.findUnique({
            where: { customerId },
        });
    
        if (!customerExists) {
            throw new NotFoundException(`Customer with ID ${customerId} does not exist`);
        }
        return await this.prismaService.printOrder.findMany({
            where: { customerId },
            include: {
                contains: {
                    include: {
                        document: true,
                    },
                },
            },
        });
    }
    
    async getPagePurchaseOrdersByCustomerId(customerId: number) {
        const customerExists = await this.prismaService.customer.findUnique({
            where: { customerId },
        });
    
        if (!customerExists) {
            throw new NotFoundException(`Customer with ID ${customerId} does not exist`);
        }
        return await this.prismaService.pagePurchaseOrder.findMany({
            where: { customerId },
            select: {
                ppoId: true,
                purchaseTime: true,
                pageNum: true,
                price: true,
                ppoStatus: true,
                paymentMethod: true,
            },
        });
    }

// Xóa lịch sử in
  async deletePrintOrder(customerId: number, orderId: number) {
    const printOrder = await this.prismaService.printOrder.findUnique({
      where: { printOrderId: orderId },
    });

    if (!printOrder) {
      throw new NotFoundException(`Print order with ID ${orderId} does not exist`);
    }

    if (printOrder.customerId !== customerId) {
      throw new HttpException(
        'You do not have permission to delete this print order',
        HttpStatus.FORBIDDEN,
      );
    }
    return await this.prismaService.printOrder.delete({
      where: { printOrderId: orderId },
    });
  }

  // Xóa lịch sử mua giấy
  async deletePagePurchaseOrder(customerId: number, orderId: number) {
    const pagePurchaseOrder = await this.prismaService.pagePurchaseOrder.findUnique({
      where: { ppoId: orderId },
    });

    if (!pagePurchaseOrder) {
      throw new NotFoundException(`Page purchase order with ID ${orderId} does not exist`);
    }

    if (pagePurchaseOrder.customerId !== customerId) {
      throw new HttpException(
        'You do not have permission to delete this page purchase order',
        HttpStatus.FORBIDDEN,
      );
    }
    return await this.prismaService.pagePurchaseOrder.delete({
      where: { ppoId: orderId },
    });
  }

    async addPrintRequest(dto: any) {
        const customerExists = await this.prismaService.customer.findUnique({
          where: { customerId: dto.customerId },
        });
        if (!customerExists) {
          throw new NotFoundException(`Customer with ID ${dto.customerId} does not exist`);
        }
        return await this.prismaService.printOrder.create({
          data: {
            attributes: dto.attributes,
            startTime: dto.startTime,
            endTime: dto.endTime,
            poStatus: dto.poStatus || 'Pending',
            numCopies: dto.numCopies,
            customerId: dto.customerId,
          },
        });
      }
    
      // Sửa yêu cầu in
      async updatePrintRequest(id: number, dto: any) {
        const printOrderExists = await this.prismaService.printOrder.findUnique({
          where: { printOrderId: id },
        });
        if (!printOrderExists) {
          throw new NotFoundException(`Print request with ID ${id} does not exist`);
        }
        return await this.prismaService.printOrder.update({
          where: { printOrderId: id },
          data: {
            attributes: dto.attributes,
            startTime: dto.startTime,
            endTime: dto.endTime,
            poStatus: dto.poStatus,
            numCopies: dto.numCopies,
          },
        });
      }
    
      // Xóa yêu cầu in
      async deletePrintRequest(id: number) {
        const printOrderExists = await this.prismaService.printOrder.findUnique({
          where: { printOrderId: id },
        });
        if (!printOrderExists) {
          throw new NotFoundException(`Print request with ID ${id} does not exist`);
        }
        return await this.prismaService.printOrder.delete({
          where: { printOrderId: id },
        });
      }
}
