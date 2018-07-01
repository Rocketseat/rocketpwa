const sharp = require("sharp");
const mkdirp = require("mkdirp");
const { promisify } = require("util");
const path = require("path");
const { writeFile } = require("fs");

const mkdir = promisify(mkdirp);
const write = promisify(writeFile);

module.exports = async (splashPath, fill) => {
  const sizes = [
    { w: 640, h: 1136, pixelRatio: 2 },
    { w: 750, h: 1294, pixelRatio: 2 },
    { w: 1242, h: 2148, pixelRatio: 3 },
    { w: 1125, h: 2436, pixelRatio: 3 },
    { w: 1536, h: 2048, pixelRatio: 2 },
    { w: 1668, h: 2224, pixelRatio: 2 },
    { w: 2048, h: 2732, pixelRatio: 2 }
  ];

  const fromPath = path.resolve(process.cwd(), splashPath);
  const destPath = path.resolve(process.cwd(), "resources/splash");

  await mkdir(destPath);

  const htmlSplash = [];

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

      htmlSplash.push(`<link rel="apple-touch-startup-image" media="(device-width: ${size.w /
        size.pixelRatio}px) and (device-height: ${size.h /
        size.pixelRatio}px) and (-webkit-device-pixel-ratio: ${
        size.pixelRatio
      })"
      href="resources/splash/splash-${size.w}x${size.h}.png">`);
    })
  );

  await write(
    path.resolve(process.cwd(), "resources/splash.html"),
    `<meta name="apple-mobile-web-app-capable" content="yes" />
    
${htmlSplash.join("\n")}
    `,
    "utf8"
  );
};
