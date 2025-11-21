import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import type { ICreateProduct } from '../dto/product.dto';

@Controller('/api/product')
export class ProductController {
  constructor(@Inject(ProductService) private productService: ProductService) {}

  @Post()
  async createProduct(@Body() productInfo: ICreateProduct) {
    return await this.productService.createProduct(productInfo);
  }

  @Get()
  async getAllProducts() {
    return await this.productService.getAllProducts();
  }
}
