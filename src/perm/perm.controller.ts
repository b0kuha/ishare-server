import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { PermService } from './perm.service';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('权限')
@Controller('perm')
export class PermController {
  constructor(private readonly permService: PermService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getPermMenu(@Req() req) {
    return this.permService.getPermMenu(req.user);
  }
}
