import { ReturnModelType } from '@typegoose/typegoose';
import { Menu } from '@app/db/model/menu.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { QueryParamsDto } from './dto/query-params.dto';

@Injectable()
export class MenuService {
  constructor(
    @InjectModel(Menu) private readonly menuModel: ReturnModelType<typeof Menu>,
  ) {}

  async create(createMenuDto: CreateMenuDto) {
    if (!createMenuDto?.parent) {
      delete createMenuDto.parent;
    }
    const res = await this.menuModel.create(createMenuDto);
    return {
      data: res,
    };
  }

  async findAll(queryParams: QueryParamsDto) {
    let menuName = queryParams?.menuName || '',
      current = queryParams?.current || 1,
      size = queryParams?.size || 10;

    let filter = {
      menuName: new RegExp(menuName, 'ig'),
      parent: null,
    };
    // if (!menuName) {
    //   filter = {
    //     menuName: new RegExp(menuName, 'ig'),
    //   };
    // }

    // const res = await this.menuModel
    //   .find(filter)
    //   .skip((current - 1) * size)
    //   .limit(size)
    //   .sort({
    //     createAt: 1,
    //   })
    //   .populate('parent');
    const total = await this.menuModel.find(filter).count();

    const res = await this.menuModel.aggregate([
      {
        $match: filter,
      },
      {
        $lookup: {
          from: 'menus',
          localField: '_id',
          foreignField: 'parent',
          as: 'children',
        },
      },
      {
        $addFields: {
          children: {
            $map: {
              input: '$children',
              in: '$$this',
            },
          },
        },
      },
      {
        $skip: (current - 1) * size,
      },
      {
        $limit: +size,
      },
    ]);

    return {
      data: res,
      total,
    };
  }

  async queryTopMenuList() {
    const res = await this.menuModel.find({
      parent: null,
    });
    return {
      data: res,
    };
  }

  async update(id: string, updateMenuDto: UpdateMenuDto) {
    const res = await this.menuModel.findByIdAndUpdate(id, updateMenuDto);
    return {
      data: res,
    };
  }

  async remove(id: string) {
    const res = await this.menuModel.findByIdAndDelete(id);
    return {
      data: res,
    };
  }

  async queryAllMenuList() {
    const res = await this.menuModel.aggregate([
      {
        $match: {
          parent: null,
        },
      },
      {
        $lookup: {
          from: 'menus',
          localField: '_id',
          foreignField: 'parent',
          as: 'children',
        },
      },
      {
        $addFields: {
          children: {
            $map: {
              input: '$children',
              in: '$$this',
            },
          },
        },
      },
    ]);

    return {
      data: res,
    };
  }
}
