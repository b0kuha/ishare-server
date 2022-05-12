import { Movie } from '@app/db/model/movie.model';
import { ApiProperty } from '@nestjs/swagger';
import { modelOptions, prop, Ref } from '@typegoose/typegoose';
import { User } from './user.model';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Comment {
  @prop({ ref: 'User' })
  user: Ref<User>;

  @ApiProperty({ description: '内容' })
  @prop()
  content: string;

  @prop({ enum: ['Movie', 'Comment'] })
  type: string;

  @ApiProperty({ description: '资源类型' })
  @prop({ refPath: 'type' })
  object: Ref<Comment | Movie>;

  @ApiProperty({ description: '点赞数' })
  @prop({ default: 0 })
  like: number;

  @prop({ default: 0 })
  unlike: number;

  @prop({ default: false })
  is_delete: boolean;
}
