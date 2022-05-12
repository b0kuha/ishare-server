import { Type } from 'class-transformer';

export class QueryParamsDto {
  menuName?: string;
  @Type(() => Number)
  current?: number = 1;
  @Type(() => Number)
  size?: number = 10;
}
