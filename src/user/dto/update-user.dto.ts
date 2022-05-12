import { IsNotEmpty, Length } from 'class-validator';
export class UpdateUserDto {
  @IsNotEmpty()
  _id: string;
  nickname?: string;
  avatar?: string;
  role?: string;
}
