import { IsNotEmpty, isNotEmpty } from 'class-validator';

export class IdDto {
  @IsNotEmpty({ message: 'id不能为空' })
  readonly id: string;
}
