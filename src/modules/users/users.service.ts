import { Injectable } from '@nestjs/common';
import { User, ResetPasswordDTO } from '../../models';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { mongoDBConfig } from '../../../config/mongodb.config';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(mongoDBConfig.collectionName.user)
    private readonly userModel: Model<User>,
  ) {}

  async findUserByEmail(email: string): Promise<User | undefined> {
    return await this.userModel.findOne({ email });
  }

  async create(user: User) {
    const newUser = new this.userModel(user);
    return await newUser.save();
  }

  async setEmailToken(email, token) {
    const user = await this.userModel.updateOne(
      { email },
      {
        emailToken: token,
      },
    );
    return this.wasUpdatedOrNot(user);
  }

  async verify(emailToken: string): Promise<boolean> {
    const user = await this.userModel.updateOne(
      { emailToken },
      {
        verified: true,
        emailToken: null,
      },
    );
    return this.wasUpdatedOrNot(user);
  }

  async resetPassword({
    email,
    emailToken,
    password,
  }: ResetPasswordDTO): Promise<boolean> {
    const user = await this.userModel.updateOne(
      { email, emailToken },
      {
        password,
      },
    );
    return this.wasUpdatedOrNot(user);
  }

  wasUpdatedOrNot(response): boolean {
    // number of modified
    if (response.nModified) {
      return true;
    }
    return false;
  }
}
