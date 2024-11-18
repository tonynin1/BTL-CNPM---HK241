import { Body, Controller, Get, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { SpsomemberService } from './spsomember.service';
import { GetUser } from 'src/auth/decorator';
import { createSPSOMember } from './dto';
import { updateSPSOMember } from './dto';
import { JwtGuard } from 'src/auth/guard';
import { User } from '@prisma/client';
import { create } from 'domain';

@Controller('spsomember')
export class SpsomemberController {
    constructor(private spsomemberService: SpsomemberService) {}


    // Find all SPSO member
    // Remove Auth for this route

    @Get()
    async findAllSPSOMember() {
        return this.spsomemberService.findAllSPSOMember();
    }

    @Get('userId')
    async findSPSOMemberByUserId(
        @Query('userId') userId: string
    ) {
        let userIdNumber = parseInt(userId);
        return this.spsomemberService.findSPSOMemberByUserId(userIdNumber);
    }

    @Get('spsoId')
    async findSPSOMemberBySPSOId(
        @Query('spsoId') spsoId: string
    ) {
        let spsoIdNumber = parseInt(spsoId);
        return this.spsomemberService.findSPSOMemberBySPSOId(spsoIdNumber);
    }
    // Create SPSO member from userId
    @UseGuards(JwtGuard)
    @Post('create')
    async createSPSOMember(
        @GetUser('id') user: User,
        @Body() createSPSOMemberDto: createSPSOMember
    ) {
        
        return this.spsomemberService.createSPSOMember(user.userId, createSPSOMemberDto);
    }

    @UseGuards(JwtGuard)
    @Patch('update')
    async updateSPSOMember(
        @GetUser('id') user: User,
        @Body() updateSPSOMemberDto: updateSPSOMember 
    ){
        return this.spsomemberService.updateSPSOMember(user.userId, updateSPSOMemberDto);
    }



}
