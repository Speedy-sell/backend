import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { EmailService } from '../../services/email/email.service';
import { UserController } from './user.controller';

/** Database Imports */
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../../models';
import { mongoDBConfig } from '../../../config/mongodb.config';

/** Authentication Imports */
import { AuthService } from './auth/auth.service';
import { LocalStrategy } from './auth/strategies/local.strategy';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '12h' },
    }),
    MongooseModule.forFeature([
      {
        name: mongoDBConfig.collectionName.user,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UserController],
  providers: [
    UsersService,
    EmailService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
  ],
  exports: [UsersService, EmailService, AuthService],
})
export class UsersModule {}
