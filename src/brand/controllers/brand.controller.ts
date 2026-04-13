import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { BrandService } from '../services/brand.service';
import { Brand } from '../model/brand.entity';
import type { ICreateBrand } from '../dto/brand.dto';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';

@ApiTags('Brands')
@Controller('api/brand')
export class BrandController {
  constructor(@Inject(BrandService) private brandService: BrandService) {}

  @Get()
  @ApiOperation({ summary: 'Find all brands' })
  @ApiQuery({
    name: 'name',
    required: false,
    description: 'Filter by brand name',
  })
  async findAllBrands(@Query('name') name: string): Promise<Brand[]> {
    return await this.brandService.findBrands(name);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new brand' })
  async createBrand(@Body() brand: ICreateBrand): Promise<Brand> {
    return await this.brandService.createBrand(brand);
  }
}
