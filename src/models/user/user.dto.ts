// tslint:disable: max-classes-per-file

import { ApiProperty } from '@nestjs/swagger';
import { User } from './index';

export class CreateUserDTO implements Partial<User> {
  @ApiProperty() email: string;
  @ApiProperty() password: string;
}

export class LoginUserDTO implements Partial<User> {
  @ApiProperty() email: string;
  @ApiProperty() password: string;
}
