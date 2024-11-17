import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CustomerModule } from './customer/customer.module';
import { SpsomemberModule } from './spsomember/spsomember.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PrismaModule, 
    UserModule, 
    AuthModule, 
    CustomerModule, 
    SpsomemberModule,
    ConfigModule.forRoot({
      isGlobal: true, 
    })
  ],
})
export class AppModule {}
