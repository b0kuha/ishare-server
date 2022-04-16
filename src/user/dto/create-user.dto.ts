import { IsEmail, Length, IsNotEmpty } from 'class-validator';
export class CreateUserDto {
  @IsEmail({ message: '请输入正确邮箱' })
  @IsNotEmpty({ message: '邮箱不能为空' })
  email: string;

  @Length(6, 16, { message: '密码长度为6-16' })
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;

  @Length(6, 16, { message: '密码长度为6-16' })
  @IsNotEmpty({ message: '确认密码不能为空' })
  confirmPassword: string;
}
