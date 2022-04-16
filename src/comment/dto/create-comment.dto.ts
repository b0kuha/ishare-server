import { IsEmpty } from 'class-validator';

export class CreateCommentDto {
  user: string;

  resourceType: string;

  @IsEmpty({ message: '评论不能为空' })
  content: string;
}
