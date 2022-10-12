import { Request, Response } from 'express';

import ExpressError from '../utils/ExpressError';
import * as ImgProc from '../modules/imageProcessing';

export const getImage = async (req: Request, res: Response) => {
  const filename = <string>req.query.filename;
  const width = parseInt(<string>req.query.width);
  const height = parseInt(<string>req.query.height);

  //check if the full image does not exist
  if (!ImgProc.fullImgExists(filename)) {
    throw new ExpressError('Image not found', 400);
  }

  //loading full image if neither height or width is provided
  if (isNaN(height) && isNaN(width)) {
    console.log('Loaded full image: ' + ImgProc.getFullImgPath(filename));
    return res.sendFile(ImgProc.getFullImgPath(filename));
  }

  const processedPath = ImgProc.getCachedImgPath(filename, width, height);
  //loading processed image if it exists
  if (ImgProc.cachedImgExistsByPath(processedPath)) {
    console.log('Loaded cached image: ' + processedPath);
    return res.sendFile(processedPath);
  }
  try {
    //process and upload image
    const processedImage = ImgProc.resizeImage(filename, width, height);
    await ImgProc.cacheImage(processedImage, processedPath);

    console.log('Processed and cached image: ' + processedPath);
    return res.sendFile(processedPath);
  } catch (e) {
    throw new ExpressError('Could not process the image', 500);
  }
};
