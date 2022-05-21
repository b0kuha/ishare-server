import { ReturnModelType } from '@typegoose/typegoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from '@app/db/model/role.model';
import { QueryParamsDto } from './dto/query-params.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role) private readonly roleModel: ReturnModelType<typeof Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const res = await this.roleModel.create(createRoleDto);
    return {
      data: res,
    };
  }

  async findAll(queryParams: QueryParamsDto) {
    let roleName = queryParams?.roleName || '',
      current = queryParams?.current || 1,
      size = queryParams?.size || 10;
    let filter = {};
    if (roleName) {
      filter = { roleName: new RegExp(roleName, 'ig') };
    }
    console.log('role', filter);

    const res = await this.roleModel
      .find(filter)
      .skip((current - 1) * size)
      .limit(size)
      .populate('menu');

    const total = await this.roleModel.find(filter).count();
    return {
      data: res,
      total,
    };
  }

  async update(updateRoleDto: UpdateRoleDto) {
    const res = await this.roleModel.updateOne(updateRoleDto);
    return {
      data: res,
    };
  }

  async remove(id: string) {
    const res = await this.roleModel.findByIdAndDelete(id);
    return {
      data: res,
    };
  }

  async updatePerm(id, updatePerm) {
    const data = await this.roleModel.findByIdAndUpdate(id, updatePerm);
    return {
      data,
    };
  }
}
