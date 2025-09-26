import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './model/role.entity';
import { RoleService } from './services/role.service';
import { RoleRepository } from './repository/role.repository';

@Module({
  imports: [SequelizeModule.forFeature([Role])],
  providers: [RoleService, RoleRepository],
  exports: [RoleService],
})
export class RoleModule {}
