import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { join } from 'path';
import * as fs from 'fs';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  emptyDir = (fileUrl) => {
    const files = fs.readdirSync(fileUrl); //读取该文件夹
    files.forEach(function (file) {
      const stats = fs.statSync(fileUrl + '/' + file);
      if (stats.isDirectory()) {
        this.emptyDir(fileUrl + '/' + file);
      } else {
        fs.unlinkSync(fileUrl + '/' + file);
      }
    });
  };

  // 每天晚上11点执行一次
  @Cron(CronExpression.EVERY_12_HOURS)
  clearUploads() {
    // 删除OSS文件和日志文件
    const OSSRootDir = join(__dirname, '../uploads');
    this.logger.debug(OSSRootDir);
    debugger;

    // 日志一般是转存 而不是删除哈，注意 这里只是简单的例子而已
    const accesslogDir = join(__dirname, '../logs/access');
    const appOutDir = join(__dirname, '../logs/app-out');
    const errorsDir = join(__dirname, '../logs/errors');

    this.emptyDir(OSSRootDir);

    this.emptyDir(accesslogDir);
    this.emptyDir(appOutDir);
    this.emptyDir(errorsDir);
  }
}
