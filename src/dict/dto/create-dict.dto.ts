import { IsNotEmpty } from 'class-validator';
export class CreateDictDto {
  @IsNotEmpty()
  label: string;
  @IsNotEmpty()
  value: string;
}
