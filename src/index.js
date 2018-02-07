// constructor
import CreateInstance from 'awesome-js-funcs/designPattern/CreateInstance';

let
  _instance = new CreateInstance()
;

const WX_JSSDK_URL = 'https://res.wx.qq.com/open/js/jweixin-1.2.0.js';

export default class WxShare {
  constructor() {
    if (_instance()) {
      return _instance();
    }
    this.isConfigReady = false;
    this.wx = null;
    this.wxConfig = null;

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
             'onMenuShareWeibo'
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
   * share
   * @param shareData
   *  {
   *    imgUrl: '',
   *    link: '',
   *    title: '',
   *    desc: '',
   *    type: '',  music/video/link(default)
   *    dataUrl: '', if music/video type
   *    trigger:() => {},
   *    success:() => {},
   *    cancel:() => {},
   *    fail:() => {},
   *  }
   */
  share(shareData) {
    return Promise.resolve()
      .then(() => this._initWxSDK())
      .then(() => this._ready())
      .then(() => {
        this.wx.onMenuShareAppMessage(shareData);
        this.wx.onMenuShareTimeline(shareData);
        this.wx.onMenuShareQQ(shareData);
        this.wx.onMenuShareQZone(shareData);
        this.wx.onMenuShareWeibo(shareData);
      });
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
          resolve();
        });
      }
    });
  };
};



