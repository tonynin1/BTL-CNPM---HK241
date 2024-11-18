import { IsEmail, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    fname: string;

    @IsString()
    lname: string;

    @IsEmail()
    email: string;

    @IsString()
    phone: string;

    @IsString()
    password: string;

    @IsString()
    role: string;

}