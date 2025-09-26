import { Module } from '@nestjs/common';
import { OrganizationController } from './controllers/organization.controller';
import { OrganizationService } from './services/organization.service';
import { OrganizationRepository } from './repository/organization.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { Organization } from './model/organization.entity';
import { UserModule } from '../user/user.module';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [SequelizeModule.forFeature([Organization]), UserModule, RoleModule],
  controllers: [OrganizationController],
  providers: [OrganizationService, OrganizationRepository],
})
export class OrganizationModule {}
