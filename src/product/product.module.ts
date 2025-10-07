import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './model/product.entity';
import { ProductController } from './controller/product.controller';
import { ProductService } from './services/product.service';
import { ProductRepository } from './repository/product.repository';

@Module({
  imports: [SequelizeModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
})
export class ProductModule {}
