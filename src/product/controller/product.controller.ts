import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import type { ICreateProduct } from '../dto/product.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('/api/product')
export class ProductController {
  constructor(@Inject(ProductService) private productService: ProductService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  async createProduct(@Body() productInfo: ICreateProduct) {
    return await this.productService.createProduct(productInfo);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  async getAllProducts() {
    return await this.productService.getAllProducts();
  }
}
