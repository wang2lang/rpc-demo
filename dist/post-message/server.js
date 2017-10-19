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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

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


class packet_RequestPacket {
  constructor(method, params) {
    this.id = generateUUID();
    this.method = method;
    this.params = params;
    this.type = 'request';
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = packet_RequestPacket;


class ResponsePacket {
  constructor(id, result, error) {
    this.id = id;
    this.result = result;
    this.error = error;
    this.type = 'response';
  }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = ResponsePacket;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/utils/help.js
function isUndefined(fn) {
  return typeof fn === 'undefined';
}

function isFunction(fn) {
  return typeof fn === 'function';
}

function isObject(obj) {
  return typeof obj === 'object';
}

function isString(str) {
  return typeof str === 'string';
}

function isArray(array) {
  return Object.prototype.toString.call(array) === '[object Array]';
}

function sendStorageMessage(key, packet) {
  localStorage.setItem(key, JSON.stringify(packet));
  setTimeout(() => {
    localStorage.removeItem(key);
  }, 0);
}

function getStorageMessage(event, key) {
  return event.key === key ? event.newValue ? JSON.parse(event.newValue) : null : null;
}
// EXTERNAL MODULE: ./src/utils/packet.js + 1 modules
var utils_packet = __webpack_require__(0);

// CONCATENATED MODULE: ./src/utils/rpc.js



class rpc_Rpc {
  constructor() {
    this.procedures = {};
  }

  add(key, cb) {
    this.procedures[key] = cb;
  }

  call(packet) {
    const { method, params, id } = packet;
    const _params = parse(params);
    const _method = this.procedures[method];
    return _method ? new utils_packet["b" /* ResponsePacket */](id, _method(..._params), null) : new utils_packet["b" /* ResponsePacket */](id, null, `Cannot find method ${method} in server procedures!`);
  }

}

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
const $container = document.querySelector('#container');

/**
 * server procedures
 */
const procedures = {
  getToken(key) {
    return _data.token;
  },
  setData(key, value) {
    _data[key] = value;
    return 'set data success!';
  },
  addNum() {
    _data.num = _data.num + 1;
    $container.innerHTML = `Current Number: ${_data.num}`;
    return _data.num;
  },
  reduceNum() {
    _data.num = _data.num - 1;
    $container.innerHTML = `Current Number: ${_data.num}`;
    return _data.num;
  }
};

/* harmony default export */ var utils_procedures = (procedures);
// CONCATENATED MODULE: ./src/post-message/server.js
/**
 * iframe container server
 */




class Server extends rpc_Rpc {
  constructor() {
    super();
  }

  init(procedures) {
    Object.keys(procedures).forEach(key => {
      this.add(key, procedures[key]);
    });

    window.addEventListener('message', event => {
      var packet = event.data;
      event.source.postMessage(server.call(packet), event.origin);
    });
  }
}

const server = new Server();
/* harmony export (immutable) */ __webpack_exports__["server"] = server;

server.init(utils_procedures);

/***/ })
/******/ ]);