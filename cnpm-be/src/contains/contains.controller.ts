import { Body, Controller, Get, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ContainsService } from './contains.service';
import { create } from 'axios';
import { createContainsDto } from './dto';

@Controller('contains')
export class ContainsController {
    constructor(private containsService: ContainsService) {}

    @Get()
    async getAllContains() {
        return this.containsService.getAllContains();
    }

    @Get('id')
    async getContainsById(
        @Query('id', ParseIntPipe) id: number) {
        return this.containsService.getContainsById(id);
    }


    @Get('documentId')
    async getContainsByDocumentId(
        @Query('documentId', ParseIntPipe) documentId: number) {
        return this.containsService.getContainsByDocumentId(documentId);
    }

    @Get('printOrderId')
    async getContainsByOrderId(
        @Query('printOrderId', ParseIntPipe) printOrderId: number) {
        return this.containsService.getContainsByOrderId(printOrderId);
    }

    @Post('create')
    async createContains(
        @Body() createDto: createContainsDto) {
        return this.containsService.createContains(createDto);
    }

    @Patch('update')
    async updateContains(
        @Body() createDto: createContainsDto) {
        return this.containsService.updateContains(createDto);
    }

    @Post('delete')
    async deleteContains(
        @Query('id', ParseIntPipe) id: number) {
        return this.containsService.deleteContains(id);
    }
}
