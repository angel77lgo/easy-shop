import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { BrandService } from '../services/brand.service';
import { Brand } from '../model/brand.entity';
import type { ICreateBrand } from '../dto/brand.dto';

@Controller('api/brand')
export class BrandController {
  constructor(@Inject(BrandService) private brandService: BrandService) {}

  @Get()
  async findAllBrands(@Query('name') name: string): Promise<Brand[]> {
    return await this.brandService.findBrands(name);
  }

  @Post()
  async createBrand(@Body() brand: ICreateBrand): Promise<Brand> {
    return await this.brandService.createBrand(brand);
  }
}
