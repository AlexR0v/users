import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { AuthUserDto } from './dto/auth-user.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('/login')
  login(@Body() userDto: AuthUserDto) {
    return this.authService.login(userDto)
  }

  @Post('/registration')
  register(@Body() userDto: CreateUserDto) {
    return this.authService.register(userDto)
  }
}
