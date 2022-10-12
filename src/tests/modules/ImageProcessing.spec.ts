import * as ImgProc from '../../modules/imageProcessing';

describe('Testing image processing module:', () => {
  describe('Testing image existence checking', () => {
    const filename = 'fjord';
    const notExistFilename = 'blablaah';
    const width = 54;
    const height = 143;
    const cachedFilename = `${filename}_${width}_${height}`;
    const notExistCachedFilename = `${notExistFilename}_${width}_${height}`;

    beforeAll(async () => {
      const processedPath = ImgProc.getCachedImgPath(cachedFilename);
      const processedImage = ImgProc.resizeImage(filename, width, height);
      await ImgProc.cacheImage(processedImage, processedPath);
    });

    it(`returns true when fullImgExists(${filename}) is called with a file name '${filename}' that exist`, () => {
      expect(ImgProc.fullImgExists(filename)).toBeTrue();
    });

    it(`returns false when fullImgExists(${notExistFilename}) is called with a file name '${notExistFilename}' that does not exist`, () => {
      expect(ImgProc.fullImgExists(notExistFilename)).toBeFalse();
    });

    it(`returns true when cachedImgExists(${cachedFilename}) is called with a file name '${cachedFilename}' that exist`, () => {
      expect(ImgProc.cachedImgExists(cachedFilename)).toBeTrue();
    });

    it(`returns true when cachedImgExists(${filename}, 54, 143) is called with a file name '${filename}' that exist`, () => {
      expect(ImgProc.cachedImgExists(filename, 54, 143)).toBeTrue();
    });

    it(`returns false when cachedImgExists(${notExistCachedFilename}) is called with a file name '${notExistCachedFilename}' that does not exist`, () => {
      expect(ImgProc.cachedImgExists(notExistCachedFilename)).toBeFalse();
    });

    it(`returns false when cachedImgExists(${notExistFilename}, 54, 143) is called with a file name '${notExistFilename}' that does not exist`, () => {
      expect(
        ImgProc.cachedImgExists(notExistCachedFilename, 54, 143)
      ).toBeFalse();
    });
  });
});
