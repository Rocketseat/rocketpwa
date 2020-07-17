<div align="center">
    <h1 align="center">DEPRECATED</h1>
    <p align="center">
        🚨 Hey, this repository is DEPRECATED and will no longer be actively maintained!
    </p>
</div>


<br />
<br />
<br />
<br />
<br />


## RocketPWA

![RocketPWA](assets/pwa-logo.png)

A toolbelt created for PWA developers.

## Features

- Generate icons in all sizes;
- Generate rounded icons;
- Generate splash screens for iOS;
- Resize splash screens without cropping content;

## How to use

```js
npm install -g rocketpwa
rocketpwa -h
```

### Generate icons

```js
rocketpwa --icon icon.png
```

You can also add an `-r` parameter to create rounded corner icons.

### Generate splash screens

```js
rocketpwa --splash splash.png
```

By default, rocketpwa will try to find the best match for positioning splash screen on different screen sizes but sometimes you may encounter crop problems.

To bypass that, you can simple add an `--fill` parameter to set the fallback background color for splash screens:

```js
rocketpwa --splash splash.png --fill "#7159C1"
```

## Contribute

1.  Fork it
2.  Create your feature branch (git checkout -b my-new-feature)
3.  Commit your changes (git commit -am 'Add some feature')
4.  Push to the branch (git push origin my-new-feature)
5.  Create new Pull Request
