import { BelongsToMany, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'
import { User } from '../users/users.model'
import { Role } from './role.model'

@Table({tableName: 'user_roles', updatedAt: false, createdAt: false})
export class UserRoles extends Model<UserRoles> {

  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  id: number

  @ForeignKey(() => Role)
  @Column({type: DataType.INTEGER,})
  roleId: number

  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER})
  userId: number

}
