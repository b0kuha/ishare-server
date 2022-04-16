import { Min } from 'class-validator';

export class PageType {
  @Min(1, { message: '每页数量不能小于1' })
  pageSize: number;

  @Min(1, { message: '页码不能小于1' })
  page: number;
}
