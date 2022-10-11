import * as ImgProc from '../../modules/imageProcessing';

describe('testing image processing module:', () => {
  describe('testing image existence checking', () => {
    const filename = 'fjord';
    const notExistFilename = 'blablaah';
    const cachedFilename = filename + '_54_143';
    const notExistCachedFilename = notExistFilename + '_54_143';

    it(`returns true when checking if full image with file name '${filename}' exists`, async () => {
      await expect(ImgProc.fullImgExists(filename)).toBeTrue();
    });

    it(`returns false when checking if full image with file name '${notExistFilename}' exists`, async () => {
      await expect(ImgProc.fullImgExists(notExistFilename)).toBeFalse();
    });

    it(`returns true when cachedImgExists(${cachedFilename}) with file name '${cachedFilename}' that exist`, async () => {
      await expect(ImgProc.cachedImgExists(cachedFilename)).toBeTrue();
    });

    it(`returns true when cachedImgExists(${filename}, 54, 143) with file name '${filename}' that exist`, async () => {
      await expect(ImgProc.cachedImgExists(filename, 54, 143)).toBeTrue();
    });

    it(`returns false when cachedImgExists(${notExistCachedFilename}) with file name '${notExistCachedFilename}' that does not exist`, async () => {
      await expect(ImgProc.cachedImgExists(notExistCachedFilename)).toBeFalse();
    });

    it(`returns false when cachedImgExists(${notExistFilename}, 54, 143) with file name '${notExistFilename}' that does not exist`, async () => {
      await expect(
        ImgProc.cachedImgExists(notExistCachedFilename, 54, 143)
      ).toBeFalse();
    });
  });
});
