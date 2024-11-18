import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createSPSOMember, updateSPSOMember } from './dto';
import { create } from 'domain';

@Injectable()
export class SpsomemberService {
    constructor(private prismaService: PrismaService) {}

    async findAllSPSOMember() {
        const spsoMember = await this.prismaService.sPSOMember.findMany();
        return spsoMember;
    }
    async findSPSOMemberBySPSOId(spsoId: number) {
        const spsoMember = await this.prismaService.sPSOMember.findUnique({
            where: {
                sosoMemberId: spsoId
            }
        });
        if (!spsoMember) {
            return {
                message: 'SPSO member not found',
                status: 404
            }
        }
        const user = await this.prismaService.user.findUnique({
            where: {
                userId: spsoMember.userId
            }
        })

        return {
            data: {
                ...spsoMember,
                fname: user.fname,
                lname: user.lname,
                email: user.email,
                phone: user.phone,
                role: user.role
            },
            status: 200
        }
    }

    async findSPSOMemberByUserId(userId: number) {
        const spsoMember = await this.prismaService.sPSOMember.findFirst({
            where: {
                userId: userId,
            }
        });
        const user = await this.prismaService.user.findUnique({
            where: {
                userId: userId
            }
        });
        
        if (!spsoMember) {
            return {
                message: 'SPSO member not found',
                status: 404
            }
        }

        return {
            data: {
                ...spsoMember,
                fname: user.fname,
                lname: user.lname,
                email: user.email,
                phone: user.phone,
                role: user.role
            },
            status: 200
        }
    }
    async createSPSOMember(userId: number, createSPSOMemberDto: createSPSOMember) {
        const getUser = await this.prismaService.user.findUnique({
            where: {
                userId: userId
            }
        });

        if (!getUser) {
            return {
                message: 'User not found',
                status: 404
            }
        }


        if (getUser.role !== 'SPSO') {
            return {
                message: 'User is not SPSO',
                status: 400
            }
        }
        const checkSPSOMember = await this.findSPSOMemberByUserId(userId);
        console.log(checkSPSOMember)
        if (checkSPSOMember.status !== 404) {
            return {
                message: 'SPSO member already exist',
                status: 400
            }
        }
        const dob = new Date(createSPSOMemberDto.dob);
        const createSPSOMember = await this.prismaService.sPSOMember.create({
            data: {
            userId: getUser.userId,
            dob: dob,
            address: createSPSOMemberDto.address,
            sosoMemberId: createSPSOMemberDto.spsoId
            }
        });
        if (!createSPSOMember) {
            return {
                message: 'SPSO member not created',
                status: 400
            }
        }
        return {
            message: 'SPSO member created',
            status: 201
        }
    }

    async updateSPSOMember(userId: number, updateSPSOMemberDto: updateSPSOMember) {

        const getUser = await this.prismaService.user.findUnique({
            where: {
                userId: userId
            }
        });

        if (!getUser) {
            return {
                message: 'User not found',
                status: 404
            }
        }
        if (getUser.role !== 'SPSO') {
            return {
                message: 'User is not SPSO',
                status: 400
            }
        }

        // check if spso member exist
        let spsoMemberExist = await this.findSPSOMemberByUserId(userId)
        
        if (!spsoMemberExist) {
            return {
                message: 'SPSO member not found',
                status: 404
            }
        }

        const dob = new Date(updateSPSOMemberDto.dob? updateSPSOMemberDto.dob : spsoMemberExist.data.dob);
        // check valid dob
        if (dob.toString() === 'Invalid Date') {
            return {
                message: 'Invalid date of birth',
                status: 400
            }
        }
        const updateSPSOMember = await this.prismaService.sPSOMember.update({
            where: {
                sosoMemberId: spsoMemberExist.data.sosoMemberId
            },
            data: {
                dob: dob,
                address: updateSPSOMemberDto.address? updateSPSOMemberDto.address : spsoMemberExist.data.address
            }
        });

        return {
            message: 'SPSO member updated',
            status: 200
        }
    }


    async deleteSPSOMember(userId: number) {
        const getUser = await this.prismaService.user.findUnique({
            where: {
                userId: userId
            }
        });

        if (!getUser) {
            return {
                message: 'User not found',
                status: 404
            }
        }

        if (getUser.role !== 'SPSO') {
            return {
                message: 'User is not SPSO',
                status: 400
            }
        }

        let spsoMemberExist = await this.findSPSOMemberByUserId(userId);

        if (!spsoMemberExist) {
            return {
                message: 'SPSO member not found ',
                status: 404
            }
        }

        const deleteSPSOMember = await this.prismaService.sPSOMember.delete({
            where: {
                sosoMemberId: spsoMemberExist?.data.sosoMemberId
            }
        });

        return {
            message: 'SPSO member deleted',
            status: 200
        }
    }
}
