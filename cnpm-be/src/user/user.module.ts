import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SpsomemberService } from 'src/spsomember/spsomember.service';
import { CustomerService } from 'src/Customer/customer.service';

@Module({
  providers: [UserService, SpsomemberService, CustomerService],
  controllers: [UserController]
})
export class UserModule {}
