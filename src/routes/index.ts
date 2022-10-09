import express from 'express';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
const routes = express.Router();

const imagesPath = path.join(process.cwd(), 'public', 'images');

routes.get('/', async (req, res) => {
  const { filename, width, height } = req.query;
  if (filename == null) {
    return res.send('Error: file name not associated');
  }

  const imagePath = path.join(imagesPath, 'full', <string>filename + '.jpg');
  const processedPath = path.join(imagesPath, 'thumb', `${filename}_thumb.jpg`);

  if (!fs.existsSync(imagePath)) {
    return res.send('Error: file name does not exist');
  }

  if (height == null && width == null) {
    return res.sendFile(imagePath);
  }

  // if (fs.existsSync(processedPath)) {
  //   return res.sendFile(processedPath);
  // }

  try {
    const image = await sharp(imagePath);
    if (width) {
      image.resize({
        width: parseInt(<string>width),
      });
    }
    if (height) {
      image.resize({
        height: parseInt(<string>height),
      });
    }

    await image.toFile(processedPath);
    return res.sendFile(processedPath);
  } catch (e) {
    return res.send('Error: could not process image, ' + e);
  }
});

export default routes;