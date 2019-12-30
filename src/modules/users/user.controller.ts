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
import { LoginUserDTO } from '../../models/user/user.dto';

@Controller()
export class UserController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  // tslint:disable-next-line: variable-name
  async login(@Request() req, @Body() _body: LoginUserDTO) {
    const { user } = req;
    /**
     * Where did the property `user` come from?
     * Thanks to the decorator `@UseGuard(AuthGuard('local'))`
     * It is a middleware which would add a property called `user` into
     * the user was found along with the associated email and password of
     * the request
     */
    return this.authService.login(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
