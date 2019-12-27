import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

import { AuthService } from './auth/auth.service';
import { LocalStrategy } from './auth/strategies/local.strategy';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';
import { UserController } from './user.controller';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '12h' },
    }),
  ],
  controllers: [UserController],
  providers: [UsersService, AuthService, LocalStrategy, JwtStrategy],
  exports: [UsersService, AuthService],
})
export class UsersModule {}
