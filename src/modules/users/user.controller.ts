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
  async login(@Request() req, @Body() body: LoginUserDTO) {
    const { user } = req;
    /**
     * Where did this `user` property come from?
     * Thanks to the decorator `@UseGuard(AuthGuard('local'))`
     * It is a middleware which would add a property called `user` into
     * the request object if the user was found
     */
    return this.authService.login(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
