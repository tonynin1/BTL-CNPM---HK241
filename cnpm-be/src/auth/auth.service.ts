import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { CreateUserDto } from "src/user/dto";
@Injectable({})
export class AuthService{
    constructor(
        private prisma: PrismaService, 
        private jwt: JwtService,
        private config: ConfigService
    ){}
    async signup(dto: AuthDto, createDto: CreateUserDto){
        // generate the password hash
        const hash = await argon.hash(dto.password);
        // save the user to the database
        try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    password: hash,
                    fname: createDto.fname,
                    phone: createDto.phone,
                    role: createDto.role,
                    lname: createDto.lname

                }
            })
    
            return this.signToken(user.userId, user.email);
            
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Email already exists');
                }
            }
            throw error;
        }
    }


    async signin(dto: AuthDto){

        // find the user by email
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            }
        });

        // if user does not exist throw exception
        if (!user) {
            throw new ForbiddenException('Invalid email or password');
        }
        
        // compare the password
        const pWMatch = await argon.verify(user.password, dto.password);
        
        // if password does not match throw exception
        if (!pWMatch) {
            throw new ForbiddenException('Invalid email or password');
        }
        
        // send back the user
        return this.signToken(user.userId, user.email);
    }


    async signout(token: string) {
        // Add the token to a blacklist (you would need to implement the blacklist logic)
        await this.prisma.tokenBlacklist.create({
            data: {
                token: token,
            },
        });
        return { message: 'Successfully signed out' };
    }
    async signToken(
        userId: number, 
        email: string) : Promise<{access_token: string}>{
        
        const payload = { sub: userId, email };

        const secret = this.config.get('JWT_SECRET');
        const token = await this.jwt.signAsync(
            payload,
            {
                secret: secret,
                expiresIn: '60m'
            }
        )

        
        return {
            access_token: token
       }
    }
}
