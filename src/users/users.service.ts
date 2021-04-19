import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { User } from './users.model'
import { CreateUserDto } from './dto/create-user.dto'
import { RolesService } from '../roles/roles.service'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userRepo: typeof User,
    private readonly roleService: RolesService
  ) {
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    const user = await this.userRepo.create(dto)
    const role = await this.roleService.getRoleByValue('USER')
    await user.$set('roles', [role.id])
    user.roles = [role]
    return await this.userRepo.findOne({
      where: {id: user.id},
      attributes: {exclude: ['password']}
    })
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepo.findAll({include: {all: true}})
  }

  async getUserByEmail(email: string) {
    return await this.userRepo.findOne({where: {email}, include: {all: true}})
  }
}
