import { User } from 'libs/db/src/model/user.model';
import { modelOptions, prop, Ref } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Reply {
  @ApiProperty({ description: '用户' })
  @prop({ ref: 'User' })
  user: Ref<User>;

  @ApiProperty({ description: '回复的评论' })
  @prop({ ref: 'Comment' })
  comment: Ref<Comment>;

  @ApiProperty({ description: '回复内容' })
  @prop()
  content: string;
}
