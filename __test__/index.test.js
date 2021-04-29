import wxShare from '../src/index';

describe('WxShare', () => {
  const wxConfig = {
    appId: 'appId',
    nonceStr: "nonceStr",
    signature: "signature",
    timestamp: "1573456877"
  };
  const readyCallBack = () => {
    console.log('readyCallBack');
  };
  const shareSuccessCallBack = () => {
    console.log('shareSuccessCallBack');
  };
  const defaultShare = {
    title: 'defaultTitle',
    link: 'https://default.com',
    desc: 'defaultDesc',
    imgUrl: 'https://default.com/default.jpg'
  };
  const customShare = {
    title: 'customTitle',
    link: 'https://custom.com',
    desc: 'customDesc',
    imgUrl: 'https://custom.com/custom.jpg'
  };

  // set config
  wxShare.config(wxConfig);

  it('wxShare.wxConfig.debug should be false.', () => {
    expect(wxShare.wxConfig.debug).toBe(false);
  });

  it('wxShare.wxConfig.appId should be custom appId.', () => {
    expect(wxShare.wxConfig.appId).toBe(wxConfig.appId);
  });

  it('wxShare.wxConfig.jsApiList should be equal to default jsApiList.', () => {
    expect(wxShare.wxConfig.jsApiList).toEqual([
      'onMenuShareWeibo',
      'updateAppMessageShareData',
      'updateTimelineShareData'
    ]);
  });

  it('wxShare.readyCallBack should be custom readyCallBack() after wxShare.setReadyCallBack().', () => {
    wxShare.setReadyCallBack(readyCallBack);

    expect(wxShare.readyCallBack).toBe(readyCallBack);
  });

  it('wxShare.shareSuccessCallBack should be custom shareSuccessCallBack() after wxShare.setShareSuccessCallBack().', () => {
    wxShare.setShareSuccessCallBack(shareSuccessCallBack);

    expect(wxShare.shareSuccessCallBack).toBe(shareSuccessCallBack);
  });

  wxShare.setDefaultShare(defaultShare);

  it('wxShare._isInitDefaultShare should be true after wxShare.setDefaultShare().', () => {
    expect(wxShare._isInitDefaultShare).toBe(true);
  });

  it('wxShare.defaultShare.title should be defaultTitle after wxShare.setDefaultShare().', () => {
    expect(wxShare.defaultShare.title).toBe(defaultShare.title);
  });

  it('Mock wxShare._initWxSDK', () => {
    // mock _initWxSDK
    wxShare._initWxSDK();
    wxShare.wx = window.wx = {
      config: () => {
      },
      ready: cb => cb(),
      onMenuShareWeibo: () => {
      },
      updateAppMessageShareData: () => {
      },
      updateTimelineShareData: () => {
      },
    };

    expect(wxShare.wx).toBeTruthy();
    expect(wxShare.wx).toBe(window.wx);
  });

  it('wxShare.isConfigReady should be true after wxShare._ready().', () => {
    return wxShare._ready().then(() => {
      expect(wxShare.isConfigReady).toBe(true);
    });
  });

  it('wxShare.share(customShare) should return customShare', () => {
    return wxShare.share(customShare)
      .then(shareData => {
        expect(shareData.title).toBe(customShare.title);
        expect(shareData.desc).toBe(customShare.desc);
        expect(shareData.link).toBe(customShare.link);
        expect(shareData.imgUrl).toBe(customShare.imgUrl);
      });
  });

  it('wxShare.backToDefault() should return defaultShare', () => {
    return wxShare.backToDefault()
      .then(shareData => {
        expect(shareData.title).toBe(defaultShare.title);
        expect(shareData.desc).toBe(defaultShare.desc);
        expect(shareData.link).toBe(defaultShare.link);
        expect(shareData.imgUrl).toBe(defaultShare.imgUrl);
      });
  });
});
