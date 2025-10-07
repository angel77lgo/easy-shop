import { Inject, Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize';
import { ProductRepository } from '../repository/product.repository';
import { ICreateProduct } from '../dto/product.dto';
import { Product } from '../model/product.entity';
import { ConflictException } from '../../core/exception/custom.exception';

@Injectable()
export class ProductService {
  constructor(
    @InjectConnection() private readonly sequelize: Sequelize,
    @Inject(ProductRepository) private productRepository: ProductRepository,
  ) {}

  async createProduct(productInfo: ICreateProduct) {
    const { sku } = productInfo;
    const existProduct = await this.findBySku(sku);
    if (existProduct) {
      throw new ConflictException('Product', 'sku');
    }
    const newProduct = await this.productRepository.create(productInfo);
    return newProduct;
  }

  async findBySku(sku: string): Promise<Product | null> {
    return await this.productRepository.findOne({ where: { sku } });
  }
}
