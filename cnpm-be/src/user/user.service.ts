import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditUserDto } from './dto';
import { SpsomemberService } from 'src/spsomember/spsomember.service';
import { CustomerService } from 'src/Customer/customer.service';
@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private spsoService: SpsomemberService,
    private customerService: CustomerService
  ) {}


  async findUserById(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        userId: Number(userId),
      },
    });

    if (!user) {
      return null;
    }
    return user;
  }

  async editUser(
    userId: number,
    dto: EditUserDto,
  ) {
    console.log(userId);
    const user = await this.prisma.user.update({
      where: {
        userId: userId,
      },
      data: {
        ...dto,
      },
    });

    delete user.password;

    return user;
  }

  async deleteUser(
    userId: string
  ){
    let findUser = await this.findUserById(userId);

    if(!findUser){
      return { message: 'User not found' , status: 404};
    }
    if (findUser.role === 'SPSO'){
      const deleteSPSO = await this.spsoService.deleteSPSOMember(Number(userId));
      if(deleteSPSO.status !== 200){
        return { message: 'Error deleting SPSO' , status: 500};
      }
    }
    else{
      const deleteCustomer = await this.customerService.deleteCustomer(Number(userId));
    }
    const user = await this.prisma.user.delete({
      where: {
        userId: Number(userId)
      }
    });

    // return 
    return { message: 'User successfully deleted' , status: 200};
  }
}