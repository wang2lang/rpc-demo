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


class packet_RequestPacket {
  constructor(method, params) {
    this.id = generateUUID();
    this.method = method;
    this.params = params;
    this.type = 'request';
  }
}

class ResponsePacket {
  constructor(id, result, error) {
    this.id = id;
    this.result = result;
    this.error = error;
    this.type = 'response';
  }
}
// CONCATENATED MODULE: ./src/shared-variable/client.js
/**
 * simulant-webview client
 */

var _requests = {};

window.__send_to_client = packet => {
  const { result, error, id } = packet;
  if (error) {
    _requests[id].reject(error);
  } else {
    _requests[id].resolve(result);
  }
  delete _requests[id];
};

function sendRequest(method, params) {
  const packet = new packet_RequestPacket(method, params);
  const { id } = packet;
  return new Promise(function (resolve, reject) {
    _requests[id] = { resolve, reject };
    window.__send_to_server(packet);
  });
}
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
    return _method ? new ResponsePacket(id, _method(..._params), null) : new ResponsePacket(id, null, `Cannot find method ${method} in server procedures!`);
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
// CONCATENATED MODULE: ./src/shared-variable/server.js
/**
 * simulant-client server
 */




class Server extends rpc_Rpc {
  constructor() {
    super();
  }

  init(procedures) {
    Object.keys(procedures).forEach(key => {
      this.add(key, procedures[key]);
    });

    window.__send_to_server = packet => {
      window.__send_to_client(server.call(packet));
    };
  }
}

const server = new Server();
server.init(utils_procedures);
// CONCATENATED MODULE: ./src/shared-variable/index.js



const $addControl = document.querySelector('#control > .add');
const $reduceControl = document.querySelector('#control > .reduce');

function init() {
  $addControl.addEventListener('click', async function () {
    var res = await sendRequest('addNum');
    console.log(res);
  });

  $reduceControl.addEventListener('click', async function () {
    var res = await sendRequest('reduceNum');
    console.info(res);
  });
}

/**
 * entry point
 */
init();

/***/ })
/******/ ]);