import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './model/role.entity';
import { RoleService } from './services/role.service';
import { RoleRepository } from './repository/role.repository';
import { RolesGuard } from './guards/roles.guard';
import { PermissionsGuard } from './guards/permissions.guard';
import { TestPermissionsController } from './test-permissions.controller';

@Module({
  imports: [SequelizeModule.forFeature([Role])],
  controllers: [TestPermissionsController],
  providers: [RoleService, RoleRepository, RolesGuard, PermissionsGuard],
  exports: [RoleService, RolesGuard, PermissionsGuard],
})
export class RoleModule {}
