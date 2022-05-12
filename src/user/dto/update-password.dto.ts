import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class UpdatePasswordDto {
  @Length(6, 16, { message: '密码长度为6-16' })
  @IsNotEmpty({ message: '密码不能为空' })
  oldPwd: string;

  @Length(6, 16, { message: '密码长度为6-16' })
  @IsNotEmpty()
  newPwd: string;

  @Length(6, 16, { message: '密码长度为6-16' })
  @IsNotEmpty()
  confirmPwd: string;
}
