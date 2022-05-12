import { ReturnModelType } from '@typegoose/typegoose';
import { Dict } from '@app/db/model/dict.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { CreateDictDto } from './dto/create-dict.dto';
import { UpdateDictDto } from './dto/update-dict.dto';

@Injectable()
export class DictService {
  constructor(
    @InjectModel(Dict) private readonly dictModel: ReturnModelType<typeof Dict>,
  ) {}

  async create(createDictDto: CreateDictDto) {
    const res = await this.dictModel.create(createDictDto);
    return {
      data: res,
    };
  }

  async findAll(params) {
    let current = params?.current || 1,
      size = params?.size || 10,
      label = params?.label || '',
      value = params?.value || '';

    let filter = {
      $or: [{ label: { $regex: label } }, { value: { $regex: value } }],
    };
    const res = await this.dictModel
      .find(filter)
      .setOptions({
        limit: size,
        skip: (current - 1) * size,
      })
      .populate('children');
    const total = await this.dictModel.find(filter).count();
    return {
      data: res,
      total,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} dict`;
  }

  update(id: number, updateDictDto: UpdateDictDto) {
    return `This action updates a #${id} dict`;
  }

  remove(id: number) {
    return `This action removes a #${id} dict`;
  }
}
