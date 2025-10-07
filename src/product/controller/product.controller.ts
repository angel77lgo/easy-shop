import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import type { ICreateProduct } from '../dto/product.dto';

@Controller('/api/product')
export class ProductController {
  constructor(@Inject(ProductService) private productService: ProductService) {}

  @Post()
  // @UseGuards(AuthG)
  async createProduct(@Body() productInfo: ICreateProduct) {
    return await this.productService.createProduct(productInfo);
  }
}
