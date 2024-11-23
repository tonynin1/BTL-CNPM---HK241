import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    fname: string;

    @IsString()
    lname: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    phone: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    role: string;

}