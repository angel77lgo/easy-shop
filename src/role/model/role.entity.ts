import { DataTypes } from 'sequelize';
import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { User } from '../../user/model/user.entity';

@Table({ freezeTableName: true })
export class Role extends Model {
  @Column({
    type: DataTypes.UUIDV4,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  })
  declare id: string;

  @Column({ type: DataTypes.STRING, allowNull: false })
  declare name: string;

  @HasMany(() => User)
  declare users: User[];

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
