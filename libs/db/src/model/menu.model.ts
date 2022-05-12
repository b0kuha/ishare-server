import { prop, Ref, modelOptions } from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Menu {
  @prop({ required: true })
  menuName: string;

  @prop({ required: true })
  path: string;

  @prop({ ref: 'Menu' })
  parent: Ref<Menu>;

  @prop()
  desc: string;
}
