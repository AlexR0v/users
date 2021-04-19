import { Body, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthUserDto } from './dto/auth-user.dto'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import { User } from '../users/users.model'
import { compare } from 'bcryptjs'

@Injectable()
export class AuthService {

  constructor(private readonly userService: UsersService, private jwtService: JwtService) {
  }

  async login(userDto: AuthUserDto) {
    const user = await this.validateUser(userDto)
    return this.generateToken(user)
  }

  async register(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email)

    if (candidate) {
      throw new HttpException('User with this email already exists', HttpStatus.BAD_REQUEST)
    }

    const user = await this.userService.createUser(userDto)

    return this.generateToken(user)
  }

  private async generateToken(user: User) {
    const payload = {email: user.email, id: user.id, role: user.roles}
    return {token: this.jwtService.sign(payload)}
  }

  private async validateUser(userDto: AuthUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email)
    if (!user) {
      throw new UnauthorizedException('User does not exist')
    }
    const passwordEquals = await compare(userDto.password, user.password)
    if (user && passwordEquals) {
      return user
    } else {
      throw new UnauthorizedException('User does not exist')
    }
  }
}
