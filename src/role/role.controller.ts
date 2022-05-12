import { ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { QueryParamsDto } from './dto/query-params.dto';
import { UpdatePermDto } from './dto/update-perm.dto';

@ApiTags('角色')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get()
  findAll(@Query() queryParams: QueryParamsDto) {
    return this.roleService.findAll(queryParams);
  }

  @Patch()
  update(@Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(id);
  }

  @Patch('perm')
  updatePerm(@Body() updatePermDto: UpdatePermDto) {
    return this.roleService.updatePerm(updatePermDto);
  }
}
