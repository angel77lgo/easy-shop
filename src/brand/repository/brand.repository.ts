import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Brand } from '../model/brand.entity';
import { FindOptions, Transaction } from 'sequelize';

@Injectable()
export class BrandRepository {
  constructor(@InjectModel(Brand) private readonly repository: typeof Brand) {}

  async findById(id: string): Promise<Brand | null> {
    return await this.repository.findByPk(id);
  }

  async create(data: Partial<Brand>, ts?: Transaction): Promise<Brand> {
    return await this.repository.create({ ...data }, { transaction: ts });
  }

  async update(id: string, data: Partial<Brand>, ts?: Transaction) {
    return await this.repository.update(
      { ...data },
      { where: { id }, transaction: ts },
    );
  }

  async delete(options: FindOptions<Brand>, ts?: Transaction) {
    return await this.repository.destroy({
      ...options,
      where: { ...options?.where, deletedAt: null },
      transaction: ts,
    });
  }

  async softDelete(options: FindOptions<Brand>, ts?: Transaction) {
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
    options: FindOptions<Brand>,
    ts?: Transaction,
  ): Promise<Brand | null> {
    return await this.repository.findOne({
      ...options,
      where: { ...options?.where, deletedAt: null },
      transaction: ts,
    });
  }

  async findAll(
    options?: FindOptions<Brand>,
    ts?: Transaction,
  ): Promise<Brand[]> {
    return await this.repository.findAll({
      ...options,
      where: { ...options?.where, deletedAt: null },
      transaction: ts,
    });
  }
}
