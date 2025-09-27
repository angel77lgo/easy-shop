import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Brand } from './model/brand.entity';
import { BrandService } from './services/brand.service';
import { BrandRepository } from './repository/brand.repository';
import { BrandController } from './controllers/brand.controller';

@Module({
  imports: [SequelizeModule.forFeature([Brand])],
  controllers: [BrandController],
  providers: [BrandService, BrandRepository],
  exports: [BrandService],
})
export class BrandModule {}
