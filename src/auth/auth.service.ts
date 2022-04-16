import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { User } from 'libs/db/src/model/user.model';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(user: Partial<User>) {
    const token = this.jwtService.sign({
      email: user.email,
    });
    return {
      token,
    };
  }
}
