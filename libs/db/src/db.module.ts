import { Role } from './model/role.model';
import { TypegooseModule } from 'nestjs-typegoose';
import { Global, Module } from '@nestjs/common';
import { DbService } from './db.service';
import { User } from './model/user.model';
import { Movie } from './model/movie.model';
import { Comment } from './model/comment.model';
import { Reply } from './model/reply.model';
import { Menu } from './model/menu.model';
import { Dict } from './model/dict.model';

const models = TypegooseModule.forFeature([
  User,
  Movie,
  Comment,
  Reply,
  Role,
  Menu,
  Dict,
]);

@Global()
@Module({
  imports: [
    TypegooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.DB,
      }),
    }),
    models,
  ],
  providers: [DbService],
  exports: [DbService, models],
})
export class DbModule {}
