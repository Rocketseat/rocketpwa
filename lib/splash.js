const sharp = require("sharp");
const mkdirp = require("mkdirp");
const { promisify } = require("util");
const path = require("path");

const mkdir = promisify(mkdirp);

module.exports = async (splashPath, fill) => {
  const sizes = [
    { w: 640, h: 1136 },
    { w: 750, h: 1294 },
    { w: 1242, h: 2148 },
    { w: 1125, h: 2436 },
    { w: 1536, h: 2048 },
    { w: 1668, h: 2224 },
    { w: 2048, h: 2732 }
  ];

  const fromPath = path.resolve(process.cwd(), splashPath);
  const destPath = path.resolve(process.cwd(), "resources/splash");

  await mkdir(destPath);

  await Promise.all(
    sizes.map(async size => {
      let image = sharp(fromPath).resize(size.w, size.h);

      if (fill) {
        image = image.background(fill).embed();
      } else {
        image = image.crop(sharp.strategy.entropy);
      }

      await image
        .png()
        .toFile(path.resolve(destPath, `splash-${size.w}x${size.h}.png`));
    })
  );
};
