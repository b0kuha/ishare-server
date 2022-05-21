import { modelOptions, prop, Ref } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.model';
import { Movie } from './movie.model';

@modelOptions({
  schemaOptions: {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  },
})
export class Reply {
  @prop({ enum: ['Movie'] })
  type: string;

  @ApiProperty({ description: '资源类型' })
  @prop({ refPath: 'type' })
  object: Ref<Movie>;

  @ApiProperty({ description: '用户' })
  @prop({ ref: () => User, required: true })
  user: Ref<User>;

  @ApiProperty({ description: '回复用户' })
  @prop({ ref: () => User, required: true })
  reply_user: Ref<User>;

  @ApiProperty({ description: '回复内容' })
  @prop({ required: true })
  content: string;

  @ApiProperty({ description: '点赞数' })
  @prop({ default: 0 })
  like: number;

  @prop({ default: 0 })
  unlike: number;

  @prop({ default: false })
  is_delete: boolean;
}
