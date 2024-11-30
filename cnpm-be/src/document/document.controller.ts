import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { DocumentService } from './document.service';
import { createDocumentDto } from './dto/create-document.dto';

@Controller('document')
export class DocumentController {
    constructor(
        private documentService: DocumentService
    ){}

    @Get()
    getAllDocuments(){
        return this.documentService.getAllDocuments();
    }

    @Get('documentId')
    getDocumentById(
        @Query('documentId') documentId: number
    ){
        return this.documentService.getDocumentById(documentId);
    }

    @Get('printerId')
    allDocumentsByPrinterId(
        @Query('printerId') printerId: number
    ){
        return this.documentService.allDocumentsByPrinterId(printerId);
    }

    @Get('customerId')
    allDocumentsByCustomerId(
        @Query('customerId') customerId: number
    ){
        return this.documentService.allDocumentsByCustomerId(customerId);
    }

    @Post('create')
    createDocument(
        createDto: createDocumentDto
    ){
        return this.documentService.createDocument(createDto);
    }

    @Patch('update')
    updateDocument(
        @Body() createDto: createDocumentDto
    ){
        return this.documentService.updateDocument(createDto);
    }

    @Delete('delete')
    deleteDocument(
        @Query('documentId') documentId: number
    ){
        return this.documentService.deleteDocument(documentId);
    }
}
