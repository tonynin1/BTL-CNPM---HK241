import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CustomerService {
    constructor(
        private prisma: PrismaService
    ) {}

    // async findCustomerById(userId: number) {
    //     const customer = await this.prisma.customer.findFirst({
    //         where: {
    //             userId: userId
    //         }
    //     });

    //     if (!customer) {
    //         return null;
    //     }
    //     return customer;
    // }
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
