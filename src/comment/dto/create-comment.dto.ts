import { IsNotEmpty, isNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  object: string;

  @IsNotEmpty({ message: '评论不能为空' })
  content: string;
}
