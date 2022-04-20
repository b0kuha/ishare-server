import { Injectable, UploadedFile } from '@nestjs/common';
import * as OSS from 'ali-oss';
import { getContentType, useFilePath } from 'src/utils/file.util';
const StsClient = require('@alicloud/sts-sdk');

@Injectable()
export class FileService {
  client: OSS;
  constructor() {
    this.client = new OSS({
      region: process.env.OSS_REGION,
      accessKeyId: process.env.OSS_ACCESS_KEY_ID,
      accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
      bucket: process.env.OSS_BUCKET,
    });
  }

  async upload(@UploadedFile() file) {
    if (file.size < 5 * 1024 * 1024) {
      return await this.uploadFile(file);
    }
    return await this.multipartUpload(file);
  }

  /**
   * 小文件上传
   * @param file
   * @returns
   */
  async uploadFile(@UploadedFile() file) {
    const [ossPath, localPath] = useFilePath(file);

    const headers = {
      'Content-Type': getContentType(file),
    };
    try {
      const res = await this.client.put(ossPath, localPath, { headers });
      await this.client.putACL(ossPath, 'public-read');
      return {
        url: res.url,
      };
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  async getToken() {
    const sts = new StsClient({
      endpoint: 'sts.aliyuncs.com',
      accessKeyId: process.env.OSS_ACCESS_KEY_ID,
      accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
    });
    const res = await sts.assumeRole(
      process.env.OSS_ROLE_ARN,
      process.env.OSS_ROLE_SESSION_NAME,
    );
    return {
      ...res.Credentials,
    };
  }

  /**
   * 分片上传
   * @param file
   * @returns
   */
  async multipartUpload(@UploadedFile() file) {
    const [ossPath, localPath] = useFilePath(file);

    const progress = (p, _checkpoint) => {
      // Object的上传进度。
      console.log({ percentage: p });
      // 分片上传的断点信息。
      console.log({ _checkpoint });
      return {
        p,
        _checkpoint,
      };
    };

    const headers = {
      // 指定该Object被下载时的网页缓存行为。
      'Cache-Control': 'no-cache',
      // 指定该Object被下载时的名称。
      // 'Content-Disposition': 'example.txt',
      // 指定该Object被下载时的内容编码格式。
      'Content-Encoding': 'utf-8',
      // 指定过期时间，单位为毫秒。
      // 'Expires': '1000',
      // 指定Object的存储类型。
      // 'x-oss-storage-class': 'Standard',
      // 指定Object标签，可同时设置多个标签。
      // 'x-oss-tagging': 'Tag1=1&Tag2=2',
      // 指定初始化分片上传时是否覆盖同名Object。此处设置为true，表示禁止覆盖同名Object。
      'x-oss-forbid-overwrite': 'true',
      'Content-Type': getContentType(file),
    };
    try {
      // 依次填写Object完整路径（例如exampledir/exampleobject.txt）和本地文件的完整路径（例如D:\\localpath\\examplefile.txt）。Object完整路径中不能包含Bucket名称。
      // 如果本地文件的完整路径中未指定本地路径（例如examplefile.txt），则默认从示例程序所属项目对应本地路径中上传文件。
      const result = await this.client.multipartUpload(ossPath, localPath, {
        progress,
        headers,
        // 指定meta参数，自定义Object的元信息。通过head接口可以获取到Object的meta数据。
        // meta: {
        //   year: 2020,
        //   people: 'test',
        // },
      });
      console.log({ result });
      // 填写Object完整路径，例如exampledir/exampleobject.txt。Object完整路径中不能包含Bucket名称。
      // const head = await this.client.head(ossPath);
      // console.log(head);
      return {
        url: result.res.requestUrls[0],
      };
    } catch (e) {
      // 捕获超时异常。
      if (e.code === 'ConnectionTimeoutError') {
        console.log('TimeoutError');
        // do ConnectionTimeoutError operation
      }
      console.log(e);
      return e;
    }
  }
  /**
   * 断点续传
   * @param filePart
   * @returns
   */
  async resumeUpload(@UploadedFile() filePart) {
    const [ossPath, localPath] = useFilePath(filePart);
    let checkpoint;
    // 重试5次
    for (let i = 0; i < 5; i++) {
      try {
        const result = await this.client.multipartUpload(ossPath, localPath, {
          checkpoint,
          async progress(percentage, cpt) {
            checkpoint = cpt;
          },
        });
        console.log({ result });
        // break; // break if success
        return result;
      } catch (e) {
        console.log(e);
        return e;
      }
    }
  }
  async signatureUrl(filePath) {
    const url = await this.client.signatureUrl(filePath, {
      expires: 3600,
    });

    return {
      url,
    };
  }

  // oss 断点上传
  private async resumeUpload2(ossPath: string, localPath: string) {
    let checkpoint: any = 0;
    let bRet = '';
    for (let i = 0; i < 3; i++) {
      try {
        let result = this.client.get().multipartUpload(ossPath, localPath, {
          checkpoint,
          async progress(percent: number, cpt: any) {
            checkpoint = cpt;
          },
        });
        // 将文件设置为公共可读
        await this.client.putACL(ossPath, 'public-read');
        bRet = result.url;
        break;
      } catch (error) {
        // console.log(error)
      }
    }
    console.log('resumeUpload:::::', bRet);
    return bRet;
  }
  /**
   * 删除一个文件
   */
  public async deleteOne(filepath: string) {
    if (filepath == null) {
      return;
    }
    try {
      let result = this.client.delete(filepath);
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * 删除多个文件
   * @param filepathArr
   */
  public async deleteMulti(filepathArr: string[]): Promise<void> {
    try {
      let result = this.client.deleteMulti(filepathArr, { quiet: true });
      // console.log(result);
    } catch (e) {
      console.log(e);
    }
  }
  /**
   * 获取文件的url
   * @param filePath
   */
  public async getFileSignatureUrl(filePath: string): Promise<string> {
    if (filePath == null) {
      console.log('get file signature failed: file name can not be empty');
      return null;
    }
    let result = '';
    try {
      result = this.client.signatureUrl(filePath, { expires: 36000 });
    } catch (err) {
      console.log(err);
    }

    return result;
  }
  // 判断文件是否存在
  public async existObject(ossPath: string): Promise<boolean> {
    try {
      let result = this.client.get(ossPath);
      if (result.res.status == 200) {
        return true;
      }
    } catch (e) {
      if (e.code == 'NoSuchKey') {
        return false;
      }
    }
    return false;
  }
}
