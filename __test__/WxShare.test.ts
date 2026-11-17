import { beforeEach, describe, expect, it, vi } from 'vitest'

import WxShare from '../src/WxShare.js'

const wxConfig = {
  appId: 'appId',
  nonceStr: 'nonceStr',
  signature: 'signature',
  timestamp: '1573456877',
}

const defaultShare = {
  title: 'defaultTitle',
  link: 'https://default.com',
  desc: 'defaultDesc',
  imgUrl: 'https://default.com/default.jpg',
}

const customShare = {
  title: 'customTitle',
  link: 'https://custom.com',
  desc: 'customDesc',
  imgUrl: 'https://custom.com/custom.jpg',
}

function createWxStub() {
  return {
    config: vi.fn(),
    ready: vi.fn((callback: () => void) => callback()),
    onMenuShareWeibo: vi.fn(),
    updateAppMessageShareData: vi.fn(),
    updateTimelineShareData: vi.fn(),
  }
}

/**
 * Install a JS-SDK stub on `window.wx` and return it, so the assertions can
 * reach the mock records instead of the `WechatJSSDK` surface.
 */
function setupWx() {
  const wxStub = createWxStub()
  window.wx = wxStub

  return wxStub
}

/**
 * Return the js-sdk script injected by `initWxSDK()`.
 */
function takeInjectedScript(): HTMLScriptElement {
  const scripts = document.head.querySelectorAll<HTMLScriptElement>('script[src*="jweixin"]')
  const script = scripts.item(scripts.length - 1)

  if (!script) {
    throw new Error('The js-sdk script was not injected.')
  }

  return script
}

/**
 * Let the promise chain inside `share()` reach the point where the js-sdk
 * script has been appended to the document.
 */
function flushPromises(): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, 0)
  })
}

describe('wxShare.config()', () => {
  it('fills in the documented defaults', () => {
    const wxShare = new WxShare().config(wxConfig)

    expect(wxShare.wxConfig.debug).toBe(false)
    expect(wxShare.wxConfig.appId).toBe(wxConfig.appId)
    expect(wxShare.wxConfig.jsApiList).toEqual([
      'onMenuShareWeibo',
      'updateAppMessageShareData',
      'updateTimelineShareData',
    ])
  })

  it('keeps a custom jsApiList', () => {
    const wxShare = new WxShare().config({
      ...wxConfig,
      debug: true,
      jsApiList: ['updateAppMessageShareData'],
    })

    expect(wxShare.wxConfig.debug).toBe(true)
    expect(wxShare.wxConfig.jsApiList).toEqual(['updateAppMessageShareData'])
  })

  it('does not leak mutations of the exposed jsApiList', () => {
    const wxShare = new WxShare().config(wxConfig)

    wxShare.wxConfig.jsApiList?.push('extra')
    wxShare.config(wxConfig)

    expect(wxShare.wxConfig.jsApiList).toEqual([
      'onMenuShareWeibo',
      'updateAppMessageShareData',
      'updateTimelineShareData',
    ])
  })

  it('returns the instance for chaining', () => {
    const wxShare = new WxShare()

    expect(wxShare.config(wxConfig)).toBe(wxShare)
    expect(wxShare.setReadyCallBack()).toBe(wxShare)
    expect(wxShare.setShareSuccessCallBack()).toBe(wxShare)
    expect(wxShare.setDefaultShare()).toBe(wxShare)
  })
})

describe('wxShare callbacks', () => {
  it('starts with no-op callbacks', () => {
    const wxShare = new WxShare()

    expect(() => wxShare.readyCallBack()).not.toThrow()
    expect(() => wxShare.shareSuccessCallBack()).not.toThrow()
  })

  it('stores the ready callback', () => {
    const readyCallBack = vi.fn()
    const wxShare = new WxShare().setReadyCallBack(readyCallBack)

    expect(wxShare.readyCallBack).toBe(readyCallBack)
  })

  it('stores the share success callback', () => {
    const shareSuccessCallBack = vi.fn()
    const wxShare = new WxShare().setShareSuccessCallBack(shareSuccessCallBack)

    expect(wxShare.shareSuccessCallBack).toBe(shareSuccessCallBack)
  })
})

describe('wxShare.defaultShare', () => {
  it('starts from the document title and the current url', () => {
    const wxShare = new WxShare()

    expect(wxShare.defaultShare.title).toBe(document.title)
    expect(wxShare.defaultShare.link).toBe(window.location.href.replace(/(\?|#).*/g, ''))
  })

  it('is merged by setDefaultShare()', () => {
    const wxShare = new WxShare().setDefaultShare(defaultShare)

    expect(wxShare.defaultShare.title).toBe(defaultShare.title)
    expect(wxShare.defaultShare.desc).toBe(defaultShare.desc)
  })
})

describe('wxShare.share()', () => {
  it('loads and configures the js-sdk through the public API', async () => {
    const wxStub = setupWx()
    const readyCallBack = vi.fn()
    const wxShare = new WxShare()
      .config(wxConfig)
      .setReadyCallBack(readyCallBack)
      .setDefaultShare(defaultShare)

    const shareData = await wxShare.share(customShare)

    expect(wxStub.config).toHaveBeenCalledWith(expect.objectContaining({ appId: wxConfig.appId }))
    expect(readyCallBack).toHaveBeenCalledTimes(1)
    expect(wxShare.isConfigReady).toBe(true)

    expect(wxStub.onMenuShareWeibo).toHaveBeenCalledTimes(1)
    expect(wxStub.updateAppMessageShareData).toHaveBeenCalledWith(customShare, expect.any(Function))
    expect(wxStub.updateTimelineShareData).toHaveBeenCalledWith(customShare, expect.any(Function))

    expect(shareData).toEqual(customShare)
  })

  it('merges the default share with the given payload', async () => {
    setupWx()

    const wxShare = new WxShare()
      .config(wxConfig)
      .setDefaultShare(defaultShare)

    const shareData = await wxShare.share({ title: 'onlyTitle' })

    expect(shareData).toEqual({ ...defaultShare, title: 'onlyTitle' })
  })

  it('uses the first payload as the default share', async () => {
    setupWx()

    const wxShare = new WxShare().config(wxConfig)

    await wxShare.share(customShare)

    expect(wxShare.defaultShare).toEqual(customShare)
  })

  it('forwards the share result to the success callback', async () => {
    const wxStub = setupWx()
    const shareSuccessCallBack = vi.fn()
    const wxShare = new WxShare()
      .config(wxConfig)
      .setShareSuccessCallBack(shareSuccessCallBack)

    await wxShare.share(customShare)

    const [data, callback] = wxStub.updateAppMessageShareData.mock.calls[0]
    callback('shared')

    expect(data).toEqual(customShare)
    expect(shareSuccessCallBack).toHaveBeenCalledWith('shared')
  })

  it('forwards the weibo share result to the success callback', async () => {
    const wxStub = setupWx()
    const shareSuccessCallBack = vi.fn()
    const wxShare = new WxShare()
      .config(wxConfig)
      .setShareSuccessCallBack(shareSuccessCallBack)

    await wxShare.share(customShare)

    const [weiboShareData] = wxStub.onMenuShareWeibo.mock.calls[0]
    weiboShareData.success('weibo-shared')

    expect(shareSuccessCallBack).toHaveBeenCalledWith('weibo-shared')
  })
})

describe('wxShare.backToDefault()', () => {
  it('restores the default share', async () => {
    setupWx()

    const wxShare = new WxShare()
      .config(wxConfig)
      .setDefaultShare(defaultShare)

    await wxShare.share(customShare)

    expect(await wxShare.backToDefault()).toEqual(defaultShare)
  })
})

describe('wxShare js-sdk loading', () => {
  beforeEach(() => {
    delete window.wx
    document.head.querySelectorAll('script[src*="jweixin"]').forEach(script => script.remove())
  })

  it('injects the js-sdk script when window.wx is missing', async () => {
    const wxShare = new WxShare().config(wxConfig)
    const promise = wxShare.share(customShare)

    await flushPromises()

    const script = takeInjectedScript()

    expect(script.getAttribute('src')).toBe('//res.wx.qq.com/open/js/jweixin-1.6.0.js')
    expect(script.type).toBe('text/javascript')

    window.wx = createWxStub()
    script.dispatchEvent(new Event('load'))

    await expect(promise).resolves.toEqual(customShare)
    expect(wxShare.wx).toBe(window.wx)
  })

  it('rejects when the script loads without providing wx', async () => {
    const wxShare = new WxShare().config(wxConfig)
    // A previous ready() succeeded, so only the last guard in share() can fail.
    wxShare.isConfigReady = true

    const rejection = expect(wxShare.share(customShare)).rejects.toThrow('The WeChat JS-SDK is not available.')

    await flushPromises()
    takeInjectedScript().dispatchEvent(new Event('load'))

    await rejection
  })

  it('rejects when the js-sdk is missing while becoming ready', async () => {
    const wxShare = new WxShare().config(wxConfig)

    const rejection = expect(wxShare.share(customShare)).rejects.toThrow('The WeChat JS-SDK is not available.')

    await flushPromises()
    takeInjectedScript().dispatchEvent(new Event('load'))

    await rejection
  })
})
