import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users.service';
import { User } from '../../../models';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const userInclPassword = await this.usersService.findOne(email);
    if (userInclPassword && userInclPassword.password === pass) {
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
