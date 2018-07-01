const sharp = require("sharp");
const mkdirp = require("mkdirp");
const { stat, writeFile } = require("fs");
const { promisify } = require("util");
const path = require("path");

const mkdir = promisify(mkdirp);
const write = promisify(writeFile);

module.exports = async (iconPath, round) => {
  const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

  const fromPath = path.resolve(process.cwd(), iconPath);
  const destPath = path.resolve(process.cwd(), "resources/icons");

  await mkdir(destPath);

  const iconsJson = [];

  await Promise.all(
    sizes.map(async size => {
      let image = sharp(fromPath).resize(size);

      const roundedCorners = Buffer.from(
        `<svg><rect x="0" y="0" width="${size}" height="${size}" rx="${size /
          6}" ry="${size / 6}"/></svg>`
      );

      if (round) {
        image = image.overlayWith(roundedCorners, { cutout: true });
      }

      await image.png().toFile(path.resolve(destPath, `icon-${size}.png`));

      iconsJson.push(`    {
      "src": "resources/icons/icon-${size}.png",
      "sizes": "${size}x${size}",
      "type": "image/png"
    }`);
    })
  );

  await write(
    path.resolve(process.cwd(), "resources/icons.json"),
    `{
  "icons": [
${iconsJson.join(",\n")}
  ]
}`,
    "utf8"
  );
};
