import { TypegooseModule } from 'nestjs-typegoose';
import { Global, Module } from '@nestjs/common';
import { DbService } from './db.service';
import { User } from './model/user.model';
import { Movie } from './model/movie.model';
import { Comment } from './model/comment.model';

const models = TypegooseModule.forFeature([User, Movie, Comment]);

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
