import { User } from 'libs/db/src/model/user.model';
import { QueryParamsDto } from './dto/query-params.dto';
import { ReturnModelType } from '@typegoose/typegoose';
import { Movie } from '@app/db/model/movie.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(Movie)
    private readonly movieModel: ReturnModelType<typeof Movie>,
  ) {}

  async create(createMovieDto: CreateMovieDto) {
    const data = await this.movieModel.create(createMovieDto);
    return data;
  }

  async findAll({ title, user, current, size }: QueryParamsDto) {
    let params = {};
    current = current ? current : 1;
    size = size ? size : 10;

    if (title || user) {
      params = {
        $or: [
          title ? { title: new RegExp(title) } : '',
          user ? { user: new RegExp(user) } : '',
        ],
      };
    }

    const res = await this.movieModel
      .find(params)
      .skip((current - 1) * size)
      .limit(size)
      .populate('user movie');
    return res;
  }

  async findOne(id: number) {
    return await this.movieModel.findOne({ _id: id });
  }

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    return this.movieModel.updateOne({ _id: id, update: updateMovieDto });
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }
}
