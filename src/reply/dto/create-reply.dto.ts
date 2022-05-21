import { IsNotEmpty } from 'class-validator';
export class CreateReplyDto {
  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  reply_user: string;
}
