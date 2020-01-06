import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users.service';
import { User } from '../../../models';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    let user = await this.usersService.findOne(email);

    if (user && bcrypt.compareSync(pass, user.password)) {
      user = this.removePasswordProperty(user);
      return user;
    }
    return null;
  }

  private removePasswordProperty(user) {
    const { password, ...remaining } = user;
    return remaining;
  }

  async login(user: User) {
    const accessToken = {
      access_token: this.jwtService.sign({
        email: user.email,
        sub: user.userId,
      }),
    };
    return accessToken;
  }
}
