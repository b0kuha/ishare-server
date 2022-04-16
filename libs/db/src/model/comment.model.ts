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

  @prop()
  content: string;

  //   @prop()
  //   resourceType: string;
}
