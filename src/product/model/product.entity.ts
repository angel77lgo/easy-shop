import { DataTypes } from 'sequelize';
import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Brand } from '../../brand/model/brand.entity';
import { ProductShoppingCart } from '../../product-shopping-cart/model/product-shopping-cart.entity';

@Table({ freezeTableName: true })
export class Product extends Model {
  @Column({
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  })
  declare id: string;

  @ForeignKey(() => Brand)
  @Column({ type: DataTypes.UUID, allowNull: false })
  declare brandId: string;

  @BelongsTo(() => Brand)
  declare brand: Brand;

  @Column({ type: DataTypes.STRING, allowNull: false })
  declare productName: string;

  @Column({ type: DataTypes.TEXT, allowNull: true })
  declare description: string;

  @Column({ type: DataTypes.INTEGER, allowNull: false })
  declare quantity: number;

  @Column({ type: DataTypes.DECIMAL(10, 2), allowNull: false })
  declare price: number;

  @Column({ type: DataTypes.TEXT, allowNull: true })
  declare image: string;

  @HasMany(() => ProductShoppingCart)
  declare productShoppingCarts: ProductShoppingCart[];

  @Column({
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  })
  declare createdAt: Date;

  @Column({
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  })
  declare updatedAt: Date;

  @Column({ type: DataTypes.DATE, allowNull: true, defaultValue: null })
  declare deletedAt: Date;
}
