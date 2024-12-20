import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { PrismaService } from '../prisma/prisma.service';

import { AuthDto } from './dto';
import { JwtPayload, Tokens } from './types';
import { CreateUserDto } from 'src/user/dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
    private prismaService: PrismaService,
  ) {}

  async signupLocal(dto: AuthDto, createUserDto: CreateUserDto): Promise<Tokens> {
    const hash = await argon.hash(dto.password);
    const user = await this.prisma.user
      .create({
        data: {
          email: dto.email,
          hash,
          fname: createUserDto.fname,
          lname: createUserDto.lname,
          phone: createUserDto.phone,   
          role: createUserDto.role,
          adminEmail: "admin@hcmut.edu.vn" 
        },
      })
      .catch((error) => {
          if (error.code === 'P2002') {
            throw new ForbiddenException('Credentials incorrect');
          }
        throw error;
      });

    const tokens = await this.getTokens(user.userId, user.email);
    await this.updateRtHash(user.userId, tokens.refresh_token);

    return tokens;
  }

  async signinLocal(dto: AuthDto): Promise<Tokens> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });
  
      if (!user) throw new ForbiddenException('Access Denied');
  
      const passwordMatches = await argon.verify(user.hash, dto.password);
      if (!passwordMatches) throw new ForbiddenException('Access Denied');
  
      const tokens = await this.getTokens(user.userId, user.email);
      await this.updateRtHash(user.userId, tokens.refresh_token);
  
  
      // usage use update
      await this.prismaService.user.update({
        where: {
          email: dto.email,
        },
        data: {
          usageHistory: new Date().toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
          }).replace(/\//g, '-')
        }
      });
      
      return tokens;
      
    } catch (error) {
      throw new ForbiddenException('Credentials incorrect');
    }
  }

  async logout(userId: number): Promise<boolean> {
    await this.prisma.user.updateMany({
      where: {
        userId: userId,
        hashedRt: {
          not: null,
        },
      },
      data: {
        hashedRt: null,
      },
    });
    return true;
  }
  
  async refreshTokens(userId: number, rt: string): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: {
        userId: userId,
      },
    });
    if (!user || !user.hashedRt) throw new ForbiddenException('Access Denied');

    const rtMatches = await argon.verify(user.hashedRt, rt);
    if (!rtMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.userId, user.email);
    await this.updateRtHash(user.userId, tokens.refresh_token);

    return tokens;
  }

  async updateRtHash(userId: number, rt: string): Promise<void> {
    const hash = await argon.hash(rt);
    await this.prisma.user.update({
      where: {
        userId: userId,
      },
      data: {
        hashedRt: hash,
      },
    });
  }

  async getTokens(userId: number, email: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      email: email,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('AT_SECRET'),
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('RT_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async getMe(userId: number) {
    const returnVal = await this.prisma.user.findUnique({
      where: {
        userId: userId,
      },
      
    })

    let returnVal2 = null;
    if (returnVal.role === 'STUDENT') {
      returnVal2 = await this.prisma.customer.findFirst({
        where: {
          userId: userId,
        }
      })
    }
    else {
      returnVal2 = await this.prisma.sPSOMember.findFirst({
        where: {
          userId: userId,
        }
      })
    }




    if (returnVal?.hashedRt === null) {
      throw new ForbiddenException('Access Denied');
    }

    return {
      ...returnVal,
      ...returnVal2
    }
  }
}
