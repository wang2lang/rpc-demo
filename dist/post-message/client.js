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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
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
/* 1 */,
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./src/utils/packet.js + 1 modules
var utils_packet = __webpack_require__(0);

// CONCATENATED MODULE: ./src/post-message/client.js
/**
 * iframe client
 */

var _requests = {};
const iframeWindow = document.querySelector('#iframe').contentWindow;

window.addEventListener('message', function (event) {
  const { result, error, id } = event.data;
  if (error) {
    _requests[id].reject(error);
  } else {
    _requests[id].resolve(result);
  }
  delete _requests[id];
}, true);

function sendRequest(method, params) {
  const packet = new utils_packet["a" /* RequestPacket */](method, params);
  const { id } = packet;
  return new Promise(function (resolve, reject) {
    iframeWindow.postMessage(packet, '*');
    _requests[id] = { resolve, reject };
  });
}
// CONCATENATED MODULE: ./src/post-message/index.js


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