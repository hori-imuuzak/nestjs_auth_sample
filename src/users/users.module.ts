import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService],
  // providerで提供しているものはexportsに指定することで、外部で参照できるようになる
  exports: [UsersService],
})
export class UsersModule {}
