import { IsNotEmpty, Length, MaxLength } from 'class-validator';

export class CreateMovieDto {
  @IsNotEmpty({ message: '视频标题不能为空' })
  @Length(1, 20, { message: '视频标题不能超过20个字符' })
  title: string;

  @IsNotEmpty({ message: '视频封面不能为空' })
  cover: string;

  @MaxLength(100, { message: '视频简介不能超100字' })
  introduction?: string;

  @IsNotEmpty({ message: '视频不能为空' })
  url: string;

  @IsNotEmpty({ message: '用户不能为空' })
  user: string;
}
