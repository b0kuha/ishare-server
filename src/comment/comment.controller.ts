import { ReturnModelType } from '@typegoose/typegoose';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { InjectModel } from 'nestjs-typegoose';
import { Comment } from '@app/db/model/comment.model';
import { Reply } from '@app/db/model/reply.model';
import { User } from '@app/db/model/user.model';

@ApiTags('评论')
@Controller('comment')
export class CommentController {
  constructor(
    @InjectModel(Comment) private commentModel: ReturnModelType<typeof Comment>,
    @InjectModel(Reply) private replyModel: ReturnModelType<typeof Reply>,
    @InjectModel(User) private userModel: ReturnModelType<typeof User>,
  ) {}

  @Post('parent')
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() createCommentDto: CreateCommentDto, @Req() req) {
    const res = await this.commentModel.create({
      ...createCommentDto,
      user: req.user._id,
    });

    return {
      data: res,
    };
  }

  @Post('child')
  @UseGuards(AuthGuard('jwt'))
  async createChild(@Body() params: any, @Req() req) {
    console.log('createChild', params);

    const comment = await this.commentModel.findById(params.id);

    let newReply = await this.replyModel.create({
      type: params.type,
      object: params.object,
      user: req.user._id,
      reply_user: params.reply_user,
      content: params.content,
    });

    const res = await this.commentModel.findByIdAndUpdate(comment._id, {
      $push: {
        replies: {
          _id: newReply._id,
        },
      },
    });

    return {
      data: res,
    };
  }

  @Get('list')
  async movieCommentList(@Query('query') query: string) {
    const params = JSON.parse(query);
    let data = await this.commentModel
      .find(params.where)
      .setOptions(params)
      .populate('user replies');

    const t1 = await this.commentModel.find(params.where).count();
    const t2 = await this.replyModel.find(params.where).count();
    return {
      data,
      total: t1 + t2,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const res = await this.commentModel.findById(id);
    return {
      data: res,
    };
  }

  @Patch()
  async update(@Body() params) {
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
