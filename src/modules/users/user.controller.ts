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
import { AuthService, EmailService, UsersService } from '../../services';
import {
  User,
  LoginUserDTO,
  RegisterUserDTO,
  ForgotPasswordDTO,
  ResetPasswordDTO,
} from '../../models';
import { encrypt, getRandomString } from '../../utils';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
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
    const user = req.user._doc;
    /**
     * Where did the property `user` come from?
     * Thanks to the decorator `@UseGuard(AuthGuard('local'))`
     * The middleware validates the `username` and `password` then
     * returns the associated `user` information into `req.user` property.
     */
    return this.authService.generateAccessToken(user);
  }

  @Post('auth/register')
  async register(@Body() body: RegisterUserDTO) {
    const emailToken = getRandomString();
    const user: User = {
      ...body,
      emailToken,
      verified: false,
      password: encrypt(body.password),
    };
    this.emailService.sendEmailVerification(body.email, emailToken);
    try {
      const response = await this.usersService.create(user);
      const token = this.authService.generateAccessToken(response);
      return token;
    } catch (error) {
      return error;
    }
  }

  @Get('auth/verify/:emailToken')
  async getProduct(@Param('emailToken') emailToken) {
    const verified = await this.usersService.verify(emailToken);
    if (verified) {
      return 'Redirect to successful page';
    } else {
      return 'Redirect to un-successful page';
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('getCurrentUser')
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

  @Post('auth/forgot-password')
  async forgotPassword(@Body() body: ForgotPasswordDTO) {
    const emailToken = getRandomString();
    if (await this.usersService.setEmailToken(body.email, emailToken)) {
      this.emailService.sendEmailVerification(body.email, emailToken);
      return 'Email Sent';
    } else {
      return 'Unable to find the user';
    }
  }

  @Post('auth/reset-password')
  async resetPassword(@Body() resetPasswordDTO: ResetPasswordDTO) {
    resetPasswordDTO.password = encrypt(resetPasswordDTO.password);
    return await this.usersService.resetPassword(resetPasswordDTO);
  }
}
