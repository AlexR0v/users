import { BeforeCreate, BelongsToMany, Column, DataType, DefaultScope, Model, Scopes, Table } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'
import { hashSync } from 'bcryptjs'
import { Role } from '../roles/role.model'
import { UserRoles } from '../roles/user-roles.model'

interface UserCreationAtt {
  email: string
  password: string
  name: string
}

@DefaultScope(() => ({
  attributes: {exclude: ['password']}
}))
@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAtt> {

  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  id: number

  @ApiProperty({example: 'user'})
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  name: string

  @ApiProperty({example: 'user@user.com'})
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false
  })
  email: string

  @ApiProperty({example: '12345'})
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  password: string

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false
  })
  banned: boolean

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  banReason: string

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[]

  @BeforeCreate
  static async hashPassword(user: User) {
    user.password = await hashSync(user.password, 5)
  }
}

