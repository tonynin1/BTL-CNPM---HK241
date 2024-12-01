import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createDocumentDto } from './dto/create-document.dto';

@Injectable()
export class DocumentService {
    constructor(private prismaService: PrismaService) {}

    async getAllDocuments(){
        try {
            
            const datas = await this.prismaService.document.findMany();
            return {
                data: datas,
                status: 200
            }
        } catch (error) {
            return {
                message: "Internal Server Error: " + error.message,
                status: 500
            } 
        }
    }

    async getDocumentById(documentId: number){
        try {
            const doc = await this.prismaService.document.findUnique({
                where: {
                    documentId: documentId
                }
            })
    
            if (!doc) {
                return {
                    message: 'Document not found',
                    status: 404
                }
            }
    
            return {
                data: doc,
                status: 200
            }
            
        } catch (error) {
            return {
                message: "Internal Server Error: " + error.message,
                status: 500
            }
            
        }
    }



    async allDocumentsByCustomerId(customerId: number){
        try {
            const docs = await this.prismaService.document.findMany({
                where: {
                    customerId: customerId
                }
            })
    
            return {
                data: docs,
                status: 200
            }
            
        } catch (error) {
            return {
                message: "Internal Server Error: " + error.message,
                status: 500
            }
        }
    }

    async createDocument(createDto : createDocumentDto){
        try {
            const doc = await this.prismaService.document.create({
                data: {
                    docName: createDto.docName,
                    customerId: createDto.customerId,
                    docQuantity: createDto.docQuantity,
                    docLink: createDto.docLink
                }
            })
    
            return {
                data: "Document created",
                status: 200
            }
            
        } catch (error) {
            return {
                message: "Internal Server Error: " + error.message,
                status: 500
            }
        }
    }

    async updateDocument(updateDto: createDocumentDto){
        try {
            const doc = await this.prismaService.document.update({
                where: {
                    documentId: updateDto.documentId
                },
                data: {
                    docName: updateDto.docName,
                    customerId: updateDto.customerId,
                    docQuantity: updateDto.docQuantity,
                }
            })
        } catch (error) {
            return {
                message: "Internal Server Error: " + error.message,
                status: 500
            }
        }
    }

    async deleteDocument(documentId: number){
        try {
            const doc = await this.prismaService.document.delete({
                where: {
                    documentId: documentId
                }
            })
    
            return {
                data: "Document deleted",
                status: 200
            }
            
        } catch (error) {
            return {
                message: "Internal Server Error: " + error.message,
                status: 500
            }
        }
    }
}
