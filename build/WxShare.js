(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["WxShare"] = factory();
	else
		root["WxShare"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_awesome_js_funcs_designPattern_CreateInstance__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_assign_polyfill__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_assign_polyfill___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_assign_polyfill__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// constructor


// polyfill


var _instance = new __WEBPACK_IMPORTED_MODULE_0_awesome_js_funcs_designPattern_CreateInstance__["a" /* default */]();

var WX_JSSDK_URL = 'https://res.wx.qq.com/open/js/jweixin-1.2.0.js';

var WxShare = function () {
  function WxShare() {
    _classCallCheck(this, WxShare);

    if (_instance()) {
      return _instance();
    }
    this.isConfigReady = false;
    this.wx = null;
    this.wxConfig = null;
    this.readyCallBack = null;

    this.defaultShare = {
      title: '',
      desc: '',
      link: window.location.href.replace(/(\?|#).*/g, ''),
      imgUrl: ''
    };
    this._isInitDefaultShare = false;

    _instance(this);
  }

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
  WxShare.prototype.config = function config(_ref) {
    var _ref$debug = _ref.debug,
        debug = _ref$debug === undefined ? false : _ref$debug,
        appId = _ref.appId,
        timestamp = _ref.timestamp,
        nonceStr = _ref.nonceStr,
        signature = _ref.signature,
        _ref$jsApiList = _ref.jsApiList,
        jsApiList = _ref$jsApiList === undefined ? ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone', 'onMenuShareWeibo'] : _ref$jsApiList;

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
  WxShare.prototype.setReadyCallBack = function setReadyCallBack() {
    var readyCallBack = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};

    this.readyCallBack = readyCallBack;
    return this;
  };

  /**
   * setDefaultShare
   * @param defaultShare
   * @return {WxShare}
   */
  WxShare.prototype.setDefaultShare = function setDefaultShare() {
    var defaultShare = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    this.defaultShare = Object.assign({}, this.defaultShare, defaultShare);
    this._isInitDefaultShare = true;
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
  WxShare.prototype.share = function share() {
    var _this = this;

    var shareData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (!this._isInitDefaultShare) {
      this.setDefaultShare(shareData);
    } else {
      shareData = Object.assign({}, this.defaultShare, shareData);
    }

    console.log(shareData);

    return Promise.resolve().then(function () {
      return _this._initWxSDK();
    }).then(function () {
      return _this._ready();
    }).then(function () {
      _this.wx.onMenuShareAppMessage(shareData);
      _this.wx.onMenuShareTimeline(shareData);
      _this.wx.onMenuShareQQ(shareData);
      _this.wx.onMenuShareQZone(shareData);
      _this.wx.onMenuShareWeibo(shareData);
    });
  };

  /**
   * backToDefault
   * @return {*}
   */
  WxShare.prototype.backToDefault = function backToDefault() {
    return this.share();
  };

  /**
   * init Wechat JSSDK
   * @return {Promise<any>}
   * @private
   */
  WxShare.prototype._initWxSDK = function _initWxSDK() {
    var _this2 = this;

    return new Promise(function (resolve) {
      var _setWX = function _setWX() {
        console.log('set wx');
        var oScript = document.createElement("script");
        oScript.type = "text/javascript";
        oScript.onload = function () {
          _this2.wx = window.wx;
          resolve();
        };
        oScript.src = WX_JSSDK_URL;
        document.querySelector('head').appendChild(oScript);
      };

      if (_this2.wx) {
        resolve();
      } else {
        if (window.wx) {
          console.log('has wx');
          _this2.wx = window.wx;
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
  WxShare.prototype._ready = function _ready() {
    var _this3 = this;

    return new Promise(function (resolve) {
      if (_this3.isConfigReady) {
        resolve();
      } else {
        console.log('set wx.config');
        _this3.wx.config(_this3.wxConfig);

        _this3.wx.ready(function () {
          _this3.isConfigReady = true;

          if (_this3.readyCallBack) {
            _this3.readyCallBack();
          }

          resolve();
        });
      }
    });
  };

  return WxShare;
}();

/* harmony default export */ __webpack_exports__["default"] = (WxShare);
;

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * 单例模式构造函数(设计模式)
 * @returns {function(*=)}
 * @constructor
 */
/* harmony default export */ __webpack_exports__["a"] = (function () {
  var instance = void 0;
  return function (newInstance) {
    if (newInstance) {
      instance = newInstance;
    }
    return instance;
  };
});

/***/ }),
/* 2 */
/***/ (function(module, exports) {

if (typeof Object.assign != 'function') {
  // Must be writable: true, enumerable: false, configurable: true
  Object.defineProperty(Object, "assign", {
    value: function assign(target, varArgs) {
      // .length of function is 2
      'use strict';

      if (target == null) {
        // TypeError if undefined or null
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var to = Object(target);

      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];

        if (nextSource != null) {
          // Skip over if undefined or null
          for (var nextKey in nextSource) {
            // Avoid bugs when hasOwnProperty is shadowed
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    },
    writable: true,
    configurable: true
  });
}

/***/ })
/******/ ])["default"];
});