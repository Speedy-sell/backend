import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Body,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { LoginUserDTO, RegisterUserDTO, User } from '../../models';
import { UsersService } from './users.service';
import { EmailService } from '../../services/email/email.service';
import { encrypt, getRandomString } from '../../utils';

@Controller()
export class UserController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private emailService: EmailService,
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
    const emailToken = getRandomString();
    const user: User = {
      ...body,
      emailToken,
      password: encrypt(body.password),
      verified: false,
    };
    return await this.usersService.create(user);
  }

  @Get('verify/:emailToken')
  async getProduct(@Param('emailToken') emailToken) {
    const verified = await this.usersService.verify(emailToken);
    if (verified) {
      return 'Redirect to successful page';
    } else {
      return 'Redirect to un-successful page';
    }
  }

  @Get('test')
  test() {
    const emailToken = getRandomString();
    this.emailService.sendEmailVerification(emailToken);
    return 'Delete this api please';
  }
}
