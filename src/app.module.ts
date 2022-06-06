import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { FirebaseService } from './firebase/firebase.service';
import { FirebaseModule } from './firebase/firebase.module';

@Module({
  imports: [AuthModule, UsersModule, FirebaseModule, FirebaseService],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
