import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { CreateReplyDto } from './dto/create-reply.dto';
import { Reply } from '@app/db/model/reply.model';

@ApiTags('回复')
@Controller('reply')
export class ReplyController {
  constructor(
    @InjectModel(Reply)
    private readonly replyModel: ReturnModelType<typeof Reply>,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() createReplyDto: CreateReplyDto, @Req() { user }) {
    const data = await this.replyModel.create({
      ...createReplyDto,
      user: user._id,
    });
    return {
      data,
    };
  }

  @Get()
  async findAll(@Query('query') query: string) {
    let params = JSON.parse(query);

    const data = await this.replyModel
      .find(params.where)
      .setOptions(params)
      .populate('user reply_user');

    const total = await this.replyModel.find(params.where).count();

    return {
      data,
      total,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.replyModel.findById(id).populate('user reply_user');
    return {
      data,
    };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateReplyDto) {
    const data = await this.replyModel.findByIdAndUpdate(id, updateReplyDto);
    return {
      data,
    };
  }
}
