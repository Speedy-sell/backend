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
    const userInclPassword = await this.usersService.findOne(email);

    if (
      userInclPassword &&
      bcrypt.compareSync(pass, userInclPassword.password)
    ) {
      const { password, ...user } = userInclPassword;
      return user;
    }
    return null;
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
