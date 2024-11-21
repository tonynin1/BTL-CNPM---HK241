/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from './services/database/database.service';

@Injectable()
export class PaymentService {
    constructor(private prisma : PrismaService) {}
}
