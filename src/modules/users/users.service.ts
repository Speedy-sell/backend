import { Injectable } from '@nestjs/common';
import { User, RegisterUserDTO } from '../../models/user';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
  ) {
    this.users = [
      {
        userId: 1,
        email: 'nech',
        password: 'josh',
      },
      {
        userId: 2,
        email: 'chris',
        password: 'secret',
      },
      {
        userId: 3,
        email: 'maria',
        password: 'guess',
      },
    ];
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
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
