import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
    tokenBlacklist: any;
    constructor(config: ConfigService) {
        super({
            datasources: {
                db: {
                    url: config.get('DATABASE_URL'),
                },
            },
        });
        console.log('DATABASE_URL', config.get('DATABASE_URL'));
    }


    cleanDb(){
        return this.$transaction([
            this.user.deleteMany(),
        ])
    }
}
