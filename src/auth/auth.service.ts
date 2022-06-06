import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    // 実験用なのでただの文字列比較
    if (user && user.password == password) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }
}
