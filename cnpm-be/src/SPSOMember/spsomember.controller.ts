import { Body, Controller, Get, HttpCode, HttpStatus, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { SpsomemberService } from './spsomember.service';
import { createSPSOMember } from './dto';
import { updateSPSOMember } from './dto';
import { User } from '@prisma/client';
import { GetCurrentUser, GetCurrentUserId } from 'src/auth/common/decorators';
import { RtGuard } from 'src/auth/common/guards';


@Controller('spsomember')
export class SpsomemberController {
    constructor(private spsomemberService: SpsomemberService) {}


    // Find all SPSO member
    // Remove Auth for this route
    @HttpCode(HttpStatus.OK)
    @Get()
    async findAllSPSOMember() {
        return this.spsomemberService.findAllSPSOMember();
    }

    // Remove Auth for this route
    @HttpCode(HttpStatus.OK)
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
    @HttpCode(HttpStatus.OK)
    @Post('create')
    async createSPSOMember(
        @GetCurrentUserId() userId: number,
        @Body() createSPSOMemberDto: createSPSOMember
    ) {
        
        return this.spsomemberService.createSPSOMember(userId, createSPSOMemberDto);
    }

    @Patch('update')
    async updateSPSOMember(
        @GetCurrentUser() user: User,
        @Body() updateSPSOMemberDto: updateSPSOMember 
    ){
        return this.spsomemberService.updateSPSOMember(user.userId, updateSPSOMemberDto);
    }



}
