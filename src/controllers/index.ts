import { Request, Response } from 'express';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import ExpressError from '../utils/ExpressError';

const imagesFullPath = path.join(process.cwd(), 'public', 'images', 'full');
const imagesThumbPath = path.join(process.cwd(), 'public', 'images', 'thumb');

export const getImage = async (req: Request, res: Response) => {
  const { filename, width, height } = req.query;
  const imagePath = path.join(imagesFullPath, <string>filename + '.jpg');

  if (!fs.existsSync(imagePath)) {
    throw new ExpressError('Error: file not found', 400);
  }
  //loading full image if neither height and width is provided
  if (height == null && width == null) {
    console.log('Loaded full image: ' + imagePath);
    return res.sendFile(imagePath);
  }
  // a processed path string for the image
  const processedPath = path.join(
    imagesThumbPath,
    `${filename}_${width}_${height}.jpg`
  );

  //loading processed image if it exists
  if (fs.existsSync(processedPath)) {
    console.log('Loaded processed image: ' + imagePath);
    return res.sendFile(processedPath);
  }
  try {
    //process and upload image
    await sharp(imagePath)
      .resize({
        width: parseInt(<string>width),
        height: parseInt(<string>height),
      })
      .toFile(processedPath);

    console.log('Processed and uploaded image: ' + processedPath);
    return res.sendFile(processedPath);
  } catch (e) {
    throw new ExpressError('Error: could not process image' + e, 500);
  }
};
