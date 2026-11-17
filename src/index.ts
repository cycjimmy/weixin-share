import { CreateInstance } from '@cycjimmy/awesome-js-funcs/designPattern'

import WxShare from './WxShare.js'

export type {
  ShareCallback,
  WechatJSSDK,
  WxShareConfig,
  WxShareData,
} from './types/wechat.js'

const instance = CreateInstance<WxShare>()

/**
 * Get the singleton `WxShare` instance, creating it on first use.
 */
export default function wxShare(): WxShare {
  const existing = instance()

  if (existing) {
    return existing
  }

  const wxShareInstance = new WxShare()
  instance(wxShareInstance)

  return wxShareInstance
}
