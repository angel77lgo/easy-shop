import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from '../model/product.entity';
import { FindOptions, Transaction } from 'sequelize';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(Product) private readonly repository: typeof Product,
  ) {}

  async findById(id: string): Promise<Product | null> {
    return await this.repository.findByPk(id);
  }

  async create(data: Partial<Product>, ts?: Transaction): Promise<Product> {
    return await this.repository.create({ ...data }, { transaction: ts });
  }

  async update(id: string, data: Partial<Product>, ts?: Transaction) {
    return await this.repository.update(
      { ...data },
      { where: { id }, transaction: ts },
    );
  }

  async delete(options: FindOptions<Product>, ts?: Transaction) {
    return await this.repository.destroy({
      ...options,
      where: { ...options?.where, deletedAt: null },
      transaction: ts,
    });
  }

  async softDelete(options: FindOptions<Product>, ts?: Transaction) {
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
    options: FindOptions<Product>,
    ts?: Transaction,
  ): Promise<Product | null> {
    return await this.repository.findOne({
      ...options,
      where: { ...options?.where, deletedAt: null },
      transaction: ts,
    });
  }

  async findAll(
    options: FindOptions<Product>,
    ts?: Transaction,
  ): Promise<Product[]> {
    return await this.repository.findAll({
      ...options,
      where: { ...options?.where, deletedAt: null },
      transaction: ts,
    });
  }
}
