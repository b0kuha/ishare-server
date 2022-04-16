import { diskStorage } from 'multer';
import { MulterModule } from '@nestjs/platform-express';
import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { HttpModule } from '@nestjs/axios';
import { FileService } from './file.service';

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: 'uploads',
      }),
    }),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
