import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CreateDictDto } from './dto/create-dict.dto';
import { Dict } from '@app/db/model/dict.model';

@Controller('dict')
export class DictController {
  constructor(
    @InjectModel(Dict) private readonly dictModel: ReturnModelType<typeof Dict>,
  ) {}

  @Post()
  async create(@Body() createDictDto: CreateDictDto) {
    const data = await this.dictModel.create(createDictDto);
    return {
      data,
    };
  }

  @Post('children/:id')
  async createChild(
    @Param('id') id: string,
    @Body() createDictDto: CreateDictDto,
  ) {
    let dict = await this.dictModel.findById(id);
    let newDict = await this.dictModel.create(createDictDto);
    let data = await this.dictModel.findByIdAndUpdate(dict._id, {
      $push: {
        children: newDict._id,
      },
    });
    return {
      data,
    };
  }

  @Get()
  async findAll(@Query('query') query: string) {
    let params = JSON.parse(query);

    const data = await this.dictModel
      .find(params.where)
      .setOptions(params)
      .populate('children');

    const total = await this.dictModel.find(params.where).count();
    return {
      data,
      total,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.dictModel.findById(id);
    return {
      data,
    };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDictDto) {
    const data = await this.dictModel.findByIdAndUpdate(id, updateDictDto);
    return {
      data,
    };
  }
}
