# Wx Share

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![David deps][david-image]][david-url]
[![devDependencies Status][david-dev-image]][david-dev-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]
[![npm license][license-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/wx-share.svg
[npm-url]: https://npmjs.org/package/wx-share
[travis-image]: https://img.shields.io/travis/cycdpo/wx-share.svg?style=flat-square
[travis-url]: https://travis-ci.org/cycdpo/wx-share
[david-image]: https://img.shields.io/david/cycdpo/wx-share.svg?style=flat-square
[david-url]: https://david-dm.org/cycdpo/wx-share
[david-dev-image]: https://david-dm.org/cycdpo/wx-share/dev-status.svg?style=flat-square
[david-dev-url]: https://david-dm.org/cycdpo/wx-share?type=dev
[node-image]: https://img.shields.io/badge/node.js-%3E=_6.0-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/wx-share.svg?style=flat-square
[download-url]: https://npmjs.org/package/wx-share
[license-image]: https://img.shields.io/npm/l/wx-share.svg?style=flat-square


* Easier way to call Wechat web share
[Releases](https://github.com/cycdpo/wx-share/releases)

## How to use
### Install
```shell
# via npm
$ npm install wx-share --save

# via yarn
$ yarn add wx-share
```

### Usage
```javascript
import WxShare from 'wx-share';
# OR
let WxShare = require('wx-share');
```

```javascript
new WxShare()
  .config([WechatJSSDKConfig])
  .share([shareConfig]);
```

* `WechatJSSDKConfig`: [object] Wechat JS-SDK Config
* `shareConfig`: [object] Share Config
* [Wechat Official Wiki](https://mp.weixin.qq.com/wiki)

### Use in browser
```html
<script src="WxShare.min.js"></script>
<script>
  new WxShare()
    .config({
      appId: [appId],
      timestamp: [timestamp],
      nonceStr: [nonceStr],
      signature: [signature],
    })
    .share({
      title: [share title],
      desc: [share desc],
      link: [share link],
      imgUrl: [share imgUrl],
    });
</script>
```


