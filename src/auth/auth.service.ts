import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';
import { FirebaseService } from 'src/firebase/firebase.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private firebaseService: FirebaseService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    // 実験用なのでただの文字列比較
    if (user && user.password == password) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: any) {
    const payload = { username: user.name, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async createUser(email: string, password: string): Promise<UserRecord> {
    return await this.firebaseService.getAuth().createUser({
      email,
      emailVerified: false,
      password,
      disabled: false,
    })
  }

  async loginUser(email: string, password: string): Promise<any> {
    const credential = await this.firebaseService.getAuthClient().signInWithEmailAndPassword(
      this.firebaseService.getAuthClient().getAuth(),
      email,
      password,
    );
    const idToken = await credential.user.getIdToken();
    return {
      access_token: idToken,
    };
  }
}
