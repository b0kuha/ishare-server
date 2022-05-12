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
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from 'nestjs-typegoose';
import { Comment } from '@app/db/model/comment.model';

@ApiTags('评论')
@Controller('comment')
export class CommentController {
  constructor(
    @InjectModel(Comment) private commentModel: ReturnModelType<typeof Comment>,
    private readonly commentService: CommentService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createCommentDto: CreateCommentDto, @Req() req) {
    return this.commentService.create(createCommentDto, req.user);
  }

  @Get()
  getAllComments(@Query() params) {
    return this.commentService.getAllComments(params);
  }

  @Get('list')
  async movieCommentList(@Query('query') query: string) {
    const params = JSON.parse(query);
    console.log(params);
    const res = await this.commentModel
      .find()
      .$where(params.where)
      .setOptions(params)
      .populate('user');
    const total = await this.commentModel.find().$where(params.where).count();
    return {
      data: res,
      total,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(id);
  }

  @Patch()
  update(@Body() params) {
    return this.commentService.update(params);
  }
}
