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
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from '@app/db/model/movie.model';
import { User } from '@app/db/model/user.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';

@ApiTags('视频')
@Controller('movie')
export class MovieController {
  constructor(
    @InjectModel(Movie)
    private readonly movieModel: ReturnModelType<typeof Movie>,
    @InjectModel(User)
    private readonly userModel: ReturnModelType<typeof User>,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() createMovieDto: CreateMovieDto, @Req() { user }) {
    const data = await this.movieModel.create({
      ...createMovieDto,
      user: user._id,
    });
    return {
      data,
    };
  }

  @Get()
  async list(@Query('query') query: string) {
    let params = JSON.parse(query);
    const data = await this.movieModel
      .find(params.where)
      .setOptions(params)
      .populate('user');
    const total = await this.movieModel.find(params.where).count();
    return {
      data,
      total,
    };
  }

  @Get('m/:id')
  async findOne(@Param('id') id: string) {
    await this.movieModel.updateOne({ _id: id }, { $inc: { views: 1 } });
    const data = await this.movieModel.findById(id).populate('user');
    return {
      data,
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('personal')
  async findUserMovie(@Query('query') query: string, @Req() { user }) {
    let params = JSON.parse(query);

    const data = await this.movieModel
      .find({ user: user._id })
      .setOptions(params)
      .populate('user');

    const total = await this.movieModel.find({ user: user._id }).count();
    return {
      data,
      total,
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    const data = await this.movieModel.findByIdAndUpdate(id, updateMovieDto);
    return {
      data,
    };
  }
}
