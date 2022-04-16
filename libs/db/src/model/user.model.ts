import { ApiProperty } from '@nestjs/swagger';
import { hashSync } from 'bcryptjs';
import { prop, modelOptions } from '@typegoose/typegoose';
import { Exclude } from 'class-transformer';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class User {
  @ApiProperty({ description: '邮箱' })
  @prop()
  email: string;

  @ApiProperty({ description: '昵称' })
  @prop({ maxlength: 100 })
  nickname: string;

  @ApiProperty({ description: '密码' })
  @Exclude()
  @prop({
    required: true,
    set(val) {
      return val ? hashSync(val) : val;
    },
    select: false,
  })
  password: string;

  @ApiProperty({ description: '头像' })
  @prop({
    default: 'https://mini-ishare.oss-cn-chengdu.aliyuncs.com/avatar.png',
  })
  avatar: string;

  @ApiProperty({ description: '角色' })
  @prop()
  role: string;
}
