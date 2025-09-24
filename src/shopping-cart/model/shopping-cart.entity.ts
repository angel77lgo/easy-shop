import { DataTypes } from 'sequelize';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../../user/model/user.entity';
import { ProductShoppingCart } from '../../product-shopping-cart/model/product-shopping-cart.entity';

@Table({ freezeTableName: true })
export class ShoppingCart extends Model {
  @Column({
    type: DataTypes.UUIDV4,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  })
  declare id: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: false })
  declare userId: string;

  @BelongsTo(() => User)
  declare user: User;

  @ForeignKey(() => ProductShoppingCart)
  @Column({ type: DataType.UUID, allowNull: false })
  declare productShoppingCartId: string;

  @BelongsTo(() => ProductShoppingCart)
  declare productShoppingCart: ProductShoppingCart;

  @Column({ type: DataTypes.DECIMAL(10, 2), allowNull: false })
  declare total: number;

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
