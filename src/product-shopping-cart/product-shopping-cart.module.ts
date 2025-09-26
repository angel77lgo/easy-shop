import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductShoppingCart } from './model/product-shopping-cart.entity';

@Module({ imports: [SequelizeModule.forFeature([ProductShoppingCart])] })
export class ProductShoppingCartModule {}
