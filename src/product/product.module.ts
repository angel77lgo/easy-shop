import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './model/product.entity';

@Module({ imports: [SequelizeModule.forFeature([Product])] })
export class ProductModule {}
