import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    UseGuards,
  } from '@nestjs/common';
  
  import { Public, GetCurrentUserId, GetCurrentUser } from './common/decorators';
  import { RtGuard } from './common/guards';
  import { AuthService } from './auth.service';
  import { AuthDto } from './dto';
  import { Tokens } from './types';
import { CreateUserDto } from 'src/user/dto';
  
  @Controller('auth')
  export class AuthController {
    constructor(private authService: AuthService) {}
  
    @Public()
    @Post('signup')
    @HttpCode(HttpStatus.CREATED)
    signupLocal(
        @Body() dto: AuthDto,
        @Body() createUserDto: CreateUserDto
    ): Promise<Tokens> {
        console.log(createUserDto);
      return this.authService.signupLocal(dto, createUserDto);
    }
  
    @Public()
    @Post('signin')
    @HttpCode(HttpStatus.OK)
    signinLocal(@Body() dto: AuthDto): Promise<Tokens> {
      return this.authService.signinLocal(dto);
    }
  
    @Post('logout')
    @HttpCode(HttpStatus.OK)
    logout(@GetCurrentUserId() userId: number): Promise<boolean> {
      return this.authService.logout(userId);
    }
  
    @Public()
    @UseGuards(RtGuard)
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    refreshTokens(
      @GetCurrentUserId() userId: number,
      @GetCurrentUser('refreshToken') refreshToken: string,
    ): Promise<Tokens> {
      return this.authService.refreshTokens(userId, refreshToken);
    }
  
    
    @Get('me')
    @HttpCode(HttpStatus.OK)
    getMe(@GetCurrentUserId() userId: number) {
      return this.authService.getMe(userId);
    }
  }
  