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
import { LoginUserDTO, RegisterUserDTO, User } from '../../models';
import { UsersService } from './users.service';
import { EmailService } from '../../services/email/email.service';
import { encrypt } from '../../utils/security';
import { getRandomString } from '../../utils/string';
import { config } from '../../../config/app.config';
import { environment } from '../../../environment';

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
    const user: User = {
      ...body,
      password: encrypt(body.password),
      emailToken: getRandomString(),
      verified: false,
    };
    return await this.usersService.create(user);
  }

  @Get('test')
  test() {
    const emailToken = 'dfdfa';
    const mailOptions = {
      from: `"Company" <${environment.emailProvider.username}>`,
      to: `joshinechar@gmail.com`, // list of receivers (separated by ,)
      subject: `hello`,
      text: `Testing`,
      html:
        `Hi! <br><br> This is a test<br><br>` +
        `<a href=${config.hostURL}/verify/${emailToken}>` +
        `Click here now` +
        `</a>`,
      // html body
    };

    this.emailService.sendEmailVerification(mailOptions);
    return 'success again 6';
  }
}
