import * as OSS from 'ali-oss';
const mime = require('mime-types');

export function getContentType(file) {
  return (
    file.mimetype.split('/')[0] + file.originalname.split('.')[1] ||
    file.mimetype
  );
}

export function useFilePath(file) {
  const ossPath = `${file.filename}.${file.originalname.split('.')[1]}`;
  const localPath = file.path;
  return [ossPath, localPath];
}

export function useOriginFilePath(file) {
  const ossPath = file.originalname;
  const localPath = file.path;
  return [ossPath, localPath];
}

export function filterSize(size: number) {
  if (!size) return '-';
  if (size < pow1024(1)) return size + ' B';
  if (size < pow1024(2)) return (size / pow1024(1)).toFixed(2) + ' KB';
  if (size < pow1024(3)) return (size / pow1024(2)).toFixed(2) + ' MB';
  if (size < pow1024(4)) return (size / pow1024(3)).toFixed(2) + ' GB';
  return (size / pow1024(4)).toFixed(2) + ' TB';
}

function pow1024(num: number) {
  return Math.pow(1024, num);
}
