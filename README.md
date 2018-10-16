# Weixin Share

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![David deps][david-image]][david-url]
[![devDependencies Status][david-dev-image]][david-dev-url]
[![npm download][download-image]][download-url]
[![jsdelivr][jsdelivr-image]][jsdelivr-url]
[![npm license][license-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/weixin-share.svg
[npm-url]: https://npmjs.org/package/weixin-share
[travis-image]: https://img.shields.io/travis/cycdpo/weixin-share.svg?style=flat-square
[travis-url]: https://travis-ci.org/cycdpo/weixin-share
[david-image]: https://img.shields.io/david/cycdpo/weixin-share.svg?style=flat-square
[david-url]: https://david-dm.org/cycdpo/weixin-share
[david-dev-image]: https://david-dm.org/cycdpo/weixin-share/dev-status.svg?style=flat-square
[david-dev-url]: https://david-dm.org/cycdpo/weixin-share?type=dev
[download-image]: https://img.shields.io/npm/dm/weixin-share.svg?style=flat-square
[download-url]: https://npmjs.org/package/weixin-share
[jsdelivr-image]: https://data.jsdelivr.com/v1/package/npm/weixin-share/badge
[jsdelivr-url]: https://www.jsdelivr.com/package/npm/weixin-share
[license-image]: https://img.shields.io/npm/l/weixin-share.svg?style=flat-square


* An easier way to call Wechat share on a web page.
[Releases](https://github.com/cycdpo/weixin-share/releases)

## How to use
### Install
```shell
# via npm
$ npm install weixin-share --save

# via yarn
$ yarn add weixin-share
```

### Usage
```javascript
import WxShare from 'weixin-share';
# OR
let WxShare = require('weixin-share');
```

```javascript
new WxShare()
  .config([wechatJSSDKConfig])
  .setReadyCallBack([wechatConfigReadyCallBack])
  .setDefaultShare([defaultShare])
  .share([shareConfig]);
```

* Function:
  * `config()`: Set Wechat JS-SDK Config.
  * `setReadyCallBack()`: Set CallBack function on Wechat Config Ready.
  * `setDefaultShare()`: Set Default Share Config.
  * `share()`: Run Main Task of Share.
  * `backToDefault()`: Back To Default Share Config.

* Params:
  * `wechatJSSDKConfig`: [Require][Object] Wechat JS-SDK Config.
    * `debug`: [Option][Boolean] Default `false`.
    * `appId`: [Require][String]
    * `timestamp`: [Require][Number | String]
    * `nonceStr`: [Require][String]
    * `signature`: [Require][String]
    * `jsApiList`:  [Option][Array\<String\>] Default `['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone', 'onMenuShareWeibo']`
  * `wechatConfigReadyCallBack`: [Option][Function] CallBack function on Wechat Config Ready.
  * `defaultShare`: [Option][Object] Default Share Config.
    * `title`: [Option][String] Set share title.
    * `desc`: [Option][String] Set share description.
    * `link`: [Option][String] Set share link URL.
    * `imgUrl`: [Option][String] Set URL of Share icon.
    * `type`: [Option][String] Set type of `'music'`, `'video'` or `'link'`. Default `'link'`.
    * `dataUrl`: [Option][String] Set data URL when the `type` is `'music'` or `'video'`. Default `''`.
    * `success`: [Option][Function] Callback when success.
    * `cancel`: [Option][Function] Callback when cancel.
  * `shareConfig`: [Option][Object] Share Config.
    * See `defaultShare` Params.

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
      signature: [signature]
    })
    .share({
      title: [share title],
      desc: [share desc],
      link: [share link],
      imgUrl: [share imgUrl]
    });
</script>
```

## CDN
To use via a CDN include this in your HTML:
```text
<script src="https://cdn.jsdelivr.net/npm/weixin-share@1/build/WxShare.min.js"></script>
```

