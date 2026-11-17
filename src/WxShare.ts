import type {
  ShareCallback,
  WechatJSSDK,
  WxShareConfig,
  WxShareData,
} from './types/wechat.js'

const WX_JSSDK_URL = '//res.wx.qq.com/open/js/jweixin-1.6.0.js'

const DEFAULT_JS_API_LIST = [
  'onMenuShareWeibo',
  'updateAppMessageShareData',
  'updateTimelineShareData',
]

export default class WxShare {
  /** The WeChat JS-SDK object; `null` until it has been loaded. */
  wx: WechatJSSDK | null = null
  isConfigReady = false
  wxConfig: WxShareConfig = {
    debug: false,
    appId: '',
    timestamp: 0,
    nonceStr: '',
    signature: '',
    jsApiList: [...DEFAULT_JS_API_LIST],
  }

  readyCallBack: () => void = () => {}
  shareSuccessCallBack: ShareCallback = () => {}

  /** The share payload `backToDefault()` restores. */
  defaultShare: Required<WxShareData>
  private isDefaultShareInitialized = false

  constructor() {
    this.defaultShare = {
      title: document.title,
      desc: '',
      link: window.location.href.replace(/(\?|#).*/g, ''),
      imgUrl: '',
    }
  }

  /**
   * Set the WeChat JS-SDK configuration passed to `wx.config()`.
   */
  config({
    debug = false,
    appId,
    timestamp,
    nonceStr,
    signature,
    jsApiList = [...DEFAULT_JS_API_LIST],
  }: WxShareConfig): this {
    this.wxConfig = {
      debug,
      appId,
      timestamp,
      nonceStr,
      signature,
      jsApiList,
    }

    return this
  }

  /**
   * Set the callback that runs once the JS-SDK reports ready.
   */
  setReadyCallBack(readyCallBack: () => void = () => {}): this {
    this.readyCallBack = readyCallBack

    return this
  }

  /**
   * Set the callback that runs after a share starts.
   *
   * @deprecated Discarded above WeChat 6.7.2 and JSSDK 1.4.0.
   */
  setShareSuccessCallBack(shareSuccessCallBack: ShareCallback = () => {}): this {
    this.shareSuccessCallBack = shareSuccessCallBack

    return this
  }

  /**
   * Merge the given payload into the default share configuration.
   */
  setDefaultShare(defaultShare: WxShareData = {}): this {
    this.defaultShare = {
      ...this.defaultShare,
      ...defaultShare,
    }
    this.isDefaultShareInitialized = true

    return this
  }

  /**
   * Load the JS-SDK (if needed), configure it and apply the share payload.
   */
  share(shareData: WxShareData = {}): Promise<Required<WxShareData>> {
    if (!this.isDefaultShareInitialized) {
      this.setDefaultShare(shareData)
    }

    const finalShareData: Required<WxShareData> = {
      ...this.defaultShare,
      ...shareData,
    }

    return Promise.resolve()
      .then(() => this.initWxSDK())
      .then(() => this.ready())
      .then(() => {
        const wx = this.wx

        if (!wx) {
          throw new Error('The WeChat JS-SDK is not available.')
        }

        wx.onMenuShareWeibo({
          ...finalShareData,
          success: res => this.shareSuccessCallBack(res),
        })

        // JSSDK 1.4.0 and above
        wx.updateAppMessageShareData(finalShareData, res => this.shareSuccessCallBack(res))
        wx.updateTimelineShareData(finalShareData, res => this.shareSuccessCallBack(res))

        return finalShareData
      })
  }

  /**
   * Restore the default share configuration.
   */
  backToDefault(): Promise<Required<WxShareData>> {
    return this.share()
  }

  /**
   * Load the JS-SDK script when `window.wx` is not available yet.
   */
  private initWxSDK(): Promise<void> {
    return new Promise((resolve) => {
      const setWX = (): void => {
        const oScript = document.createElement('script')
        oScript.type = 'text/javascript'
        oScript.onload = () => {
          this.wx = window.wx ?? null
          resolve()
        }
        oScript.src = WX_JSSDK_URL
        document.head.appendChild(oScript)
      }

      if (this.wx) {
        resolve()
      }
      else if (window.wx) {
        this.wx = window.wx
        resolve()
      }
      else {
        setWX()
      }
    })
  }

  /**
   * Configure the JS-SDK and wait until it reports ready.
   */
  private ready(): Promise<void> {
    return new Promise((resolve) => {
      if (this.isConfigReady) {
        resolve()

        return
      }

      const wx = this.wx

      if (!wx) {
        throw new Error('The WeChat JS-SDK is not available.')
      }

      wx.config(this.wxConfig)

      wx.ready(() => {
        this.isConfigReady = true
        this.readyCallBack()
        resolve()
      })
    })
  }
}
