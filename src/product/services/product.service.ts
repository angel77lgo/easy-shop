import { Inject, Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize';
import { ProductRepository } from '../repository/product.repository';
import { ICreateProduct } from '../dto/product.dto';
import { Product } from '../model/product.entity';
import {
  ConflictException,
  NotFoundException,
} from '../../core/exception/custom.exception';
import { Brand } from '../../brand/model/brand.entity';
import { BrandService } from '../../brand/services/brand.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectConnection() private readonly sequelize: Sequelize,
    @Inject(ProductRepository) private productRepository: ProductRepository,
    @Inject(BrandService) private brandService: BrandService,
  ) {}

  async createProduct(productInfo: ICreateProduct) {
    const { sku, brandId } = productInfo;
    const existProduct = await this.findBySku(sku);
    if (existProduct) {
      throw new ConflictException('Product', 'sku');
    }
    const brand = await this.brandService.findBrandById(brandId);
    if (!brand) {
      throw new NotFoundException('Brand not found');
    }
    const newProduct = await this.productRepository.create(productInfo);
    return newProduct;
  }

  async findBySku(sku: string): Promise<Product | null> {
    return await this.productRepository.findOne({ where: { sku } });
  }

  async getAllProducts() {
    const products = await this.productRepository.findAll({
      include: [{ model: Brand, attributes: ['id', 'name'] }],
    });
    return products;
  }
}
