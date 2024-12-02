import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Patch,
    Query,
  } from '@nestjs/common';
  import { EditUserDto } from './dto';
  import { UserService } from './user.service';
import { GetCurrentUserId } from 'src/auth/common/decorators';
  
@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
  ) {}
  
  // get all users
  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  // edit by itself
  @HttpCode(HttpStatus.OK)
  @Patch('edit')
    editUser(
      @GetCurrentUserId() userId: number,
      @Body() dto: EditUserDto,
    ) {
      return this.userService.editUser(userId, dto);
    }

    // delete by admin
    @Delete('delete/:userId')
    deleteUser(
      @Param('userId', ParseIntPipe) userId: string
    ){
      return this.userService.deleteUser(userId);
    }
  }