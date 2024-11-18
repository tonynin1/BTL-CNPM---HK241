import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    UseGuards,
  } from '@nestjs/common';
  import { User } from '@prisma/client';
  import { GetUser } from '../auth/decorator';
  import { JwtGuard } from '../auth/guard';
  import { EditUserDto } from './dto';
  import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
  
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  
    // get by itself
    @UseGuards(JwtGuard)
    @Get('me')
    getMe(@GetUser() user: User) {
      return user;
    }
  
  // edit by itself
    @UseGuards(JwtGuard)
    @Patch('edit')
    editUser(
      @GetUser('id') user: User,
      @Body() dto: EditUserDto,
    ) {
      return this.userService.editUser(user.userId, dto);
    }

    // delete by admin
    @Delete('delete')
    deleteUser(
      @Query('userId') userId: string
    ){
      return this.userService.deleteUser(userId);
    }
  }