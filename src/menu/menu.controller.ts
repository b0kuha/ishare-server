import { QueryParamsDto } from './dto/query-params.dto';
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
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

@ApiTags('菜单')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }

  @Get()
  findAll(@Query() queryParams: QueryParamsDto) {
    return this.menuService.findAll(queryParams);
  }

  @Get('top')
  queryTopMenuList() {
    return this.menuService.queryTopMenuList();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.update(id, updateMenuDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuService.remove(id);
  }

  @Get('perm')
  queryAllMenuList() {
    return this.menuService.queryAllMenuList();
  }
}
