#!/usr/bin/env node

const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
const minimist = require("minimist");
const figures = require("figures");
const icon = require("./lib/icon");
const splash = require("./lib/splash");
const path = require("path");
const fs = require("fs");

const { Spinner } = require("clui");
const { log } = console;

const params = minimist(process.argv.slice(2));

const parametersList = {
  icon: "Icon path in 512x512px (PNG, JPG, SVG)",
  splash: "iOS splash screen path in 2048x2732px (PNG, JPG, SVG)",
  r: "Export icons with rounded corners",
  fill: "Background fill for splash screens"
};

if (params.h === true) {
  clear();

  log(
    chalk.hex("#7159C1").bold(
      figlet.textSync("Rocketseat", {
        font: "Standard"
      })
    )
  );

  log(chalk.green(" RocketPWA parameters: \n"));

  Object.keys(parametersList).forEach(key => {
    log(
      chalk.default(
        ` ${chalk.hex("#7159C1").bold(key)}: ${parametersList[key]}`
      )
    );
  });

  log(chalk.default("\n Example: rocketpwa --icon image.png -r \n"));

  process.exit();
}

if (!params.icon && !params.splash) {
  log(chalk.red("You need provide icon and/or splash parameters."));
  log(chalk.default("Type rocketpwa -h to instructions."));

  process.exit();
}

try {
  const status = new Spinner(chalk.green("Generating resources..."));

  status.start();

  const promises = [];

  if (params.icon) {
    fs.accessSync(params.icon, fs.constants.R_OK);

    promises.push(icon(params.icon, !!params.r));
  }

  if (params.splash) {
    fs.accessSync(params.splash, fs.constants.R_OK);

    promises.push(splash(params.splash, params.fill));
  }

  Promise.all(promises).then(() => {
    status.stop();
    log(chalk.green(figures("✔︎ Resources generated successfully.")));
  });
} catch (err) {
  log(chalk.red(`Check if files exists in specified path.`));
  process.exit();
}
