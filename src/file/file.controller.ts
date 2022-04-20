import { AuthGuard } from '@nestjs/passport';
import { FileService } from './file.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  Param,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@ApiTags('文件')
@Controller('file')
export class FileController {
  constructor(
    private readonly httpService: HttpService,
    private readonly fileService: FileService,
  ) {}

  @ApiOperation({ summary: '文件上传' })
  @UseInterceptors(FileInterceptor('file'))
  @Post('upload')
  upload(@UploadedFile('file') file) {
    return this.fileService.upload(file);
  }

  @ApiOperation({ summary: '多文件上传' })
  @UseInterceptors(FilesInterceptor('files'))
  @Post('uploads')
  uploadFiles(@UploadedFiles() files) {
    return files.map((item) => ({
      name: item.fieldname,
      path: item.path,
      size: item.size,
    }));
  }

  @Get('token')
  getToken() {
    return this.fileService.getToken();
  }

  // 启用oss 下载需要做临时验证
  @Get('oss:file')
  signatureUrl(@Param() params: { file: string }) {
    this.fileService.signatureUrl(params.file);
  }

  @Get('httpUser')
  async getIpAddress() {
    const value = await this.httpService
      .get('https://api.gmit.vip/Api/UserInfo?format=json')
      .toPromise();
    return { ...value.data };
  }
}
