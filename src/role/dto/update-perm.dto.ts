import { IsNotEmpty } from 'class-validator';

export class UpdatePermDto {
  @IsNotEmpty()
  id: string;
  menu: string[] = [];
}
