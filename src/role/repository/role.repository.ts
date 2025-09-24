import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from '../model/role.entity';
import { FindOptions, Transaction } from 'sequelize';

@Injectable()
export class RoleRepository {
  constructor(@InjectModel(Role) private readonly repository: typeof Role) {}

  async findById(id: string): Promise<Role | null> {
    return await this.repository.findByPk(id);
  }

  async create(data: Partial<Role>, ts?: Transaction): Promise<Role> {
    return await this.repository.create({ ...data }, { transaction: ts });
  }

  async update(id: string, data: Partial<Role>, ts?: Transaction) {
    return await this.repository.update(
      { ...data },
      { where: { id }, transaction: ts },
    );
  }

  async delete(options: FindOptions<Role>, ts?: Transaction) {
    return await this.repository.destroy({
      ...options,
      where: { ...options?.where, deletedAt: null },
      transaction: ts,
    });
  }

  async softDelete(options: FindOptions<Role>, ts?: Transaction) {
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
    options: FindOptions<Role>,
    ts?: Transaction,
  ): Promise<Role | null> {
    return await this.repository.findOne({
      ...options,
      where: { ...options?.where, deletedAt: null },
      transaction: ts,
    });
  }

  async findAll(options: FindOptions<Role>, ts?: Transaction): Promise<Role[]> {
    return await this.repository.findAll({
      ...options,
      where: { ...options?.where, deletedAt: null },
      transaction: ts,
    });
  }
}
