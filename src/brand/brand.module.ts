import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Brand } from './model/brand.entity';

@Module({ imports: [SequelizeModule.forFeature([Brand])] })
export class BrandModule {}
