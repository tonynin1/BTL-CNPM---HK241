import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createContainsDto } from './dto';

@Injectable()
export class ContainsService {
    constructor(private prismaService: PrismaService) {}

    async getAllContains() {
        try {
            const contains = await this.prismaService.contains.findMany();

            return {
                status: 200,
                data: contains,
            }
        } catch (error) {
            return {
                status: 500,
                message: 'Internal server error: ' + error.message,
            }
        }
    }

    async getContainsById(id: number) {
        try {
            const contains = await this.prismaService.contains.findUnique({
                where: {
                    id: id,
                },
            });

            if (!contains) {
                return {
                    status: 404,
                    message: 'Contains not found',
                }
            }
            return {
                status: 200,
                data: contains,
            }
        } catch (error) {
            return {
                status: 500,
                message: 'Internal server error: ' + error.message,
            }
        }
    }   

    async getContainsByOrderId(printOrderId: number) {
        try {
            const contains = await this.prismaService.contains.findMany({
                where: {
                    printOrderId: printOrderId,
                },
            });

            if (!contains) {
                return {
                    status: 404,
                    message: 'Contains not found',
                }
            }
            return {
                status: 200,
                data: contains,
            }
        } catch (error) {
            return {
                status: 500,
                message: 'Internal server error: ' + error.message,
            }
        }
    }
    async getContainsByDocumentId(documentId: number) {
        try {
            const contains = await this.prismaService.contains.findMany({
                where: {
                    documentId: documentId,
                },
            });

            return {
                status: 200,
                data: contains,
            }
        } catch (error) {
            return {
                status: 500,
                message: 'Internal server error: ' + error.message,
            }
        }
    }
    async getContainsByDocumentIdAndPrintOrderId(documentId: number, printOrderId: number) {
        try {
            const contains = await this.prismaService.contains.findMany({
                where: {
                    documentId: documentId,
                    printOrderId: printOrderId,
                },
            });

            return {
                status: 200,
                data: contains,
            }
        } catch (error) {
            return {
                status: 500,
                message: 'Internal server error: ' + error.message,
            }
        }
    }

    async createContains(createContainsDto: createContainsDto){
        try {
            // find first
            const find = await this.prismaService.contains.findFirst({
                where: {
                    documentId: createContainsDto.documentId,
                    printOrderId: createContainsDto.printOrderId,
                },
            });

            // if exists return 409
            if (find) {
                return {
                    status: 409,
                    message: 'Contains already exists',
                }
            }

            const contains = await this.prismaService.contains.create({
                data: {
                    documentId: createContainsDto.documentId,
                    printOrderId: createContainsDto.printOrderId,
                },
                
            });

            return {
                status: 200,
                message: 'Contains created successfully',
            }
        } catch (error) {
            return {
                status: 500,
                message: 'Internal server error: ' + error.message,
            }
        }
    }

    async updateContains(createContainsDto: createContainsDto) {
        try {
            const contains = await this.prismaService.contains.update({
                where: {
                    id: createContainsDto.id,
                },
                data: {
                    documentId: createContainsDto.documentId,
                    printOrderId: createContainsDto.printOrderId,
                },
            });

            return {
                status: 200,
                message: 'Contains updated successfully',
            }
        } catch (error) {
            return {
                status: 500,
                message: 'Internal server error: ' + error.message,
            }
        }
    }

    async deleteContains(id: number) {
        try {
            const contains = await this.prismaService.contains.delete({
                where: {
                    id: id,
                },
            });

            return {
                status: 200,
                message: 'Contains deleted successfully',
            }
        } catch (error) {
            return {
                status: 500,
                message: 'Internal server error: ' + error.message,
            }
        }
    }
}
