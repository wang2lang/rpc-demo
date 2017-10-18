/******/ (function(modules) { // webpackBootstrap
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

// CONCATENATED MODULE: ./src/utils/uuid-v4.js
function generateUUID() {
  var d = new Date().getTime();
  if (window.performance && typeof window.performance.now === 'function') {
    d += performance.now();
  }
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : r & 0x3 | 0x8).toString(16);
  });
  return uuid;
}
// CONCATENATED MODULE: ./src/utils/packet.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var packet_RequestPacket = function RequestPacket(method, params) {
  _classCallCheck(this, RequestPacket);

  this.id = generateUUID();
  this.method = method;
  this.params = params;
  this.type = 'request';
};

var ResponsePacket = function ResponsePacket(id, result, error) {
  _classCallCheck(this, ResponsePacket);

  this.id = id;
  this.result = result;
  this.error = error;
  this.type = 'response';
};
// CONCATENATED MODULE: ./src/shared-variable/client.js
/**
 * simulant-webview client
 */

var _requests = {};

window.__send_to_client = function (packet) {
  var result = packet.result,
      error = packet.error,
      id = packet.id;

  if (error) {
    _requests[id].reject(error);
  } else {
    _requests[id].resolve(result);
  }
  delete _requests[id];
};

function sendRequest(method, params) {
  var packet = new packet_RequestPacket(method, params);
  var id = packet.id;

  return new Promise(function (resolve, reject) {
    _requests[id] = { resolve: resolve, reject: reject };
    window.__send_to_server(packet);
  });
}
// CONCATENATED MODULE: ./src/utils/help.js
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function isUndefined(fn) {
  return typeof fn === 'undefined';
}

function isFunction(fn) {
  return typeof fn === 'function';
}

function isObject(obj) {
  return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
}

function isString(str) {
  return typeof str === 'string';
}

function isArray(array) {
  return Object.prototype.toString.call(array) === '[object Array]';
}

function sendStorageMessage(key, packet) {
  localStorage.setItem(key, JSON.stringify(packet));
  setTimeout(function () {
    localStorage.removeItem(key);
  }, 0);
}

function getStorageMessage(event, key) {
  return event.key === key ? event.newValue ? JSON.parse(event.newValue) : null : null;
}
// CONCATENATED MODULE: ./src/utils/rpc.js
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function rpc__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }




var rpc_Rpc = function () {
  function Rpc() {
    rpc__classCallCheck(this, Rpc);

    this.procedures = {};
  }

  _createClass(Rpc, [{
    key: 'add',
    value: function add(key, cb) {
      this.procedures[key] = cb;
    }
  }, {
    key: 'call',
    value: function call(packet) {
      var method = packet.method,
          params = packet.params,
          id = packet.id;

      var _params = parse(params);
      var _method = this.procedures[method];
      return _method ? new ResponsePacket(id, _method.apply(undefined, _toConsumableArray(_params)), null) : new ResponsePacket(id, null, 'Cannot find method ' + method + ' in server procedures!');
    }
  }]);

  return Rpc;
}();

/* harmony default export */ var rpc = (rpc_Rpc);


function parse(params) {
  return isObject(params) ? Object.values(params) : isArray(params) ? params : [params];
}
// CONCATENATED MODULE: ./src/utils/procedures.js
/**
 * store datas by closure
 */
var _data = {
  token: '91349b0c45a99fc36cf2',
  num: 0
};
var $container = document.querySelector('#container');

/**
 * server procedures
 */
var procedures = {
  getToken: function getToken(key) {
    return _data.token;
  },
  setData: function setData(key, value) {
    _data[key] = value;
    return 'set data success!';
  },
  addNum: function addNum() {
    _data.num = _data.num + 1;
    $container.innerHTML = 'Current Number: ' + _data.num;
    return _data.num;
  },
  reduceNum: function reduceNum() {
    _data.num = _data.num - 1;
    $container.innerHTML = 'Current Number: ' + _data.num;
    return _data.num;
  }
};

/* harmony default export */ var utils_procedures = (procedures);
// CONCATENATED MODULE: ./src/shared-variable/server.js
var server__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function server__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * simulant-client server
 */




var Server = function (_Rpc) {
  _inherits(Server, _Rpc);

  function Server() {
    server__classCallCheck(this, Server);

    return _possibleConstructorReturn(this, (Server.__proto__ || Object.getPrototypeOf(Server)).call(this));
  }

  server__createClass(Server, [{
    key: 'init',
    value: function init(procedures) {
      var _this2 = this;

      Object.keys(procedures).forEach(function (key) {
        _this2.add(key, procedures[key]);
      });
    }
  }]);

  return Server;
}(rpc);

var server = new Server();
server.init(utils_procedures);

window.__send_to_server = function (packet) {
  window.__send_to_client(server.call(packet));
};
// CONCATENATED MODULE: ./src/shared-variable/index.js



var $addControl = document.querySelector('#control > .add');
var $reduceControl = document.querySelector('#control > .reduce');

function init() {
  $addControl.addEventListener('click', function () {
    sendRequest('addNum').then(function (res) {
      console.info(res);
    });
  });

  $reduceControl.addEventListener('click', function () {
    sendRequest('reduceNum').then(function (res) {
      console.info(res);
    });
  });
}

/**
 * entry point
 */
init();

/***/ })
/******/ ]);