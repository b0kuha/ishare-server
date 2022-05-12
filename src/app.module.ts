import { CommonModule } from './../../server/libs/common/src/common.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CommentModule } from './comment/comment.module';
import { MovieModule } from './movie/movie.module';
import { FileModule } from './file/file.module';
import { ReplyModule } from './reply/reply.module';
import { MenuModule } from './menu/menu.module';
import { RoleModule } from './role/role.module';
import { PermModule } from './perm/perm.module';
import { DictModule } from './dict/dict.module';

@Module({
  imports: [
    CommonModule,
    UserModule,
    AuthModule,
    CommentModule,
    MovieModule,
    FileModule,
    ReplyModule,
    MenuModule,
    RoleModule,
    PermModule,
    DictModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
