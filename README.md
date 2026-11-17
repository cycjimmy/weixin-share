# Weixin Share

[![Test CI][workflows-badge-image]][workflows-url]
[![libraries dependency status][libraries-status-image]][libraries-status-url]
[![libraries sourcerank][libraries-sourcerank-image]][libraries-sourcerank-url]
[![Coverage Status][coverage-image]][coverage-url]
[![Release date][release-date-image]][release-url]
[![vite][vite-image]][vite-url]
[![semantic-release][semantic-image]][semantic-url]
[![vitest][vitest-image]][vitest-url]
[![npm license][license-image]][download-url]

An easier way to call Wechat share on a web page.

**[weixin-share](https://github.com/cycdpo/weixin-share) has been renamed to `@cycjimmy/weixin-share` for a scoped NPM package.**

## Install

[![NPM version][npm-image]][npm-url]
[![NPM bundle size][npm-bundle-size-image]][npm-url]
[![npm download][download-image]][download-url]

```shell
# via npm
$ npm install @cycjimmy/weixin-share --save

# or via yarn
$ yarn add @cycjimmy/weixin-share
```

## Module format

The package is **ESM only**:

| File | Format | Purpose |
| --- | --- | --- |
| `dist/weixin-share.esm.js` | ESM | `main`, `module` and `exports` entry (bundlers, `import`) |
| `dist/weixin-share.umd.js` | UMD | unminified browser build for `<script>` tags |
| `dist/weixin-share.umd.min.js` | UMD | minified browser/CDN build, `browser`/`unpkg`/`jsdelivr` |
| `dist/index.d.ts` | Types | declarations for `types` and the `exports` `types` condition |

* There is no CommonJS bundle. Node.js 20.19+ / 22.12+ can `require()` the ESM
  entry, because those versions load an ES module synchronously.
* The UMD builds target ES2015, so Internet Explorer is no longer supported.
* The toolchain itself needs Node.js `^22.22.2 || ^24.15.0 || >=26.0.0` (see
  `engines` in `package.json` and the requirements in [CONTRIBUTING.md](CONTRIBUTING.md)).

## Usage

```js
import wxShare from '@cycjimmy/weixin-share'

wxShare()
  .config({
    appId: 'appId',
    timestamp: 'timestamp',
    nonceStr: 'nonceStr',
    signature: 'signature',
  })
  .setReadyCallBack(() => {
    console.log('Wechat JS-SDK is ready')
  })
  .setDefaultShare({
    title: 'default title',
    desc: 'default desc',
    link: 'https://example.com',
    imgUrl: 'https://example.com/logo.jpg',
  })
  .setShareSuccessCallBack(() => {
    console.log('shared')
  })
  .share({
    title: 'custom title',
  })
```

`wxShare()` returns a singleton, so the chain above can also be split into
several statements. Public methods:

* `config()`: set the Wechat JS-SDK configuration.
* `setReadyCallBack()`: set the callback that runs once the JS-SDK reports ready.
* `setDefaultShare()`: set the default share payload.
* `setShareSuccessCallBack()`: set the callback that runs after a share starts.
  **Discarded above WeChat 6.7.2 and JSSDK 1.4.0.**
* `share()`: load the JS-SDK, configure it and apply the share payload. Returns
  `Promise<Required<WxShareData>>`.
* `backToDefault()`: re-apply the default share payload.

`config()` parameters:

| Name | Required | Default | Description |
| --- | --- | --- | --- |
| `debug` | No | `false` | Enable the JS-SDK debug log. |
| `appId` | Yes | | Wechat official account app id. |
| `timestamp` | Yes | | Signature timestamp. |
| `nonceStr` | Yes | | Signature nonce string. |
| `signature` | Yes | | Signature of the current page URL. |
| `jsApiList` | No | `['onMenuShareWeibo', 'updateAppMessageShareData', 'updateTimelineShareData']` | JS-SDK APIs to enable. |

The share payload accepted by `setDefaultShare()` and `share()` has four
optional fields: `title`, `desc`, `link` and `imgUrl`. See the
[Wechat official wiki](https://mp.weixin.qq.com/wiki) for the JS-SDK details.

## Use in browser

```html
<script src="weixin-share.umd.min.js"></script>
<script>
  window.wxShare()
    .config({
      appId: 'appId',
      timestamp: 'timestamp',
      nonceStr: 'nonceStr',
      signature: 'signature',
    })
    .share({
      title: 'share title',
      desc: 'share desc',
      link: 'https://example.com',
      imgUrl: 'https://example.com/logo.jpg',
    })
</script>
```

The UMD build exposes the singleton factory as `window.wxShare`.

## CDN

[![jsdelivr][jsdelivr-image]][jsdelivr-url]

To use it through a CDN, include this in your HTML:

```html
<script src="https://cdn.jsdelivr.net/npm/@cycjimmy/weixin-share@8/dist/weixin-share.umd.min.js"></script>
```

## Development

The toolchain and the release flow are described in
[CONTRIBUTING.md](CONTRIBUTING.md).

<!-- Links: -->
[npm-image]: https://img.shields.io/npm/v/@cycjimmy/weixin-share
[npm-url]: https://npmjs.org/package/@cycjimmy/weixin-share
[npm-bundle-size-image]: https://img.shields.io/bundlephobia/min/@cycjimmy/weixin-share

[download-image]: https://img.shields.io/npm/dt/@cycjimmy/weixin-share
[download-url]: https://npmjs.org/package/@cycjimmy/weixin-share

[jsdelivr-image]: https://img.shields.io/jsdelivr/npm/hy/@cycjimmy/weixin-share
[jsdelivr-url]: https://www.jsdelivr.com/package/npm/@cycjimmy/weixin-share

[workflows-badge-image]: https://github.com/cycjimmy/weixin-share/workflows/Test%20CI/badge.svg
[workflows-url]: https://github.com/cycjimmy/weixin-share/actions/workflows/nodeTestCI.yml

[libraries-status-image]: https://img.shields.io/librariesio/release/npm/@cycjimmy/weixin-share
[libraries-sourcerank-image]: https://img.shields.io/librariesio/sourcerank/npm/@cycjimmy/weixin-share
[libraries-status-url]: https://libraries.io/github/cycjimmy/weixin-share
[libraries-sourcerank-url]: https://libraries.io/npm/@cycjimmy%2Fweixin-share

[coverage-image]: https://img.shields.io/coveralls/github/cycjimmy/weixin-share
[coverage-url]: https://coveralls.io/github/cycjimmy/weixin-share

[release-date-image]: https://img.shields.io/github/release-date/cycjimmy/weixin-share
[release-url]: https://github.com/cycjimmy/weixin-share/releases

[vite-image]: https://img.shields.io/github/package-json/dependency-version/cycjimmy/weixin-share/dev/vite
[vite-url]: https://github.com/vitejs/vite

[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%20%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release

[vitest-image]: https://img.shields.io/badge/tested_with-vitest-729b1b.svg
[vitest-url]: https://github.com/vitest-dev/vitest

[license-image]: https://img.shields.io/npm/l/@cycjimmy/weixin-share
