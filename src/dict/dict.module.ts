import { Module } from '@nestjs/common';
import { DictController } from './dict.controller';

@Module({
  controllers: [DictController],
  providers: [],
})
export class DictModule {}
