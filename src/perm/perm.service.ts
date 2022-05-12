import { ReturnModelType } from '@typegoose/typegoose';
import { Role } from '@app/db/model/role.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export class PermService {
  constructor(
    @InjectModel(Role) private readonly roleModel: ReturnModelType<typeof Role>,
  ) {}

  async getPermMenu(user) {
    const role = await this.roleModel.findById(user.role).populate('menu');
    let menu = role.menu || [];
    return {
      data: menu,
    };
  }
}
