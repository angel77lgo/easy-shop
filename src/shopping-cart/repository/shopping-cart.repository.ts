import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ShoppingCart } from '../model/shopping-cart.entity';
import { FindOptions, Transaction } from 'sequelize';

@Injectable()
export class ShoppingCartRepository {
  constructor(
    @InjectModel(ShoppingCart) private readonly repository: typeof ShoppingCart,
  ) {}

  async findById(id: string): Promise<ShoppingCart | null> {
    return await this.repository.findByPk(id);
  }

  async create(
    data: Partial<ShoppingCart>,
    ts?: Transaction,
  ): Promise<ShoppingCart> {
    return await this.repository.create({ ...data }, { transaction: ts });
  }

  async update(id: string, data: Partial<ShoppingCart>, ts?: Transaction) {
    return await this.repository.update(
      { ...data },
      { where: { id }, transaction: ts },
    );
  }

  async delete(options: FindOptions<ShoppingCart>, ts?: Transaction) {
    return await this.repository.destroy({
      ...options,
      where: { ...options?.where, deletedAt: null },
      transaction: ts,
    });
  }

  async softDelete(options: FindOptions<ShoppingCart>, ts?: Transaction) {
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
    options: FindOptions<ShoppingCart>,
    ts?: Transaction,
  ): Promise<ShoppingCart | null> {
    return await this.repository.findOne({
      ...options,
      where: { ...options?.where, deletedAt: null },
      transaction: ts,
    });
  }

  async findAll(
    options: FindOptions<ShoppingCart>,
    ts?: Transaction,
  ): Promise<ShoppingCart[]> {
    return await this.repository.findAll({
      ...options,
      where: { ...options?.where, deletedAt: null },
      transaction: ts,
    });
  }
}
