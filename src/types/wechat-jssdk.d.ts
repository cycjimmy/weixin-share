import type { WechatJSSDK } from './wechat'

// Ambient declaration only: it lets `src` and `__test__` touch `window.wx`
// directly. `.d.ts` inputs are not emitted, so it never reaches `dist/`.
declare global {
  interface Window {
    wx?: WechatJSSDK
  }
}
