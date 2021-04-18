import { Body, Controller, Get, Post } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { User } from './users.model'

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {
  }

  @ApiOperation({summary: 'Return all users'})
  @ApiResponse({status: 200, type: [User]})
  @Get()
  getAllUsers() {
    return this.userService.getAllUsers()
  }

  @ApiOperation({summary: 'Add new user'})
  @ApiResponse({status: 201, type: User})
  @Post()
  createUser(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto)
  }
}
