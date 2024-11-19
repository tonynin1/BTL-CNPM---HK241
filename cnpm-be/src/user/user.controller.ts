import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    Query,
    UseGuards,
  } from '@nestjs/common';
  import { User } from '@prisma/client';
  import { EditUserDto } from './dto';
  import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GetCurrentUser } from 'src/auth/common/decorators';
import { AuthService } from 'src/auth/auth.service';
  
@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
  ) {}
  
  // edit by itself
  @HttpCode(HttpStatus.OK)
  @Patch('edit')
    editUser(
      @GetCurrentUser() user: User,
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