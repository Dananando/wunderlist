import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordModule } from '../auth/password.module';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), PasswordModule],
  providers: [UsersService],
  exports: [UsersService],
  // controllers: [UsersController],
})
export class UsersModule {}
