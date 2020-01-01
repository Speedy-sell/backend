import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { LoginUserDTO, RegisterUserDTO } from '../../models';
import { UsersService } from './users.service';
import { encrypt } from '../../utils/security';

@Controller()
export class UserController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  // tslint:disable-next-line: variable-name
  async login(@Request() req, @Body() _body: LoginUserDTO) {
    const { user } = req;
    /**
     * Where did the property `user` come from?
     * Thanks to the decorator `@UseGuard(AuthGuard('local'))`
     * The middleware validates the `username` and `password` then
     * returns the associated `user` information into `req.user` property.
     */
    return this.authService.login(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    const { user } = req;
    /**
     * Where did the property `user` come from?
     * Thanks to the decorator `@UseGuards(AuthGuard('jwt'))`
     * The middleware validates the token that was passed then
     * returns the associated `user` information into `req.user` property.
     */
    return user;
  }

  @Post('register')
  async register(@Body() body: RegisterUserDTO) {
    body.password = encrypt(body.password);
    return await this.usersService.create(body);
  }
}
