import { modelOptions, prop, Ref } from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Dict {
  @prop({ required: true })
  label: string;

  @prop({ required: true })
  value: string;

  @prop({ ref: () => Dict })
  children: Ref<Dict>[];

  @prop({ default: false })
  is_use: boolean;
}
