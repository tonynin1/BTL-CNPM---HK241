import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PrintHistoryService {
    constructor(private prismaService: PrismaService) {}

    // get sum of all number of copies of all print orders
    // get sum of all number of copies of all print orders
    async getSumOfAllPrintOrders() {
      try {
          const allPrintOrders = await this.prismaService.printOrder.findMany();
          const sum = allPrintOrders.reduce((acc, cur) => {
              // Chỉ tính nếu `numCopies` là số hoặc có thể chuyển thành số
              const numCopies = Number(cur.numCopies);
              return isNaN(numCopies) ? acc : acc + numCopies;
          }, 0);
          return sum;
  
      } catch (error) {
          return {
              message: 'Internal server error: ' + error.message,
              status: 500
          };
      }
    }

    // Get by printOrderId
    async getPrintOrderById(printOrderId: number) {
        try {
            const res = await this.prismaService.printOrder.findUnique({
                where: { printOrderId },
                include: {
                    contains: {
                        include: {
                            document: true,
                        },
                    },
                },
            });
            const printer = await this.prismaService.printer.findUnique({
                where: { printerId: res.printerId },
            });
            return {
                status: 200,
                data: {
                    res,
                    printer,
                }
            }
        } catch (error) {
            return {
                message: 'Internal server error: ' + error.message,
                status: 500
            }
        }
    }
    // get all print orders that are pending by printerId
    async getPrintOrdersByPrinterId(printerId: number) {
        try {
            const res = await this.prismaService.printOrder.findMany({
                where: { printerId, poStatus: 'Pending' },
                include: {
                    contains: {
                        include: {
                            document: true,
                        },
                    },
                },
            });
            return {
                status: 200,
                data: res
            }
        } catch (error) {
            return {
                message: 'Internal server error: ' + error.message,
                status: 500
            }
        }
    }
    // get all Print Orders by Customer ID that is completed
    async getAllPrintOrdersByCustomerIdThatCompleted(customerId: number) {
        try {
            const res = await this.prismaService.printOrder.findMany({
                where: { customerId : customerId, poStatus: 'Completed' },
                include: {
                    contains: {
                        include: {
                            document: true,
                        },
                    },
                },
            });

            // get information of printer
            const resWithPrinter = await Promise.all(res.map(async (order) => {
                const printer = await this.prismaService.printer.findUnique({
                    where: { printerId: order.printerId },
                });
                return { ...order, printer };
            }));
            return {
                status: 200,
                data: resWithPrinter
            }
            
        } catch (error) {
            return {
                message: 'Internal server error: ' + error.message,
                status: 500
            }
        }
    }

    // get all Print Orders by Customer ID that is pending
    async getAllPrintOrdersByCustomerIdThatPending(customerId: number) {
        try {
            const res = await this.prismaService.printOrder.findMany({
              where: { customerId: customerId, poStatus: 'Pending' },
              include: {
                contains: {
                  include: {
                    document: true,
                  },
                },
              },
              orderBy: {
                startTime: 'asc',
              },
            })

            // get information of printer
            const resWithPrinter = await Promise.all(res.map(async (order) => {
                const printer = await this.prismaService.printer.findUnique({
                    where: { printerId: order.printerId },
                });
                return { ...order, printer };
            }));
            return {
                status: 200,
                data: resWithPrinter

            }
        } catch (error) {
            return {
                message: 'Internal server error: ' + error.message,
                status: 500
            }
        }
    }
    async getPrintOrdersByCustomerId(customerId: number) {
      try {
        
        const customerExists = await this.prismaService.customer.findUnique({
            where: { customerId },
        });
    
        if (!customerExists) {
            throw new NotFoundException(`Customer with ID ${customerId} does not exist`);
        }
        const res = await this.prismaService.printOrder.findMany({
            where: { customerId },
            include: {
                contains: {
                    include: {
                        document: true,
                    },
                },
            },
        });

        return {
          status: 200,
          data: res
        }
      } catch (error) {
        return {
          message: 'Internal server error: ' + error.message,
          status: 500
        }
      }
    }
    
    async getPagePurchaseOrdersByCustomerId(customerId: number) {
      try {
        const customerExists = await this.prismaService.customer.findUnique({
            where: { customerId },
        });
    
        if (!customerExists) {
            throw new NotFoundException(`Customer with ID ${customerId} does not exist`);
        }
        const res = await this.prismaService.pagePurchaseOrder.findMany({
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

        if (!res) {
          return {
            message: 'No page purchase orders found',
            status: 404
          }
        }

        return {
          status: 200,
          data: res
        }
        
      } catch (error) {
        return {
          message: 'Internal server error: ' + error.message,
          status: 500
        }
        
      }
    }

// Xóa lịch sử in
  async deletePrintOrder(customerId: number, orderId: number) {
    try {
      const printOrder = await this.prismaService.printOrder.findUnique({
        where: { printOrderId: orderId },
      });
  
      if (!printOrder) {
        return {
          message: `Print order with ID ${orderId} not found`,
          status: 404
        }
      }
  
      if (printOrder.customerId !== customerId) {
        return {
          message: 'You do not have permission to delete this print order',
          status: 403
        }
      }

      await this.prismaService.printOrder.delete({
        where: { printOrderId: orderId },
      });
      
      return {
        status: 200,
        message: 'Print order deleted successfully'
      }
    } catch (error) {
      return {
        message: 'Internal server error: ' + error.message,
        status: 500
      }
      
    }
  }

  // Xóa lịch sử mua giấy
  async deletePagePurchaseOrder(customerId: number, orderId: number) {
    try {
      const pagePurchaseOrder = await this.prismaService.pagePurchaseOrder.findUnique({
        where: { ppoId: orderId },
      });
  
      if (!pagePurchaseOrder) {
        return {
          message: `Page purchase order with ID ${orderId} does not exist`,
          status: 404
        }
      }
  
      if (pagePurchaseOrder.customerId !== customerId) {
        return {
          message: 'You do not have permission to delete this page purchase order',
          status: 403
        }
      }
      return await this.prismaService.pagePurchaseOrder.delete({
        where: { ppoId: orderId },
      });
      
    } catch (error) {
      return {
        message: 'Internal server error: ' + error.message,
        status: 500
      }
      
    }
  }

    async addPrintRequest(dto: any) {
      try {

        // check if remaining pages is enough
        const customer = await this.prismaService.customer.findUnique({
          where: { customerId: dto.customerId },
        });
        
        if (customer.remainPages < dto.numCopies) {
          return {
            message: 'Not enough pages to print',
            status: 400
          }
        }
        else {
          await this.prismaService.customer.update({
            where: { customerId: dto.customerId },
            data: {
              remainPages: {
                decrement: dto.numCopies,
              },
            },
          });
        }
        const create = await this.prismaService.printOrder.create({
          data: {
            attributes: dto.attributes,
            startTime: new Date(),
            endTime: new Date(new Date().setDate(new Date().getDate() + 7)),
            poStatus: dto.poStatus || 'Pending',
            numCopies: dto.numCopies,
            customerId: dto.customerId,
            docId: dto.docId,
            printerId: dto.printerId,
          },
        });
        return {
          message: 'Print request created successfully',
          status: 200,
        }
        
      } catch (error) {
        return {
          message: 'Internal server error: ' + error.message,
          status: 500
        }
        
      }
      }
    
      // Sửa yêu cầu in
      async updatePrintRequest(id: number, dto: any) {
        try {
          const printOrderExists = await this.prismaService.printOrder.findUnique({
            where: { printOrderId: id },
          });
          if (!printOrderExists) {
            // throw new NotFoundException(`Print request with ID ${id} does not exist`);
            return {
              message: `Print request with ID ${id} does not exist`,
              status: 404
            }
          }
          const res = await this.prismaService.printOrder.update({
            where: { printOrderId: id },
            data: {
              attributes: dto.attributes,
              startTime: dto.startTime,
              endTime: dto.endTime,
              poStatus: dto.poStatus,
              numCopies: dto.numCopies,
            },
          });

          return {
            message: 'Print request updated successfully',
            status: 200,
            data: res
            
          }
          
        } catch (error) {
          return {
            message: 'Internal server error: ' + error.message,
            status: 500
          }
          
        }
      }
    
      // Xóa yêu cầu in
      async deletePrintRequest(id: number) {
        try {
          const printOrderExists = await this.prismaService.printOrder.findUnique({
            where: { printOrderId: id },
          });
          if (!printOrderExists) {
            // throw new NotFoundException(`Print request with ID ${id} does not exist`);
            return {
              message: `Print request with ID ${id} does not exist`,
              status: 404
            }
          }
          // find the customer owning the print order
          const customerId = printOrderExists.customerId;

          // give customer the remain pages back
          await this.prismaService.customer.update({
            where: { customerId },
            data: {
              remainPages: {
                increment: printOrderExists.numCopies,
              },
            },
          })
          await this.prismaService.printOrder.delete({
            where: { printOrderId: id },
          });
          
          return {
            message: 'Print request deleted successfully',
            status: 200
          }
        } catch (error) {
          return {
            message: 'Internal server error: ' + error.message,
            status: 500
          }
          
        }
      }
}
