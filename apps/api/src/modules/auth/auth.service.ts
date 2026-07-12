import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existing) throw new ConflictException('Email already registered');

    const hashed = await bcrypt.hash(dto.password, 12);
    const user = await this.prisma.user.create({
      data: {
        fullName: dto.fullName,
        email: dto.email,
        password: hashed,
        phone: dto.phone,
        country: dto.country,
        role: dto.role,
      },
    });

    // If registering as seller, create empty seller profile
    if (dto.role === 'SELLER') {
      await this.prisma.sellerProfile.create({
        data: {
          userId: user.id,
          businessName: dto.fullName,
        },
      });
    }

    return { user: this.sanitize(user), token: this.signToken(user.id, user.email) };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const valid = await bcrypt.compare(dto.password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    return { user: this.sanitize(user), token: this.signToken(user.id, user.email) };
  }

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { sellerProfile: true },
    });
    if (!user) throw new UnauthorizedException('User not found');
    return this.sanitize(user);
  }

  private signToken(id: string, email: string) {
    return this.jwt.sign({ sub: id, email });
  }

  private sanitize(user: any) {
    const { password, ...rest } = user;
    return rest;
  }
}
