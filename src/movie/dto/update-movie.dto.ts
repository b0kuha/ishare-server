import { PartialType } from '@nestjs/swagger';
import { CreateMovieDto } from './create-movie.dto';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {
  user: string;
  cover?: string;
  title?: string;
  introduction?: string;
  url?: string;
}
