import { Module } from '@nestjs/common';
import { ReplyController } from './reply.controller';

@Module({
  controllers: [ReplyController],
})
export class ReplyModule {}
