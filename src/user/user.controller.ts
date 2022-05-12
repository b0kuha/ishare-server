import { ApiTags, ApiOperation } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  Req,
  UseGuards,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryParamsDto } from './dto/query-params.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('用户')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '用户注册' })
  @Post('/register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(@Query() queryParams: QueryParamsDto) {
    return this.userService.findAll(queryParams);
  }

  @Patch()
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('updatePwd')
  updatePassword(@Body() updatePasswordDto: UpdatePasswordDto, @Req() req) {
    return this.userService.updatePassword(updatePasswordDto, req.user);
  }

  @Patch('resetPwd/:id')
  resetPassword(@Param('id') id: string) {
    return this.userService.resetPassword(id);
  }
}
