import { DataTypes } from 'sequelize';
import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Product } from '../../product/model/product.entity';

@Table({ freezeTableName: true })
export class Brand extends Model {
  @Column({
    type: DataTypes.UUIDV4,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  })
  declare id: string;

  @Column({ type: DataTypes.STRING, allowNull: false })
  declare brandName: string;

  @HasMany(() => Product)
  declare products: Product[];

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
