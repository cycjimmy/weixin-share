// constructor
import CreateInstance from '@cycjimmy/awesome-js-funcs/designPattern/CreateInstance';

const _instance = new CreateInstance();

const WX_JSSDK_URL = 'https://res.wx.qq.com/open/js/jweixin-1.4.0.js';

export default class WxShare {
  constructor() {
    if (_instance()) {
      return _instance();
    }
    this.isConfigReady = false;
    this.wx = null;
    this.wxConfig = {};
    this.readyCallBack = () => {
    };
    this.shareSuccessCallBack = () => {
    };

    this.defaultShare = {
      title: document.title,
      desc: '',
      link: window.location.href.replace(/(\?|#).*/g, ''),
      imgUrl: '',
    };
    this._isInitDefaultShare = false;

    _instance(this);
  };

  /**
   * config
   * @param configData
   * {
   *  debug: false,
   *  appId: '',
   *  timestamp: 0,
   *  nonceStr: '',
   *  signature: '',
   *  jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone', 'onMenuShareWeibo'],
   * }
   */
  config({
           debug = false,
           appId,
           timestamp,
           nonceStr,
           signature,
           jsApiList = [
             'onMenuShareTimeline',
             'onMenuShareAppMessage',
             'onMenuShareQQ',
             'onMenuShareQZone',
             'onMenuShareWeibo',
             'updateAppMessageShareData',
             'updateTimelineShareData',
           ]
         }) {
    this.wxConfig = {
      debug: debug,
      appId: appId,
      timestamp: timestamp,
      nonceStr: nonceStr,
      signature: signature,
      jsApiList: jsApiList
    };
    return this;
  };

  /**
   * setReadyCallBack
   * @param readyCallBack
   * @return {WxShare}
   */
  setReadyCallBack(readyCallBack = () => {
  }) {
    this.readyCallBack = readyCallBack;
    return this;
  };

  /**
   * setShareSuccessCallBack
   * @param shareSuccessCallBack
   * @return {WxShare}
   */
  setShareSuccessCallBack(shareSuccessCallBack = () => {
  }) {
    this.shareSuccessCallBack = shareSuccessCallBack;
    return this;
  };

  /**
   * setDefaultShare
   * @param defaultShare
   * @return {WxShare}
   */
  setDefaultShare(defaultShare = {}) {
    this.defaultShare = Object.assign({}, this.defaultShare, defaultShare);
    this._isInitDefaultShare = true;
    return this;
  };

  /**
   * share
   * @param shareData
   *  {
   *    title: '',
   *    link: '',
   *    desc: '',
   *    imgUrl: ''
   *  }
   * @returns {Promise<any | never>}
   */
  share(shareData = {}) {
    if (!this._isInitDefaultShare) {
      this.setDefaultShare(shareData);
    }

    shareData = Object.assign({}, this.defaultShare, shareData);

    console.log(shareData);

    return Promise.resolve()
      .then(() => this._initWxSDK())
      .then(() => this._ready())
      .then(() => {
        const _oldShareData = Object.assign({}, shareData, {
          success: (res) => this.shareSuccessCallBack(res),
        });

        this.wx.onMenuShareWeibo(_oldShareData);

        // discard
        this.wx.onMenuShareTimeline(_oldShareData);
        this.wx.onMenuShareAppMessage(_oldShareData);
        this.wx.onMenuShareQQ(_oldShareData);
        this.wx.onMenuShareQZone(_oldShareData);

        // Above jssdk1.4
        this.wx.updateAppMessageShareData(shareData, (res) => this.shareSuccessCallBack(res));
        this.wx.updateTimelineShareData(shareData, (res) => this.shareSuccessCallBack(res));
      });
  };

  /**
   * backToDefault
   * @return {*}
   */
  backToDefault() {
    return this.share();
  };

  /**
   * init Wechat JSSDK
   * @return {Promise<any>}
   * @private
   */
  _initWxSDK() {
    return new Promise(resolve => {
      const _setWX = () => {
        console.log('set wx');
        let oScript = document.createElement("script");
        oScript.type = "text/javascript";
        oScript.onload = () => {
          this.wx = window.wx;
          resolve();
        };
        oScript.src = WX_JSSDK_URL;
        document.querySelector('head').appendChild(oScript);
      };

      if (this.wx) {
        resolve();
      } else {
        if (window.wx) {
          console.log('has wx');
          this.wx = window.wx;
          resolve();
        } else {
          _setWX();
        }
      }
    });
  };

  /**
   * set wx.config
   * @return {Promise<any>}
   * @private
   */
  _ready() {
    return new Promise(resolve => {
      if (this.isConfigReady) {
        resolve();
      } else {
        console.log('set wx.config');
        this.wx.config(this.wxConfig);

        this.wx.ready(() => {
          this.isConfigReady = true;

          if (this.readyCallBack) {
            this.readyCallBack();
          }

          resolve();
        });
      }
    });
  };
};


