import { Injectable } from '@nestjs/common';
import { User, RegisterUserDTO } from '../../models';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { mongoDBConfig } from '../../../config/mongodb.config';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(mongoDBConfig.collectionName.user)
    private readonly userModel: Model<User>,
  ) {}

  async findUser(email: string): Promise<User | undefined> {
    return await this.userModel.findOne({ email });
  }

  async create(user: RegisterUserDTO) {
    const newUser = new this.userModel(user);
    return await newUser.save();
  }

  async verify(emailToken: string): Promise<boolean> {
    try {
      const user = await this.userModel.updateOne(
        { emailToken },
        {
          verified: true,
          emailToken: null,
        },
      );
      // number of modified
      if (user.nModified) {
        return true;
      }
    } catch {
      return false;
    }
    return false;
  }
}
