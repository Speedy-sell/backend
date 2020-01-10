// tslint:disable: max-classes-per-file

import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.interface';

export class RegisterUserDTO implements Partial<User> {
  @ApiProperty() email: string;
  @ApiProperty() password: string;
}

export class ForgotPasswordDTO implements Partial<User> {
  @ApiProperty() email: string;
}

export class ResetPasswordDTO implements Partial<User> {
  @ApiProperty() email: string;
  @ApiProperty() emailToken: string;
  @ApiProperty({ description: 'New Password' }) password: string;
}

export class LoginUserDTO implements Partial<User> {
  @ApiProperty() email: string;
  @ApiProperty() password: string;
}
