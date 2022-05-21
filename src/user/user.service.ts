import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { compareSync } from 'bcryptjs';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'libs/db/src/model/user.model';
import { QueryParamsDto } from './dto/query-params.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    if (createUserDto.password !== createUserDto.confirmPassword) {
      throw new HttpException('密码不一致', 400);
    }

    const exist = await this.userModel.findOne({ email: createUserDto.email });

    if (exist) {
      throw new HttpException('邮箱已注册', HttpStatus.BAD_REQUEST);
    }

    const newUser = await this.userModel.create(createUserDto);
    return {
      data: newUser,
    };
  }

  async findAll(queryParams: QueryParamsDto) {
    let nickname = queryParams?.nickname || '',
      current = queryParams?.current || 1,
      size = queryParams?.size || 10;

    let filter = {
      nickname: new RegExp(nickname, 'ig'),
    };
    const total = await this.userModel.find(filter).count();

    const res = await this.userModel
      .find(filter)
      .skip((current - 1) * size)
      .limit(size)
      .populate('role');

    return {
      data: res,
      total,
    };
  }

  async update(updateUserDto: UpdateUserDto) {
    const res = await this.userModel.findByIdAndUpdate(
      updateUserDto._id,
      updateUserDto,
    );
    return {
      data: res,
    };
  }

  async remove(id: string) {
    const res = await this.userModel.findByIdAndDelete(id);
    return {
      data: res,
    };
  }

  async updatePassword(updatePasswordDto: UpdatePasswordDto, user) {
    user = await this.userModel
      .findOne({ email: user.email })
      .select('+password');
    if (!user) {
      return;
    }
    if (!compareSync(updatePasswordDto.oldPwd, user.password)) {
      throw new BadRequestException('密码不正确');
    }
    if (updatePasswordDto.newPwd !== updatePasswordDto.confirmPwd) {
      throw new BadRequestException('密码不一致');
    }
    const res = await this.userModel.findOneAndUpdate(
      { email: user.email },
      {
        password: updatePasswordDto.newPwd,
      },
    );
    return {
      data: res,
    };
  }

  async resetPassword(id: string) {
    if (!id) {
      return;
    }
    const data = await this.userModel.findByIdAndUpdate(id, {
      password: '123456',
    });
    return {
      data,
    };
  }
}
