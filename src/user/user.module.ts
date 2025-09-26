import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './model/user.entity';
import { UserService } from './services/user.service';
import { UserRepository } from './repository/user.repository';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
