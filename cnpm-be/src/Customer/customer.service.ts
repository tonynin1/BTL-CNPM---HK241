import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { craeteCustomerDto } from './dto';

@Injectable()
export class CustomerService {
    constructor(
        private prisma: PrismaService
    ) {}

    async getAllCustomers() {
        return await this.prisma.customer.findMany();
    }

    async getCustomerByUserId(userId: number) {
        const cus = await this.prisma.customer.findFirst({
            where: {
                userId: userId
            }
        });

        if (!cus) {
            return {
                message: 'Customer not found',
                status: 404
            }
        }
        return {
            data: cus,
            status: 200
        }
    }

    async getCustomerByCustomerId(customerId: number) {
        const cus = await this.prisma.customer.findUnique({
            where: {
                customerId: customerId
            }
        });

        if (!cus) {
            return {
                message: 'Customer not found',
                status: 404
            }
        }
        return {
            data: cus,
            status: 200
        }
    }

    async createCustomer(userId: number, createDto: craeteCustomerDto) {
        const findCustomer = await this.prisma.customer.findFirst({
            where: {
                userId: userId
            }
        });

        if (findCustomer) {
            return {
                message: 'Customer already exists',
                status: 400
            }
        }
        try {
            await this.prisma.customer.create({
                data: {
                    ppHistory: createDto.ppHistory ? createDto.ppHistory.join(', ') : '',
                    accBalance: createDto.accBalance,
                    summary: createDto.summary,
                    remainPages: createDto.remainPages,
                    spsoMemberId: createDto.spsoMemberId
                }
            });
            return {
                message: 'Customer created',
                status: 201
            }
        } catch (error) {
            return {
                message: error.message,
                status: 500
            }
        }
    }
    async deleteCustomer(userId: number){
        let findCustomer = await this.prisma.customer.findFirst({
            where: {
                userId: userId
            }
        });

        if(!findCustomer){
            return { message: 'Customer not found' , status: 404};
        }
        try {
            await this.prisma.customer.delete({
                where: {
                    customerId: findCustomer.customerId
                }
            });
            return { message: 'Customer deleted' , status: 200};
        } catch (error) {
            return { message: 'Error deleting customer' , status: 500};
        }
    }
}
