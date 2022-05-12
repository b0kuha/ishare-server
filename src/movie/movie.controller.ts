import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@ApiTags('视频')
@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createMovieDto: CreateMovieDto, @Req() req) {
    createMovieDto.user = req.user._id;
    return this.movieService.create(createMovieDto);
  }

  @Get()
  list(@Query() queryParams) {
    return this.movieService.list(queryParams);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movieService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.movieService.update(id, updateMovieDto);
  }
}
