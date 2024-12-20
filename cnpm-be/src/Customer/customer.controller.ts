import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { createCustomerDto } from './dto';
import { User } from '@prisma/client';
import { GetCurrentUser, GetCurrentUserId } from 'src/auth/common/decorators';

@Controller('customer')
export class CustomerController {

    constructor(
        private customerService: CustomerService
    ){}

    @Get()
    getAllCustomers(){
        return this.customerService.getAllCustomers(); 
    }
    @Get('sum')
    getSumOfAllCustomers(){
        return this.customerService.getSumOfAllCustomers();
    }
    @Get('user')
    getAllCustomersWithUser(){
        return this.customerService.getAllCustomersWithUser();
    }

    @Get('userId')
    getCustomerByUserId(
        @Query('userId', ParseIntPipe) userId: number
    ){
        return this.customerService.getCustomerByUserId(userId);
    }

    @Get('customerId')
    getCustomerByCustomerId(
        @Query('customerId', ParseIntPipe) customerId: number
    ){
        return this.customerService.getCustomerByCustomerId(customerId);
    }

    @HttpCode(HttpStatus.OK)
    @Post('create')
    createCustomer(
        @GetCurrentUserId() userId: number,
        @Body() createDto: createCustomerDto
    ){
        console.log(userId);
        return this.customerService.createCustomer(userId,createDto);
    }

    @Patch('update')
    updateCustomer(
        @GetCurrentUserId() userId: number,
        @Body() createDto: createCustomerDto
    ){
        return this.customerService.updateCustomer(userId,createDto);
    }

    @Delete('delete')
    deleteCustomer(
        @Query('documentId', ParseIntPipe) documentId: number
    ){
        return this.customerService.deleteCustomer(documentId);
    }
}
