import { DataTypes } from 'sequelize';
import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Product } from '../../product/model/product.entity';
import { ShoppingCart } from '../../shopping-cart/model/shopping-cart.entity';

@Table({ freezeTableName: true })
export class ProductShoppingCart extends Model {
  @Column({
    type: DataTypes.UUIDV4,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  })
  declare id: string;

  @ForeignKey(() => Product)
  @Column({ type: DataTypes.UUID, allowNull: false })
  declare productId: string;

  @BelongsTo(() => Product)
  declare product: Product;

  @Column({ type: DataTypes.INTEGER, allowNull: false })
  declare quantity: number;

  @Column({ type: DataTypes.DECIMAL(10, 2), allowNull: false })
  declare subtotal: number;

  @HasMany(() => ShoppingCart)
  declare shoppingCarts: ShoppingCart[];

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
