import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  // 仮のユーザー
  private readonly users = [
    {
      id: 1,
      name: 'taro',
      password: 'hogehoge',
    },
    {
      id: 2,
      name: 'jiro',
      password: 'fugafuga',
    },
  ] as User[];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.name == username);
  }
}
