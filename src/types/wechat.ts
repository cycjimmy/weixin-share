/**
 * The share payload accepted by `share()`, `setDefaultShare()` and the
 * underlying WeChat JS-SDK calls.
 */
export interface WxShareData {
  title?: string
  desc?: string
  link?: string
  imgUrl?: string
}

/**
 * The WeChat JS-SDK configuration produced by `config()`.
 */
export interface WxShareConfig {
  debug?: boolean
  appId: string
  timestamp: number | string
  nonceStr: string
  signature: string
  jsApiList?: string[]
}

export type ShareCallback = (res?: unknown) => void

/**
 * The parts of the WeChat JS-SDK object (`window.wx`) this package relies on.
 */
export interface WechatJSSDK {
  config: (config: WxShareConfig) => void
  ready: (callback: () => void) => void
  onMenuShareWeibo: (data: WxShareData & { success?: ShareCallback }) => void
  updateAppMessageShareData: (data: WxShareData, callback?: ShareCallback) => void
  updateTimelineShareData: (data: WxShareData, callback?: ShareCallback) => void
}
