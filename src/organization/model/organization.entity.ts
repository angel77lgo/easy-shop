import { DataTypes } from 'sequelize';
import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { User } from '../../user/model/user.entity';
import { Product } from '../../product/model/product.entity';

@Table({ freezeTableName: true })
export class Organization extends Model {
  @Column({
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  })
  declare id: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  declare organizationName: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  })
  declare document: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: true,
  })
  declare logo: string;

  @HasMany(() => User)
  declare users: User[];

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

  @Column({
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null,
  })
  declare deletedAt: Date;
}
