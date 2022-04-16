import { IsNotEmpty, Length } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @Length(6, 16, { message: '密码长度为6-16' })
  @IsNotEmpty({ message: '密码不能为空' })
  oldPassword: string;

  @Length(6, 16, { message: '密码长度为6-16' })
  newPassword: string;

  @Length(6, 16, { message: '密码长度为6-16' })
  confirmPassword: string;
}
