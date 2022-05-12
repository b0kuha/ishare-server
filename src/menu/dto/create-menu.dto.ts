import { IsNotEmpty } from 'class-validator';

export class CreateMenuDto {
  @IsNotEmpty()
  menuName: string;
  @IsNotEmpty()
  path: string;
  parent?: string;
  desc?: string;
}
