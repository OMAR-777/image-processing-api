import express from 'express';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
const imagesPath = path.join(__dirname, '..', 'public', 'images');

const app = express();
const port = 3000;

app.get('/', async (req, res) => {
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

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});

const myFunc = (num: number): number => {
  return num * num;
};

export default myFunc;
