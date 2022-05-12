import { Min } from 'class-validator';

export class QueryParams {
  query: any;
  page: PageParams;
}

export class PageParams {
  @Min(1, { message: '不能小于1' })
  size: number;
  @Min(1, { message: '不能小于1' })
  current: number;
}
