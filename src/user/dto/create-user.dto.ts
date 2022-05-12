import { IsEmail, Length, IsNotEmpty } from 'class-validator';
export class CreateUserDto {
  @IsEmail({ message: '请输入正确邮箱' })
  @IsNotEmpty({ message: '邮箱不能为空' })
  email: string;

  @IsNotEmpty({ message: '密码不能为空' })
  password: string;

  @IsNotEmpty({ message: '确认密码不能为空' })
  confirmPassword: string;

  @IsNotEmpty()
  nickname: string;
}
