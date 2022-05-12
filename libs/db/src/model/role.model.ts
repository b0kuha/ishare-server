import { Menu } from './menu.model';
import { modelOptions, prop, Ref } from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Role {
  @prop({ required: true })
  roleName: string;

  @prop()
  desc: string;

  @prop({ ref: () => Menu })
  menu: Ref<Menu>[];
}
