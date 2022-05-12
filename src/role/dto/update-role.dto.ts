import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateRoleDto } from './create-role.dto';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
  @IsNotEmpty({ message: 'id不能为空' })
  id: string;
  roleName?: string;
  desc?: string;
}
