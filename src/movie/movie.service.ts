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

  async findAll() {
    const res = await this.movieModel.find();
    return res;
  }

  findOne(id: number) {
    return `This action returns a #${id} movie`;
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    return `This action updates a #${id} movie`;
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }
}
