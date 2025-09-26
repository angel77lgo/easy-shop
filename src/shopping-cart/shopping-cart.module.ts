import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ShoppingCart } from './model/shopping-cart.entity';

@Module({ imports: [SequelizeModule.forFeature([ShoppingCart])] })
export class ShoppingCartModule {}
