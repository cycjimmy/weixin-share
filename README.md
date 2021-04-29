# Weixin Share
![][workflows-badge-image]
[![build status][travis-image]][travis-url]
[![libraries dependency status][libraries-status-image]][libraries-status-url]
[![libraries sourcerank][libraries-sourcerank-image]][libraries-sourcerank-url]
[![Coverage Status][coverage-image]][coverage-url]
[![Release date][release-date-image]][release-url]
[![rollup][rollup-image]][rollup-url]
[![semantic-release][semantic-image]][semantic-url]
[![jest][jest-image]][jest-url]
[![npm license][license-image]][download-url]

* An easier way to call Wechat share on a web page.
* **[weixin-share](https://github.com/cycdpo/weixin-share) has been renamed to @cycjimmy/weixin-share for scoped NPM package.**

## How to use
### Install
[![NPM version][npm-image]][npm-url]
[![NPM bundle size][npm-bundle-size-image]][npm-url]
[![npm download][download-image]][download-url]

```shell
# via npm
$ npm install @cycjimmy/weixin-share --save

# via yarn
$ yarn add @cycjimmy/weixin-share
```

### Usage
```javascript
import wxShare from '@cycjimmy/weixin-share';
# OR
const wxShare = require('@cycjimmy/weixin-share');
```

```javascript
wxShare()
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
    * `jsApiList`:  [Option][Array\<String\>] Default `['onMenuShareWeibo', 'updateAppMessageShareData', 'updateTimelineShareData']`
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
<script src="weixin-share.umd.min.js"></script>
<script>
  wxShare()
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
[![jsdelivr][jsdelivr-image]][jsdelivr-url]

To use via a CDN include this in your HTML:
```text
<script src="https://cdn.jsdelivr.net/npm/@cycjimmy/weixin-share@5/dist/weixin-share.umd.min.js"></script>
```

<!-- Links: -->
[npm-image]: https://img.shields.io/npm/v/@cycjimmy/weixin-share
[npm-url]: https://npmjs.org/package/@cycjimmy/weixin-share
[npm-bundle-size-image]: https://img.shields.io/bundlephobia/min/@cycjimmy/weixin-share

[download-image]: https://img.shields.io/npm/dt/@cycjimmy/weixin-share
[download-url]: https://npmjs.org/package/@cycjimmy/weixin-share

[jsdelivr-image]: https://img.shields.io/jsdelivr/npm/hy/@cycjimmy/weixin-share
[jsdelivr-url]: https://www.jsdelivr.com/package/npm/@cycjimmy/weixin-share

[workflows-badge-image]: https://github.com/cycjimmy/weixin-share/workflows/Test%20CI/badge.svg
[travis-image]: https://img.shields.io/travis/cycjimmy/weixin-share
[travis-url]: https://travis-ci.org/cycjimmy/weixin-share

[libraries-status-image]: https://img.shields.io/librariesio/release/npm/@cycjimmy/weixin-share
[libraries-sourcerank-image]: https://img.shields.io/librariesio/sourcerank/npm/@cycjimmy/weixin-share
[libraries-status-url]: https://libraries.io/github/cycjimmy/weixin-share
[libraries-sourcerank-url]: https://libraries.io/npm/@cycjimmy%2Fweixin-share

[coverage-image]: https://img.shields.io/coveralls/github/cycjimmy/weixin-share
[coverage-url]: https://coveralls.io/github/cycjimmy/weixin-share

[release-date-image]: https://img.shields.io/github/release-date/cycjimmy/weixin-share
[release-url]: https://github.com/cycjimmy/weixin-share/releases

[rollup-image]: https://img.shields.io/github/package-json/dependency-version/cycjimmy/weixin-share/dev/rollup
[rollup-url]: https://github.com/rollup/rollup

[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release

[jest-image]: https://img.shields.io/badge/tested_with-jest-99424f.svg
[jest-url]: https://github.com/facebook/jest

[license-image]: https://img.shields.io/npm/l/@cycjimmy/weixin-share

