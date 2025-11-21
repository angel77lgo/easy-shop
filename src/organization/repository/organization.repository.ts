import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Organization } from '../model/organization.entity';
import { FindOptions, Transaction } from 'sequelize';

@Injectable()
export class OrganizationRepository {
  constructor(
    @InjectModel(Organization)
    private readonly repository: typeof Organization,
  ) { }

  async findById(id: string): Promise<Organization | null> {
    return await this.repository.findByPk(id);
  }

  async create(
    data: Partial<Organization>,
    ts?: Transaction,
  ): Promise<Organization> {
    return await this.repository.create({ ...data }, { transaction: ts });
  }

  async update(id: string, data: Partial<Organization>, ts?: Transaction) {
    return await this.repository.update(
      { ...data },
      { where: { id }, transaction: ts },
    );
  }

  async delete(options: FindOptions<Organization>, ts?: Transaction) {
    return await this.repository.destroy({
      ...options,
      where: { ...options?.where, deletedAt: null },
      transaction: ts,
    });
  }

  async softDelete(options: FindOptions<Organization>, ts?: Transaction) {
    return await this.repository.update(
      { deletedAt: new Date() },
      {
        ...options,
        where: { ...options?.where, deletedAt: null },
        transaction: ts,
      },
    );
  }

  async findOne(
    options: FindOptions<Organization>,
    ts?: Transaction,
  ): Promise<Organization | null> {
    return await this.repository.findOne({
      ...options,
      where: { ...options?.where, deletedAt: null },
      transaction: ts,
    });
  }

  async findAll(
    options?: FindOptions<Organization>,
    ts?: Transaction,
  ): Promise<Organization[]> {
    return await this.repository.findAll({
      ...options,
      where: { ...options?.where, deletedAt: null },
      transaction: ts,
    });
  }
}
