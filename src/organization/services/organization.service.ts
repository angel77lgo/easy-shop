import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Sequelize, Transaction } from 'sequelize';
import { OrganizationRepository } from '../repository/organization.repository';
import { IRegisterUser } from '../dto/organization.dto';
import { Organization } from '../model/organization.entity';
import { UserService } from '../../user/services/user.service';
import { InjectConnection } from '@nestjs/sequelize';
import { RoleService } from '../../role/services/role.service';
import { ROLES } from '../../role/constants/role.constants';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectConnection() private readonly sequelize: Sequelize,
    @Inject(OrganizationRepository)
    private readonly organizationRepository: OrganizationRepository,
    @Inject(UserService) private userService: UserService,
    @Inject(RoleService) private roleService: RoleService,
  ) {}

  async createOrganization(data: IRegisterUser) {
    const { organizationName, document } = data;
    const transaction = await this.sequelize.transaction();

    try {
      const newOrganization = await this.organizationRepository.create(
        { organizationName, document },
        transaction,
      );

      const role = await this.roleService.findByName(ROLES.ADMIN);
      console.log(role);

      await this.userService.createUser(
        {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
          organizationId: newOrganization.id,
          roleId: role?.id,
        },
        transaction,
      );

      await transaction.commit();
      return newOrganization;
    } catch (error) {
      await transaction.rollback();
      throw new HttpException(error.message, 400);
    }
  }

  async create(data: Partial<Organization>, ts?: Transaction) {
    const transaction = !ts ? await this.sequelize.transaction() : ts;

    try {
      const newOrganization = await this.organizationRepository.create(
        { ...data },
        transaction,
      );
      if (!ts) await transaction.commit();
      return newOrganization;
    } catch (error) {
      if (!ts) await transaction.rollback();
      throw new HttpException(error.message, 400);
    }
  }
}
