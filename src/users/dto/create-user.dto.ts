import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
  @ApiProperty({example: 'user@user.com'})
  readonly email: string

  @ApiProperty({example: 'user'})
  readonly password: string

  @ApiProperty({example: '12345'})
  readonly name: string
}
