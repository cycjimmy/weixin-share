/*!
 * weixin-share v1.2.0
 * Homepage: https://github.com/cycdpo/weixin-share#readme
 * Released under the MIT License.
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["WxShare"] = factory();
	else
		root["WxShare"] = factory();
})(window, function() {
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/awesome-js-funcs/designPattern/CreateInstance.js":
/*!***********************************************************************!*\
  !*** ./node_modules/awesome-js-funcs/designPattern/CreateInstance.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * 单例模式构造函数(设计模式)
 * @returns {function(*=)}
 * @constructor
 */
/* harmony default export */ __webpack_exports__["default"] = (function () {
  var instance;
  return function (newInstance) {
    if (newInstance) {
      instance = newInstance;
    }

    return instance;
  };
});

/***/ }),

/***/ "./node_modules/object-assign/index.js":
/*!*********************************************!*\
  !*** ./node_modules/object-assign/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return WxShare; });
/* harmony import */ var awesome_js_funcs_designPattern_CreateInstance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! awesome-js-funcs/designPattern/CreateInstance */ "./node_modules/awesome-js-funcs/designPattern/CreateInstance.js");
/* harmony import */ var object_assign__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");
/* harmony import */ var object_assign__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(object_assign__WEBPACK_IMPORTED_MODULE_1__);
// constructor
 // polyfill



var _instance = new awesome_js_funcs_designPattern_CreateInstance__WEBPACK_IMPORTED_MODULE_0__["default"]();

var WX_JSSDK_URL = 'https://res.wx.qq.com/open/js/jweixin-1.4.0.js';

var WxShare =
/*#__PURE__*/
function () {
  function WxShare() {
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
      imgUrl: ''
    };
    this._isInitDefaultShare = false;

    _instance(this);
  }

  var _proto = WxShare.prototype;

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
  _proto.config = function config(_ref) {
    var _ref$debug = _ref.debug,
        debug = _ref$debug === void 0 ? false : _ref$debug,
        appId = _ref.appId,
        timestamp = _ref.timestamp,
        nonceStr = _ref.nonceStr,
        signature = _ref.signature,
        _ref$jsApiList = _ref.jsApiList,
        jsApiList = _ref$jsApiList === void 0 ? ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone', 'onMenuShareWeibo'] : _ref$jsApiList;
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
  _proto.setReadyCallBack = function setReadyCallBack(readyCallBack) {
    if (readyCallBack === void 0) {
      readyCallBack = function readyCallBack() {};
    }

    this.readyCallBack = readyCallBack;
    return this;
  };

  /**
   * setDefaultShare
   * @param defaultShare
   * @return {WxShare}
   */
  _proto.setDefaultShare = function setDefaultShare(defaultShare) {
    if (defaultShare === void 0) {
      defaultShare = {};
    }

    this.defaultShare = object_assign__WEBPACK_IMPORTED_MODULE_1___default()({}, this.defaultShare, defaultShare);
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
  _proto.share = function share(shareData) {
    var _this = this;

    if (shareData === void 0) {
      shareData = {};
    }

    if (!this._isInitDefaultShare) {
      this.setDefaultShare(shareData);
    } else {
      shareData = object_assign__WEBPACK_IMPORTED_MODULE_1___default()({}, this.defaultShare, shareData);
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

      _this.wx.updateAppMessageShareData(shareData, function (res) {
        return console.log(res);
      });

      _this.wx.updateTimelineShareData(shareData, function (res) {
        return console.log(res);
      });
    });
  };

  /**
   * backToDefault
   * @return {*}
   */
  _proto.backToDefault = function backToDefault() {
    return this.share();
  };

  /**
   * init Wechat JSSDK
   * @return {Promise<any>}
   * @private
   */
  _proto._initWxSDK = function _initWxSDK() {
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
  _proto._ready = function _ready() {
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


;

/***/ })

/******/ })["default"];
});
//# sourceMappingURL=WxShare.js.map