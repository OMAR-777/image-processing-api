import sharp, { OutputInfo, Sharp } from 'sharp';
import path from 'path';
import fs from 'fs';
// import ExpressError from '../utils/ExpressError';
const cacheFolderName = 'thumb';
const ImgsFullPath = path.join(process.cwd(), 'public', 'imgs', 'full');
const ImgsCachePath = path.join(
  process.cwd(),
  'public',
  'imgs',
  cacheFolderName
);

export const getFullImgPath = (filename: string): string => {
  return path.join(ImgsFullPath, `${filename}.jpg`);
};

export const getCachedImgPath = (
  filename: string,
  width?: number,
  height?: number
): string => {
  if (width && height)
    return path.join(ImgsCachePath, `${filename}_${width}_${height}.jpg`);
  return path.join(ImgsCachePath, `${filename}.jpg`);
};

export const fullImgExists = (filename: string): boolean => {
  if (fs.existsSync(getFullImgPath(filename))) {
    return true;
  }
  return false;
};

export const fullImgExistsByPath = (path: string): boolean => {
  if (fs.existsSync(path)) {
    return true;
  }
  return false;
};

export const cachedImgExists = (
  filename: string,
  width?: number,
  height?: number
): boolean => {
  if (width && height)
    return fs.existsSync(getCachedImgPath(filename, width, height));
  return fs.existsSync(getCachedImgPath(filename));
};

export const cachedImgExistsByPath = (path: string): boolean => {
  if (fs.existsSync(path)) {
    return true;
  }
  return false;
};

export const resizeImage = (
  filename: string,
  width: number,
  height: number
): Sharp => {
  return sharp(getFullImgPath(filename)).resize({
    width: width,
    height: height,
  });
};

export const cacheImage = async (
  sharp: Sharp,
  processedPath: string
): Promise<OutputInfo> => {
  ensureCacheDirCreated();
  return await sharp.toFile(processedPath);
};

export const resizeAndCatchImage = async (
  filename: string,
  width: number,
  height: number
): Promise<OutputInfo> => {
  return await sharp(getFullImgPath(filename))
    .resize({
      width: width,
      height: height,
    })
    .toFile(getCachedImgPath(filename, width, height));
};

const ensureCacheDirCreated = (): void => {
  if (!fs.existsSync(ImgsCachePath)) {
    fs.mkdirSync(ImgsCachePath);
  }
};
