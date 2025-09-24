import { DataTypes } from 'sequelize';
import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Role } from '../../role/model/role.entity';
import { Organization } from '../../organization/model/organization.entity';
import { ShoppingCart } from '../../shopping-cart/model/shopping-cart.entity';

@Table({ freezeTableName: true })
export class User extends Model {
  @Column({
    type: DataTypes.UUIDV4,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  })
  declare id;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  declare firstName;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  declare lastName;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  })
  declare email;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  declare password;

  @ForeignKey(() => Role)
  @Column({
    type: DataTypes.UUID,
    allowNull: false,
  })
  declare roleId: string;

  @BelongsTo(() => Role)
  declare role: Role;

  @ForeignKey(() => Organization)
  @Column({
    type: DataTypes.UUID,
    allowNull: true,
  })
  declare organizationId: string;

  @BelongsTo(() => Organization)
  declare organization: Organization;

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

  @Column({
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null,
  })
  declare deletedAt: Date;
}
