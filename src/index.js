// constructor
import CreateInstance from 'awesome-js-funcs/designPattern/CreateInstance';

// polyfill
import objectAssign from 'object-assign';

let
  _instance = new CreateInstance()
;

const WX_JSSDK_URL = 'https://res.wx.qq.com/open/js/jweixin-1.4.0.js';

export default class WxShare {
  constructor() {
    if (_instance()) {
      return _instance();
    }
    this.isConfigReady = false;
    this.wx = null;
    this.wxConfig = null;
    this.readyCallBack = null;

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
   * setDefaultShare
   * @param defaultShare
   * @return {WxShare}
   */
  setDefaultShare(defaultShare = {}) {
    this.defaultShare = objectAssign({}, this.defaultShare, defaultShare);
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
   */
  share(shareData = {}) {
    if (!this._isInitDefaultShare) {
      this.setDefaultShare(shareData);
    } else {
      shareData = objectAssign({}, this.defaultShare, shareData);
    }

    console.log(shareData);

    return Promise.resolve()
      .then(() => this._initWxSDK())
      .then(() => this._ready())
      .then(() => {
        this.wx.onMenuShareAppMessage(shareData);
        this.wx.onMenuShareTimeline(shareData);
        this.wx.onMenuShareQQ(shareData);
        this.wx.onMenuShareQZone(shareData);
        this.wx.onMenuShareWeibo(shareData);
        this.wx.updateAppMessageShareData(shareData, (res) => console.log(res));
        this.wx.updateTimelineShareData(shareData, (res) => console.log(res));
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
      let _setWX = () => {
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


