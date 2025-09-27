import { Inject, Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize';
import { ProductRepository } from '../repository/product.repository';

@Injectable()
export class ProductService {
  constructor(
    @InjectConnection() private readonly sequelize: Sequelize,
    @Inject(ProductRepository) private productRepository: ProductRepository,
  ) {}
}
