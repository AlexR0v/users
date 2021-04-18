import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Role } from './role.model'
import { CreateRoleDto } from './dto/create-role.dto'

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private readonly roleRepo: typeof Role) {
  }

  async createRole(dto: CreateRoleDto) {
    return await this.roleRepo.create(dto)
  }

  async getRoleByValue(value: string) {
    return await this.roleRepo.findOne({where: {value}})
  }
}
