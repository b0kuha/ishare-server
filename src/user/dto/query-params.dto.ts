import { Type } from 'class-transformer';

export class QueryParamsDto {
  nickname?: string;
  @Type(() => Number)
  current?: number = 1;
  @Type(() => Number)
  size?: number = 10;
}
