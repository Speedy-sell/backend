import { Injectable } from '@nestjs/common';
import { User, RegisterUserDTO } from '../../models/user';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
  ) {}

  async findOne(email: string): Promise<User | undefined> {
    return await this.userModel.findOne({ email });
  }

  async create(user: RegisterUserDTO) {
    try {
      const newUser = new this.userModel(user);
      return await newUser.save();
    } catch (error) {
      return error;
    }
  }
}
