import { describe, expect, it } from 'vitest'

import wxShare from '../src/index.js'
import WxShare from '../src/WxShare.js'

describe('wxShare', () => {
  it('is a singleton', () => {
    const first = wxShare()

    expect(first).toBeInstanceOf(WxShare)
    expect(wxShare()).toBe(first)
  })
})
