import sharp, { OutputInfo } from 'sharp';
import path from 'path';
import fs from 'fs';
// import ExpressError from '../utils/ExpressError';

const ImgsFullPath = path.join(process.cwd(), 'public', 'imgs', 'full');
const ImgsThumbPath = path.join(process.cwd(), 'public', 'imgs', 'thumb');

export const getFullImgPath = (filename: string): string => {
  return path.join(ImgsFullPath, `${filename}.jpg`);
};

export const getCachedImgPath = (
  filename: string,
  width: number,
  height: number
): string => {
  return path.join(ImgsThumbPath, `${filename}_${width}_${height}.jpg`);
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
  width: number,
  height: number
): boolean => {
  if (fs.existsSync(getCachedImgPath(filename, width, height))) {
    return true;
  }
  return false;
};
export const cachedImgExistsByPath = (path: string): boolean => {
  if (fs.existsSync(path)) {
    return true;
  }
  return false;
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
