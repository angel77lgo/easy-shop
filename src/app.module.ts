import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from './utils/constants';
import { UserModule } from './user/user.module';
import { OrganizationModule } from './organization/organization.module';
import { RoleModule } from './role/role.module';
import { ProductModule } from './product/product.module';
import { BrandModule } from './brand/brand.module';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { ProductShoppingCartModule } from './product-shopping-cart/product-shopping-cart.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: DB_HOST,
      port: DB_PORT,
      username: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      autoLoadModels: true,
      synchronize: true,
      logging: false,
    }),
    UserModule,
    OrganizationModule,
    RoleModule,
    ProductModule,
    BrandModule,
    ShoppingCartModule,
    ProductShoppingCartModule,
    CoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
