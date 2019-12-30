import { Injectable } from '@nestjs/common';
import { User } from '../../models/user';

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
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
}
