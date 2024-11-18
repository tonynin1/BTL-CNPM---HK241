import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { createCustomerDto } from './dto';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';

@Controller('customer')
export class CustomerController {

    constructor(
        private customerService: CustomerService
    ){}

    @Get()
    getAllCustomers(){
        return this.customerService.getAllCustomers(); 
    }

    @Get('userId')
    getCustomerByUserId(
        @Query('userId') userId: number
    ){
        return this.customerService.getCustomerByUserId(userId);
    }

    @Get('customerId')
    getCustomerByCustomerId(
        @Query('customerId') customerId: number
    ){
        return this.customerService.getCustomerByCustomerId(customerId);
    }

    @UseGuards(JwtGuard)
    @Post('create')
    createCustomer(
        @GetUser('id') user: User,
        @Body() createDto: createCustomerDto
    ){
        console.log(user.userId);
        return this.customerService.createCustomer(user.userId,createDto);
    }

    @UseGuards(JwtGuard)
    @Patch('update')
    updateCustomer(
        @GetUser('id') user: User,
        @Body() createDto: createCustomerDto
    ){
        return this.customerService.updateCustomer(user.userId,createDto);
    }

}
