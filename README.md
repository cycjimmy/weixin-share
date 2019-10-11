# Weixin Share

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![David deps][david-image]][david-url]
[![devDependencies Status][david-dev-image]][david-dev-url]
[![npm download][download-image]][download-url]
[![jsdelivr][jsdelivr-image]][jsdelivr-url]
[![npm license][license-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/@cycjimmy/weixin-share.svg
[npm-url]: https://npmjs.org/package/@cycjimmy/weixin-share
[travis-image]: https://img.shields.io/travis/cycjimmy/weixin-share.svg?style=flat-square
[travis-url]: https://travis-ci.org/cycjimmy/weixin-share
[david-image]: https://img.shields.io/david/cycjimmy/weixin-share.svg?style=flat-square
[david-url]: https://david-dm.org/cycjimmy/weixin-share
[david-dev-image]: https://david-dm.org/cycjimmy/weixin-share/dev-status.svg?style=flat-square
[david-dev-url]: https://david-dm.org/cycjimmy/weixin-share?type=dev
[download-image]: https://img.shields.io/npm/dm/@cycjimmy/weixin-share.svg?style=flat-square
[download-url]: https://npmjs.org/package/@cycjimmy/weixin-share
[jsdelivr-image]: https://data.jsdelivr.com/v1/package/npm/@cycjimmy/weixin-share/badge
[jsdelivr-url]: https://www.jsdelivr.com/package/npm/@cycjimmy/weixin-share
[license-image]: https://img.shields.io/npm/l/@cycjimmy/weixin-share.svg?style=flat-square


* An easier way to call Wechat share on a web page. [Releases](https://github.com/cycjimmy/weixin-share/releases)
* **[weixin-share](https://github.com/cycdpo/weixin-share) has been renamed to @cycjimmy/weixin-share for scoped NPM package.**

## How to use
### Install
```shell
# via npm
$ npm install @cycjimmy/weixin-share --save

# via yarn
$ yarn add @cycjimmy/weixin-share
```

### Usage
```javascript
import WxShare from '@cycjimmy/weixin-share';
# OR
let WxShare = require('@cycjimmy/weixin-share');
```

```javascript
new WxShare()
  .config([wechatJSSDKConfig])
  .setReadyCallBack([wechatConfigReadyCallBack])
  .setDefaultShare([defaultShare])
  .setShareSuccessCallBack([shareSuccessCallBack])
  .share([shareConfig]);
```

* Function:
  * `config()`: Set Wechat JS-SDK Config.
  * `setReadyCallBack()`: Set CallBack function on Wechat Config Ready.
  * `setDefaultShare()`: Set Default Share Config.
  * `setShareSuccessCallBack()`: Set CallBack function on success of Share. **discard above Wechat 6.7.2 and JSSDK 1.4.0**
  * `share()`: Run Main Task of Share. It returns `Promise<any>`. If using a chained call, please note the sequence.
  * `backToDefault()`: Back To Default Share Config.

* Params:
  * `wechatJSSDKConfig`: [Require][Object] Wechat JS-SDK Config.
    * `debug`: [Option][Boolean] Default `false`.
    * `appId`: [Require][String]
    * `timestamp`: [Require][Number | String]
    * `nonceStr`: [Require][String]
    * `signature`: [Require][String]
    * `jsApiList`:  [Option][Array\<String\>] Default `['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone', 'onMenuShareWeibo', 'updateAppMessageShareData', 'updateTimelineShareData']`
  * `wechatConfigReadyCallBack`: [Option][Function] CallBack function on Wechat Config Ready.
  * `defaultShare`: [Option][Object] Default Share Config.
    * `title`: [Option][String] Set share title.
    * `desc`: [Option][String] Set share description.
    * `link`: [Option][String] Set share link URL.
    * `imgUrl`: [Option][String] Set URL of Share icon.
  * `shareConfig`: [Option][Object] Share Config.
    * See `defaultShare` Params.

* [Wechat Official Wiki](https://mp.weixin.qq.com/wiki)

### Use in browser
```html
<script src="weixin-share.min.js"></script>
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
<script src="https://cdn.jsdelivr.net/npm/@cycjimmy/weixin-share@2/build/weixin-share.min.js"></script>
```

