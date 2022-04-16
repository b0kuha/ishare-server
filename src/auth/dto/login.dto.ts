import { IsEmail, IsEmpty, Length, IsNotEmpty } from 'class-validator';
export class LoginDto {
  @IsEmail()
  @IsNotEmpty({ message: '邮箱不能为空' })
  email: string;

  @Length(6, 16)
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;
}
