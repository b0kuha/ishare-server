import { ApiProperty } from '@nestjs/swagger';
import { modelOptions, prop, Ref } from '@typegoose/typegoose';
import { MovieStatus } from 'src/const/enums/movie.enums';
import { User } from './user.model';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Movie {
  @ApiProperty({ description: '上传用户' })
  @prop({ ref: 'User', required: true })
  user: Ref<User>;

  @ApiProperty({ description: '视频标题' })
  @prop()
  title: string;

  @ApiProperty({ description: '视频封面' })
  @prop()
  cover: string;

  @ApiProperty({ description: '视频URL' })
  @prop({ required: true })
  url: string;

  @ApiProperty({ description: '视频简介' })
  @prop()
  introduction: string;

  @prop({ default: false })
  status: boolean;

  @prop({ default: 0 })
  like: number;

  @prop({ default: 0 })
  unlike: number;

  @prop({ default: 0 })
  views: number;

  // tags:
}
