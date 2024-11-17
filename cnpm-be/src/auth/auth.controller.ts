import { Body, Controller, HttpCode, HttpStatus, ParseIntPipe, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
import { CreateUserDto } from "src/user/dto";

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,

    ) {}

    @HttpCode(HttpStatus.OK)
    @Post('signup')
    signup(
        @Body() authDto: AuthDto,
        @Body() createUserDto: CreateUserDto
    ) {
        return  this.authService.signup(authDto, createUserDto);
    }

    @Post('signin')
    signin(
        @Body() authDto: AuthDto
    ) {
        return this.authService.signin(authDto);
    }
}