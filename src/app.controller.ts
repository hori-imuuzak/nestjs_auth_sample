import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { FirebaseAuthGuard } from './auth/firebase-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { FirebaseService } from './firebase/firebase.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    private firebaseService: FirebaseService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return req.user;
  }

  @Post('v2/signup')
  async v2Signup(@Request() req) {
    return await this.authService.createUser(req.body.email, req.body.password);
  }

  @Post('v2/signin')
  async v2Signin(@Request() req) {
    return await this.authService.createUser(req.body.email, req.body.password);
  }

  @Post('v2/login')
  async v2Login(@Request() req) {
    return await this.authService.loginUser(req.body.email, req.body.password);
  }

  @UseGuards(FirebaseAuthGuard)
  @Get('v2/profile')
  async v2Profile(@Request() req) {
    return req.user;
  }
}
