import { Min } from 'class-validator';

export class UserListDto {
  queryParams?: any;

  @Min(1, { message: '不能小于1' })
  readonly page?: number;

  @Min(1, { message: '不能小于1' })
  readonly pageSize?: number;
}
