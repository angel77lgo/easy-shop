import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductShoppingCart } from '../model/product-shopping-cart.entity';
import { FindOptions, Transaction } from 'sequelize';

@Injectable()
export class ProductShoppingCartRepository {
  constructor(
    @InjectModel(ProductShoppingCart)
    private readonly repository: typeof ProductShoppingCart,
  ) {}

  async findById(id: string): Promise<ProductShoppingCart | null> {
    return await this.repository.findByPk(id);
  }

  async create(
    data: Partial<ProductShoppingCart>,
    ts?: Transaction,
  ): Promise<ProductShoppingCart> {
    return await this.repository.create({ ...data }, { transaction: ts });
  }

  async update(
    id: string,
    data: Partial<ProductShoppingCart>,
    ts?: Transaction,
  ) {
    return await this.repository.update(
      { ...data },
      { where: { id }, transaction: ts },
    );
  }

  async delete(options: FindOptions<ProductShoppingCart>, ts?: Transaction) {
    return await this.repository.destroy({
      ...options,
      where: { ...options?.where, deletedAt: null },
      transaction: ts,
    });
  }

  async softDelete(
    options: FindOptions<ProductShoppingCart>,
    ts?: Transaction,
  ) {
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
    options: FindOptions<ProductShoppingCart>,
    ts?: Transaction,
  ): Promise<ProductShoppingCart | null> {
    return await this.repository.findOne({
      ...options,
      where: { ...options?.where, deletedAt: null },
      transaction: ts,
    });
  }

  async findAll(
    options: FindOptions<ProductShoppingCart>,
    ts?: Transaction,
  ): Promise<ProductShoppingCart[]> {
    return await this.repository.findAll({
      ...options,
      where: { ...options?.where, deletedAt: null },
      transaction: ts,
    });
  }
}
