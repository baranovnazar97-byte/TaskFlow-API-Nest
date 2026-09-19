import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { LoginDto } from './dto/login.dto.js';
import { RegisterDto } from './dto/register.dto.js';

@Injectable()
export class AuthService {
  users: any[] = [];

  async register(dto: RegisterDto) {
    const user = {
      id: 2,
      email: dto.email,
      password: await hash(dto.password, 10),
      role: 'admin',
    };

    this.users.push(user);

    return user;
  }

  async login(dto: LoginDto) {
    const findUser = this.users.find((item) => item.email === dto.email);

    if (!findUser) {
      throw new UnauthorizedException();
    }

    const isCorrect = await compare(dto.password, findUser.password);

    if (!isCorrect) {
      throw new UnauthorizedException();
    }

    const jwtUser = jwt.sign(
      { userId: findUser.id, role: findUser.role },
      'my-secret',
      { expiresIn: '1h' },
    );

    return {
      message: 'Successful',
      jwt: jwtUser,
    };
  }
}
