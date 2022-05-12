import { User } from 'libs/db/src/model/user.model';
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
    @InjectModel(User)
    private readonly userModel: ReturnModelType<typeof User>,
  ) {}

  async create(createMovieDto: CreateMovieDto) {
    const data = await this.movieModel.create(createMovieDto);
    return data;
  }

  async list(queryParams) {
    let title = queryParams?.title || '',
      user = queryParams?.user || '',
      size = queryParams?.size || 10,
      current = queryParams?.current || 1,
      status = queryParams?.status || null;

    let filter = {
      $or: [
        { 'user.nickname': { $regex: user } },
        { title: { $regex: title } },
      ],
    };
    if (status) {
      filter.status = status;
    }

    console.log(queryParams);
    let res = await this.movieModel
      .find(filter)
      .setOptions({
        limit: size,
        skip: (current - 1) * size,
      })
      .populate('user');

    let total = await this.movieModel.find(filter).count();

    // let res = await this.movieModel.aggregate([
    //   {
    //     $lookup: {
    //       from: 'users',
    //       localField: 'user',
    //       foreignField: '_id',
    //       as: 'user',
    //     },
    //   },
    //   {
    //     $match: {
    //       $and: [
    //         {
    //           'user.nickname': new RegExp(user, 'ig'),
    //         },
    //         {
    //           title: new RegExp(title, 'ig'),
    //         },
    //         // {
    //         //   status,
    //         // },
    //       ],
    //     },
    //   },
    //   {
    //     $facet: {
    //       total: [
    //         {
    //           $count: 'total',
    //         },
    //       ],
    //       data: [
    //         {
    //           $limit: size,
    //         },
    //         {
    //           $skip: (current - 1) * size,
    //         },
    //         {
    //           $project: {
    //             user: {
    //               _id: 0,
    //               password: 0,
    //             },
    //           },
    //         },
    //         {
    //           $sort: {
    //             createAt: 1,
    //           },
    //         },
    //       ],
    //     },
    //   },
    // ]);
    // let total = res[0].total.length ? res[0]?.total[0].total : 0;
    // let data = res[0].data;
    return {
      total,
      data: res,
    };
  }

  async findOne(id: string) {
    await this.movieModel.updateOne({ _id: id }, { $set: { views: +1 } });
    const res = await this.movieModel.findOne({ _id: id }).populate('user');
    return {
      data: res,
    };
  }

  async update(id: string, updateMovieDto: UpdateMovieDto) {
    const res = await this.movieModel.findByIdAndUpdate(id, {
      ...updateMovieDto,
    });
    return {
      data: res,
    };
  }
}
