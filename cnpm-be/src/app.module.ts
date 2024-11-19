import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CustomerModule } from './customer/customer.module';
import { SpsomemberModule } from './spsomember/spsomember.module';
import { ConfigModule } from '@nestjs/config';
import { AtGuard } from './auth/common/guards';
import { APP_GUARD } from '@nestjs/core';

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
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
