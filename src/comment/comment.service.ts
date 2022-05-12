import { ReturnModelType } from '@typegoose/typegoose';
import { Injectable, Param } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from '@app/db/model/comment.model';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment)
    private readonly commentModel: ReturnModelType<typeof Comment>,
  ) {}

  async create(createCommentDto: CreateCommentDto, user) {
    console.log(user);

    const res = this.commentModel.create({
      ...createCommentDto,
      user: user._id,
    });
    return {
      data: res,
    };
  }

  async getAllComments(params) {
    console.log('getAllComments', params);
    let size = params?.size || 10,
      current = params?.current || 1,
      type = params?.type || '',
      is_delete = params?.is_delete || null;

    if (is_delete !== null) {
      params.is_delete = !!params.is_delete;
    }
    const res = await this.commentModel
      .find(params)
      .setOptions({
        limit: size,
        skip: (current - 1) * size,
      })
      .populate('user object');
    const total = await this.commentModel.find(params).count();
    return {
      data: res,
      total,
    };
  }

  async findOne(id: string) {
    const res = await this.commentModel.findById(id);
    return {
      data: res,
    };
  }

  async update(params) {
    const res = await this.commentModel.updateOne(
      { _id: params.id },
      {
        $set: { is_delete: params.is_delete },
      },
    );
    return {
      data: res,
    };
  }
}
