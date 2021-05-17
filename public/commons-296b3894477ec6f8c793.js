(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "8+s/":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _interopDefault(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex;
}

var React = __webpack_require__("q1tI");

var React__default = _interopDefault(React);

var shallowEqual = _interopDefault(__webpack_require__("Gytx"));

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

function withSideEffect(reducePropsToState, handleStateChangeOnClient, mapStateOnServer) {
  if (typeof reducePropsToState !== 'function') {
    throw new Error('Expected reducePropsToState to be a function.');
  }

  if (typeof handleStateChangeOnClient !== 'function') {
    throw new Error('Expected handleStateChangeOnClient to be a function.');
  }

  if (typeof mapStateOnServer !== 'undefined' && typeof mapStateOnServer !== 'function') {
    throw new Error('Expected mapStateOnServer to either be undefined or a function.');
  }

  function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
  }

  return function wrap(WrappedComponent) {
    if (typeof WrappedComponent !== 'function') {
      throw new Error('Expected WrappedComponent to be a React component.');
    }

    var mountedInstances = [];
    var state;

    function emitChange() {
      state = reducePropsToState(mountedInstances.map(function (instance) {
        return instance.props;
      }));

      if (SideEffect.canUseDOM) {
        handleStateChangeOnClient(state);
      } else if (mapStateOnServer) {
        state = mapStateOnServer(state);
      }
    }

    var SideEffect = /*#__PURE__*/function (_Component) {
      _inheritsLoose(SideEffect, _Component);

      function SideEffect() {
        return _Component.apply(this, arguments) || this;
      } // Try to use displayName of wrapped component
      // Expose canUseDOM so tests can monkeypatch it


      SideEffect.peek = function peek() {
        return state;
      };

      SideEffect.rewind = function rewind() {
        if (SideEffect.canUseDOM) {
          throw new Error('You may only call rewind() on the server. Call peek() to read the current state.');
        }

        var recordedState = state;
        state = undefined;
        mountedInstances = [];
        return recordedState;
      };

      var _proto = SideEffect.prototype;

      _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
        return !shallowEqual(nextProps, this.props);
      };

      _proto.componentWillMount = function componentWillMount() {
        mountedInstances.push(this);
        emitChange();
      };

      _proto.componentDidUpdate = function componentDidUpdate() {
        emitChange();
      };

      _proto.componentWillUnmount = function componentWillUnmount() {
        var index = mountedInstances.indexOf(this);
        mountedInstances.splice(index, 1);
        emitChange();
      };

      _proto.render = function render() {
        return React__default.createElement(WrappedComponent, this.props);
      };

      return SideEffect;
    }(React.Component);

    _defineProperty(SideEffect, "displayName", "SideEffect(" + getDisplayName(WrappedComponent) + ")");

    _defineProperty(SideEffect, "canUseDOM", canUseDOM);

    return SideEffect;
  };
}

module.exports = withSideEffect;

/***/ }),

/***/ "8oxB":
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};

/***/ }),

/***/ "9uj6":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/@emotion/memoize/dist/memoize.browser.esm.js
function memoize(fn) {
  var cache = {};
  return function (arg) {
    if (cache[arg] === undefined) cache[arg] = fn(arg);
    return cache[arg];
  };
}

/* harmony default export */ var memoize_browser_esm = (memoize);
// CONCATENATED MODULE: ./node_modules/@emotion/is-prop-valid/dist/is-prop-valid.browser.esm.js

var reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|inert|itemProp|itemScope|itemType|itemID|itemRef|on|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/; // https://esbench.com/bench/5bfee68a4cd7e6009ef61d23

var index = memoize_browser_esm(function (prop) {
  return reactPropsRegex.test(prop) || prop.charCodeAt(0) === 111
  /* o */
  && prop.charCodeAt(1) === 110
  /* n */
  && prop.charCodeAt(2) < 91;
}
/* Z+1 */
);
/* harmony default export */ var is_prop_valid_browser_esm = __webpack_exports__["a"] = (index);

/***/ }),

/***/ "DDoQ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Container; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Section; });
/* unused harmony export Section2 */
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("vOnD");
var Container=styled_components__WEBPACK_IMPORTED_MODULE_0__[/* default */ "c"].div.withConfig({displayName:"global__Container",componentId:"sc-1mkgt6u-0"})(["max-width:1440px;width:100%;margin:0 auto;padding:0 16px;@media (min-width:","){max-width:540px;}@media (min-width:","){max-width:720px;}@media (min-width:","){max-width:960px;}@media (min-width:","){max-width:1440px;}",";"],function(props){return props.theme.screen.xs;},function(props){return props.theme.screen.sm;},function(props){return props.theme.screen.md;},function(props){return props.theme.screen.lg;},function(props){return props.fluid&&"\n    max-width: 1200px !important;\n  ";});var Section=styled_components__WEBPACK_IMPORTED_MODULE_0__[/* default */ "c"].section.withConfig({displayName:"global__Section",componentId:"sc-1mkgt6u-1"})(["padding:96px 0;overflow:hidden;width:100%;@media (max-width:","){padding:96px 0;}",";",";"],function(props){return props.theme.screen.lg;},function(props){return props.accent&&"background-color: "+(props.accent==='secondary'?props.theme.color.black.pitch:props.theme.color.primary);},function(props){return props.accent&&"color: "+(props.accent==='secondary'?props.theme.color.primary:props.theme.color.white.regular);});var Section2=styled_components__WEBPACK_IMPORTED_MODULE_0__[/* default */ "c"].section.withConfig({displayName:"global__Section2",componentId:"sc-1mkgt6u-2"})(["  overflow:hidden;@media (max-width:","){padding:96px 0;}",";",";"],function(props){return props.theme.screen.md;},function(props){return props.accent&&"background-color: "+(props.accent==='secondary'?props.theme.color.black.pitch:props.theme.color.primary);},function(props){return props.accent&&"color: "+(props.accent==='secondary'?props.theme.color.primary:props.theme.color.white.regular);});

/***/ }),

/***/ "ECyS":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// UNUSED EXPORTS: concatArrays, merge

// CONCATENATED MODULE: ./node_modules/is-what/dist/index.esm.js
/**
 * Returns the object type of the given payload
 *
 * @param {*} payload
 * @returns {string}
 */
function getType(payload) {
  return Object.prototype.toString.call(payload).slice(8, -1);
}
/**
 * Returns whether the payload is undefined
 *
 * @param {*} payload
 * @returns {payload is undefined}
 */


function isUndefined(payload) {
  return getType(payload) === 'Undefined';
}
/**
 * Returns whether the payload is null
 *
 * @param {*} payload
 * @returns {payload is null}
 */


function isNull(payload) {
  return getType(payload) === 'Null';
}
/**
 * Returns whether the payload is a plain JavaScript object (excluding special classes or objects with other prototypes)
 *
 * @param {*} payload
 * @returns {payload is PlainObject}
 */


function isPlainObject(payload) {
  if (getType(payload) !== 'Object') return false;
  return payload.constructor === Object && Object.getPrototypeOf(payload) === Object.prototype;
}
/**
 * Returns whether the payload is a plain JavaScript object (excluding special classes or objects with other prototypes)
 *
 * @param {*} payload
 * @returns {payload is PlainObject}
 */


function isObject(payload) {
  return isPlainObject(payload);
}
/**
 * Returns whether the payload is a an empty object (excluding special classes or objects with other prototypes)
 *
 * @param {*} payload
 * @returns {payload is { [K in any]: never }}
 */


function isEmptyObject(payload) {
  return isPlainObject(payload) && Object.keys(payload).length === 0;
}
/**
 * Returns whether the payload is a an empty object (excluding special classes or objects with other prototypes)
 *
 * @param {*} payload
 * @returns {payload is PlainObject}
 */


function isFullObject(payload) {
  return isPlainObject(payload) && Object.keys(payload).length > 0;
}
/**
 * Returns whether the payload is an any kind of object (including special classes or objects with different prototypes)
 *
 * @param {*} payload
 * @returns {payload is PlainObject}
 */


function isAnyObject(payload) {
  return getType(payload) === 'Object';
}
/**
 * Returns whether the payload is an object like a type passed in < >
 *
 * Usage: isObjectLike<{id: any}>(payload) // will make sure it's an object and has an `id` prop.
 *
 * @template T this must be passed in < >
 * @param {*} payload
 * @returns {payload is T}
 */


function isObjectLike(payload) {
  return isAnyObject(payload);
}
/**
 * Returns whether the payload is a function (regular or async)
 *
 * @param {*} payload
 * @returns {payload is AnyFunction}
 */


function isFunction(payload) {
  return typeof payload === 'function';
}
/**
 * Returns whether the payload is an array
 *
 * @param {any} payload
 * @returns {payload is any[]}
 */


function isArray(payload) {
  return getType(payload) === 'Array';
}
/**
 * Returns whether the payload is a an array with at least 1 item
 *
 * @param {*} payload
 * @returns {payload is any[]}
 */


function isFullArray(payload) {
  return isArray(payload) && payload.length > 0;
}
/**
 * Returns whether the payload is a an empty array
 *
 * @param {*} payload
 * @returns {payload is []}
 */


function isEmptyArray(payload) {
  return isArray(payload) && payload.length === 0;
}
/**
 * Returns whether the payload is a string
 *
 * @param {*} payload
 * @returns {payload is string}
 */


function isString(payload) {
  return getType(payload) === 'String';
}
/**
 * Returns whether the payload is a string, BUT returns false for ''
 *
 * @param {*} payload
 * @returns {payload is string}
 */


function isFullString(payload) {
  return isString(payload) && payload !== '';
}
/**
 * Returns whether the payload is ''
 *
 * @param {*} payload
 * @returns {payload is string}
 */


function isEmptyString(payload) {
  return payload === '';
}
/**
 * Returns whether the payload is a number (but not NaN)
 *
 * This will return `false` for `NaN`!!
 *
 * @param {*} payload
 * @returns {payload is number}
 */


function isNumber(payload) {
  return getType(payload) === 'Number' && !isNaN(payload);
}
/**
 * Returns whether the payload is a boolean
 *
 * @param {*} payload
 * @returns {payload is boolean}
 */


function isBoolean(payload) {
  return getType(payload) === 'Boolean';
}
/**
 * Returns whether the payload is a regular expression (RegExp)
 *
 * @param {*} payload
 * @returns {payload is RegExp}
 */


function isRegExp(payload) {
  return getType(payload) === 'RegExp';
}
/**
 * Returns whether the payload is a Map
 *
 * @param {*} payload
 * @returns {payload is Map<any, any>}
 */


function isMap(payload) {
  return getType(payload) === 'Map';
}
/**
 * Returns whether the payload is a WeakMap
 *
 * @param {*} payload
 * @returns {payload is WeakMap<any, any>}
 */


function isWeakMap(payload) {
  return getType(payload) === 'WeakMap';
}
/**
 * Returns whether the payload is a Set
 *
 * @param {*} payload
 * @returns {payload is Set<any>}
 */


function isSet(payload) {
  return getType(payload) === 'Set';
}
/**
 * Returns whether the payload is a WeakSet
 *
 * @param {*} payload
 * @returns {payload is WeakSet<any>}
 */


function isWeakSet(payload) {
  return getType(payload) === 'WeakSet';
}
/**
 * Returns whether the payload is a Symbol
 *
 * @param {*} payload
 * @returns {payload is symbol}
 */


function isSymbol(payload) {
  return getType(payload) === 'Symbol';
}
/**
 * Returns whether the payload is a Date, and that the date is valid
 *
 * @param {*} payload
 * @returns {payload is Date}
 */


function isDate(payload) {
  return getType(payload) === 'Date' && !isNaN(payload);
}
/**
 * Returns whether the payload is a Blob
 *
 * @param {*} payload
 * @returns {payload is Blob}
 */


function isBlob(payload) {
  return getType(payload) === 'Blob';
}
/**
 * Returns whether the payload is a File
 *
 * @param {*} payload
 * @returns {payload is File}
 */


function isFile(payload) {
  return getType(payload) === 'File';
}
/**
 * Returns whether the payload is a Promise
 *
 * @param {*} payload
 * @returns {payload is Promise<any>}
 */


function isPromise(payload) {
  return getType(payload) === 'Promise';
}
/**
 * Returns whether the payload is an Error
 *
 * @param {*} payload
 * @returns {payload is Error}
 */


function isError(payload) {
  return getType(payload) === 'Error';
}
/**
 * Returns whether the payload is literally the value `NaN` (it's `NaN` and also a `number`)
 *
 * @param {*} payload
 * @returns {payload is typeof NaN}
 */


function isNaNValue(payload) {
  return getType(payload) === 'Number' && isNaN(payload);
}
/**
 * Returns whether the payload is a primitive type (eg. Boolean | Null | Undefined | Number | String | Symbol)
 *
 * @param {*} payload
 * @returns {(payload is boolean | null | undefined | number | string | symbol)}
 */


function isPrimitive(payload) {
  return isBoolean(payload) || isNull(payload) || isUndefined(payload) || isNumber(payload) || isString(payload) || isSymbol(payload);
}
/**
 * Returns true whether the payload is null or undefined
 *
 * @param {*} payload
 * @returns {(payload is null | undefined)}
 */


var isNullOrUndefined = isOneOf(isNull, isUndefined);

function isOneOf(a, b, c, d, e) {
  return function (value) {
    return a(value) || b(value) || !!c && c(value) || !!d && d(value) || !!e && e(value);
  };
}
/**
 * Does a generic check to check that the given payload is of a given type.
 * In cases like Number, it will return true for NaN as NaN is a Number (thanks javascript!);
 * It will, however, differentiate between object and null
 *
 * @template T
 * @param {*} payload
 * @param {T} type
 * @throws {TypeError} Will throw type error if type is an invalid type
 * @returns {payload is T}
 */


function isType(payload, type) {
  if (!(type instanceof Function)) {
    throw new TypeError('Type must be a function');
  }

  if (!Object.prototype.hasOwnProperty.call(type, 'prototype')) {
    throw new TypeError('Type is not a class');
  } // Classes usually have names (as functions usually have names)


  var name = type.name;
  return getType(payload) === name || Boolean(payload && payload.constructor === type);
}


// CONCATENATED MODULE: ./node_modules/merge-anything/dist/index.esm.js

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
}

function assignProp(carry, key, newVal, originalObject) {
  var propType = originalObject.propertyIsEnumerable(key) ? 'enumerable' : 'nonenumerable';
  if (propType === 'enumerable') carry[key] = newVal;

  if (propType === 'nonenumerable') {
    Object.defineProperty(carry, key, {
      value: newVal,
      enumerable: false,
      writable: true,
      configurable: true
    });
  }
}

function mergeRecursively(origin, newComer, extensions) {
  // work directly on newComer if its not an object
  if (!isPlainObject(newComer)) {
    // extend merge rules
    if (extensions && isArray(extensions)) {
      extensions.forEach(function (extend) {
        newComer = extend(origin, newComer);
      });
    }

    return newComer;
  } // define newObject to merge all values upon


  var newObject = {};

  if (isPlainObject(origin)) {
    var props_1 = Object.getOwnPropertyNames(origin);
    var symbols_1 = Object.getOwnPropertySymbols(origin);
    newObject = __spreadArrays(props_1, symbols_1).reduce(function (carry, key) {
      // @ts-ignore
      var targetVal = origin[key];

      if (!isSymbol(key) && !Object.getOwnPropertyNames(newComer).includes(key) || isSymbol(key) && !Object.getOwnPropertySymbols(newComer).includes(key)) {
        assignProp(carry, key, targetVal, origin);
      }

      return carry;
    }, {});
  }

  var props = Object.getOwnPropertyNames(newComer);
  var symbols = Object.getOwnPropertySymbols(newComer);

  var result = __spreadArrays(props, symbols).reduce(function (carry, key) {
    // re-define the origin and newComer as targetVal and newVal
    var newVal = newComer[key];
    var targetVal = isPlainObject(origin) ? // @ts-ignore
    origin[key] : undefined; // extend merge rules

    if (extensions && isArray(extensions)) {
      extensions.forEach(function (extend) {
        newVal = extend(targetVal, newVal);
      });
    } // When newVal is an object do the merge recursively


    if (targetVal !== undefined && isPlainObject(newVal)) {
      newVal = mergeRecursively(targetVal, newVal, extensions);
    }

    assignProp(carry, key, newVal, newComer);
    return carry;
  }, newObject);

  return result;
}
/**
 * Merge anything recursively.
 * Objects get merged, special objects (classes etc.) are re-assigned "as is".
 * Basic types overwrite objects or other basic types.
 *
 * @param {(IConfig | any)} origin
 * @param {...any[]} newComers
 * @returns the result
 */


function merge(origin) {
  var newComers = [];

  for (var _i = 1; _i < arguments.length; _i++) {
    newComers[_i - 1] = arguments[_i];
  }

  var extensions = null;
  var base = origin;

  if (isPlainObject(origin) && origin.extensions && Object.keys(origin).length === 1) {
    base = {};
    extensions = origin.extensions;
  }

  return newComers.reduce(function (result, newComer) {
    return mergeRecursively(result, newComer, extensions);
  }, base);
}

function concatArrays(originVal, newVal) {
  if (isArray(originVal) && isArray(newVal)) {
    // concat logic
    return originVal.concat(newVal);
  }

  return newVal; // always return newVal as fallback!!
}

/* harmony default export */ var index_esm = __webpack_exports__["a"] = (merge);


/***/ }),

/***/ "Gytx":
/***/ (function(module, exports) {

//
module.exports = function shallowEqual(objA, objB, compare, compareContext) {
  var ret = compare ? compare.call(compareContext, objA, objB) : void 0;

  if (ret !== void 0) {
    return !!ret;
  }

  if (objA === objB) {
    return true;
  }

  if (typeof objA !== "object" || !objA || typeof objB !== "object" || !objB) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB); // Test for A's keys different from B.

  for (var idx = 0; idx < keysA.length; idx++) {
    var key = keysA[idx];

    if (!bHasOwnProperty(key)) {
      return false;
    }

    var valueA = objA[key];
    var valueB = objB[key];
    ret = compare ? compare.call(compareContext, valueA, valueB, key) : void 0;

    if (ret === false || ret === void 0 && valueA !== valueB) {
      return false;
    }
  }

  return true;
};

/***/ }),

/***/ "ME5O":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var unitlessKeys = {
  animationIterationCount: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};
/* harmony default export */ __webpack_exports__["a"] = (unitlessKeys);

/***/ }),

/***/ "TAZq":
/***/ (function(module, exports, __webpack_require__) {

(function (factory) {
   true ? module['exports'] = factory() : undefined;
})(function () {
  'use strict';

  return function (insertRule) {
    var delimiter = '/*|*/';
    var needle = delimiter + '}';

    function toSheet(block) {
      if (block) try {
        insertRule(block + '}');
      } catch (e) {}
    }

    return function ruleSheet(context, content, selectors, parents, line, column, length, ns, depth, at) {
      switch (context) {
        // property
        case 1:
          // @import
          if (depth === 0 && content.charCodeAt(0) === 64) return insertRule(content + ';'), '';
          break;
        // selector

        case 2:
          if (ns === 0) return content + delimiter;
          break;
        // at-rule

        case 3:
          switch (ns) {
            // @font-face, @page
            case 102:
            case 112:
              return insertRule(selectors[0] + content), '';

            default:
              return content + (at === 0 ? delimiter : '');
          }

        case -2:
          content.split(needle).forEach(toSheet);
      }
    };
  };
});

/***/ }),

/***/ "TJpk":
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;
exports.Helmet = undefined;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _react = __webpack_require__("q1tI");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__("17x9");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactSideEffect = __webpack_require__("8+s/");

var _reactSideEffect2 = _interopRequireDefault(_reactSideEffect);

var _reactFastCompare = __webpack_require__("bmMU");

var _reactFastCompare2 = _interopRequireDefault(_reactFastCompare);

var _HelmetUtils = __webpack_require__("v1p5");

var _HelmetConstants = __webpack_require__("hFT/");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _objectWithoutProperties(obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Helmet = function Helmet(Component) {
  var _class, _temp;

  return _temp = _class = function (_React$Component) {
    _inherits(HelmetWrapper, _React$Component);

    function HelmetWrapper() {
      _classCallCheck(this, HelmetWrapper);

      return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    HelmetWrapper.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
      return !(0, _reactFastCompare2.default)(this.props, nextProps);
    };

    HelmetWrapper.prototype.mapNestedChildrenToProps = function mapNestedChildrenToProps(child, nestedChildren) {
      if (!nestedChildren) {
        return null;
      }

      switch (child.type) {
        case _HelmetConstants.TAG_NAMES.SCRIPT:
        case _HelmetConstants.TAG_NAMES.NOSCRIPT:
          return {
            innerHTML: nestedChildren
          };

        case _HelmetConstants.TAG_NAMES.STYLE:
          return {
            cssText: nestedChildren
          };
      }

      throw new Error("<" + child.type + " /> elements are self-closing and can not contain children. Refer to our API for more information.");
    };

    HelmetWrapper.prototype.flattenArrayTypeChildren = function flattenArrayTypeChildren(_ref) {
      var _extends2;

      var child = _ref.child,
          arrayTypeChildren = _ref.arrayTypeChildren,
          newChildProps = _ref.newChildProps,
          nestedChildren = _ref.nestedChildren;
      return _extends({}, arrayTypeChildren, (_extends2 = {}, _extends2[child.type] = [].concat(arrayTypeChildren[child.type] || [], [_extends({}, newChildProps, this.mapNestedChildrenToProps(child, nestedChildren))]), _extends2));
    };

    HelmetWrapper.prototype.mapObjectTypeChildren = function mapObjectTypeChildren(_ref2) {
      var _extends3, _extends4;

      var child = _ref2.child,
          newProps = _ref2.newProps,
          newChildProps = _ref2.newChildProps,
          nestedChildren = _ref2.nestedChildren;

      switch (child.type) {
        case _HelmetConstants.TAG_NAMES.TITLE:
          return _extends({}, newProps, (_extends3 = {}, _extends3[child.type] = nestedChildren, _extends3.titleAttributes = _extends({}, newChildProps), _extends3));

        case _HelmetConstants.TAG_NAMES.BODY:
          return _extends({}, newProps, {
            bodyAttributes: _extends({}, newChildProps)
          });

        case _HelmetConstants.TAG_NAMES.HTML:
          return _extends({}, newProps, {
            htmlAttributes: _extends({}, newChildProps)
          });
      }

      return _extends({}, newProps, (_extends4 = {}, _extends4[child.type] = _extends({}, newChildProps), _extends4));
    };

    HelmetWrapper.prototype.mapArrayTypeChildrenToProps = function mapArrayTypeChildrenToProps(arrayTypeChildren, newProps) {
      var newFlattenedProps = _extends({}, newProps);

      Object.keys(arrayTypeChildren).forEach(function (arrayChildName) {
        var _extends5;

        newFlattenedProps = _extends({}, newFlattenedProps, (_extends5 = {}, _extends5[arrayChildName] = arrayTypeChildren[arrayChildName], _extends5));
      });
      return newFlattenedProps;
    };

    HelmetWrapper.prototype.warnOnInvalidChildren = function warnOnInvalidChildren(child, nestedChildren) {
      if (false) {}

      return true;
    };

    HelmetWrapper.prototype.mapChildrenToProps = function mapChildrenToProps(children, newProps) {
      var _this2 = this;

      var arrayTypeChildren = {};

      _react2.default.Children.forEach(children, function (child) {
        if (!child || !child.props) {
          return;
        }

        var _child$props = child.props,
            nestedChildren = _child$props.children,
            childProps = _objectWithoutProperties(_child$props, ["children"]);

        var newChildProps = (0, _HelmetUtils.convertReactPropstoHtmlAttributes)(childProps);

        _this2.warnOnInvalidChildren(child, nestedChildren);

        switch (child.type) {
          case _HelmetConstants.TAG_NAMES.LINK:
          case _HelmetConstants.TAG_NAMES.META:
          case _HelmetConstants.TAG_NAMES.NOSCRIPT:
          case _HelmetConstants.TAG_NAMES.SCRIPT:
          case _HelmetConstants.TAG_NAMES.STYLE:
            arrayTypeChildren = _this2.flattenArrayTypeChildren({
              child: child,
              arrayTypeChildren: arrayTypeChildren,
              newChildProps: newChildProps,
              nestedChildren: nestedChildren
            });
            break;

          default:
            newProps = _this2.mapObjectTypeChildren({
              child: child,
              newProps: newProps,
              newChildProps: newChildProps,
              nestedChildren: nestedChildren
            });
            break;
        }
      });

      newProps = this.mapArrayTypeChildrenToProps(arrayTypeChildren, newProps);
      return newProps;
    };

    HelmetWrapper.prototype.render = function render() {
      var _props = this.props,
          children = _props.children,
          props = _objectWithoutProperties(_props, ["children"]);

      var newProps = _extends({}, props);

      if (children) {
        newProps = this.mapChildrenToProps(children, newProps);
      }

      return _react2.default.createElement(Component, newProps);
    };

    _createClass(HelmetWrapper, null, [{
      key: "canUseDOM",
      // Component.peek comes from react-side-effect:
      // For testing, you may use a static peek() method available on the returned component.
      // It lets you get the current state without resetting the mounted instance stack.
      // Don’t use it for anything other than testing.

      /**
       * @param {Object} base: {"target": "_blank", "href": "http://mysite.com/"}
       * @param {Object} bodyAttributes: {"className": "root"}
       * @param {String} defaultTitle: "Default Title"
       * @param {Boolean} defer: true
       * @param {Boolean} encodeSpecialCharacters: true
       * @param {Object} htmlAttributes: {"lang": "en", "amp": undefined}
       * @param {Array} link: [{"rel": "canonical", "href": "http://mysite.com/example"}]
       * @param {Array} meta: [{"name": "description", "content": "Test description"}]
       * @param {Array} noscript: [{"innerHTML": "<img src='http://mysite.com/js/test.js'"}]
       * @param {Function} onChangeClientState: "(newState) => console.log(newState)"
       * @param {Array} script: [{"type": "text/javascript", "src": "http://mysite.com/js/test.js"}]
       * @param {Array} style: [{"type": "text/css", "cssText": "div { display: block; color: blue; }"}]
       * @param {String} title: "Title"
       * @param {Object} titleAttributes: {"itemprop": "name"}
       * @param {String} titleTemplate: "MySite.com - %s"
       */
      set: function set(canUseDOM) {
        Component.canUseDOM = canUseDOM;
      }
    }]);

    return HelmetWrapper;
  }(_react2.default.Component), _class.propTypes = {
    base: _propTypes2.default.object,
    bodyAttributes: _propTypes2.default.object,
    children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node]),
    defaultTitle: _propTypes2.default.string,
    defer: _propTypes2.default.bool,
    encodeSpecialCharacters: _propTypes2.default.bool,
    htmlAttributes: _propTypes2.default.object,
    link: _propTypes2.default.arrayOf(_propTypes2.default.object),
    meta: _propTypes2.default.arrayOf(_propTypes2.default.object),
    noscript: _propTypes2.default.arrayOf(_propTypes2.default.object),
    onChangeClientState: _propTypes2.default.func,
    script: _propTypes2.default.arrayOf(_propTypes2.default.object),
    style: _propTypes2.default.arrayOf(_propTypes2.default.object),
    title: _propTypes2.default.string,
    titleAttributes: _propTypes2.default.object,
    titleTemplate: _propTypes2.default.string
  }, _class.defaultProps = {
    defer: true,
    encodeSpecialCharacters: true
  }, _class.peek = Component.peek, _class.rewind = function () {
    var mappedState = Component.rewind();

    if (!mappedState) {
      // provide fallback if mappedState is undefined
      mappedState = (0, _HelmetUtils.mapStateOnServer)({
        baseTag: [],
        bodyAttributes: {},
        encodeSpecialCharacters: true,
        htmlAttributes: {},
        linkTags: [],
        metaTags: [],
        noscriptTags: [],
        scriptTags: [],
        styleTags: [],
        title: "",
        titleAttributes: {}
      });
    }

    return mappedState;
  }, _temp;
};

var NullComponent = function NullComponent() {
  return null;
};

var HelmetSideEffects = (0, _reactSideEffect2.default)(_HelmetUtils.reducePropsToState, _HelmetUtils.handleClientStateChange, _HelmetUtils.mapStateOnServer)(NullComponent);
var HelmetExport = Helmet(HelmetSideEffects);
HelmetExport.renderStatic = HelmetExport.rewind;
exports.Helmet = HelmetExport;
exports.default = HelmetExport;

/***/ }),

/***/ "TOwV":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (true) {
  module.exports = __webpack_require__("qT12");
} else {}

/***/ }),

/***/ "Wwog":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var safeIsNaN = Number.isNaN || function ponyfill(value) {
  return typeof value === 'number' && value !== value;
};

function isEqual(first, second) {
  if (first === second) {
    return true;
  }

  if (safeIsNaN(first) && safeIsNaN(second)) {
    return true;
  }

  return false;
}

function areInputsEqual(newInputs, lastInputs) {
  if (newInputs.length !== lastInputs.length) {
    return false;
  }

  for (var i = 0; i < newInputs.length; i++) {
    if (!isEqual(newInputs[i], lastInputs[i])) {
      return false;
    }
  }

  return true;
}

function memoizeOne(resultFn, isEqual) {
  if (isEqual === void 0) {
    isEqual = areInputsEqual;
  }

  var lastThis;
  var lastArgs = [];
  var lastResult;
  var calledOnce = false;

  function memoized() {
    var newArgs = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      newArgs[_i] = arguments[_i];
    }

    if (calledOnce && lastThis === this && isEqual(newArgs, lastArgs)) {
      return lastResult;
    }

    lastResult = resultFn.apply(this, newArgs);
    calledOnce = true;
    lastThis = this;
    lastArgs = newArgs;
    return lastResult;
  }

  return memoized;
}

/* harmony default export */ __webpack_exports__["a"] = (memoizeOne);

/***/ }),

/***/ "aJjT":
/***/ (function(module, exports, __webpack_require__) {

!function (e) {
   true ? module.exports = e(null) : undefined;
}(function e(a) {
  "use strict";

  var r = /^\0+/g,
      c = /[\0\r\f]/g,
      s = /: */g,
      t = /zoo|gra/,
      i = /([,: ])(transform)/g,
      f = /,+\s*(?![^(]*[)])/g,
      n = / +\s*(?![^(]*[)])/g,
      l = / *[\0] */g,
      o = /,\r+?/g,
      h = /([\t\r\n ])*\f?&/g,
      u = /:global\(((?:[^\(\)\[\]]*|\[.*\]|\([^\(\)]*\))*)\)/g,
      d = /\W+/g,
      b = /@(k\w+)\s*(\S*)\s*/,
      p = /::(place)/g,
      k = /:(read-only)/g,
      g = /\s+(?=[{\];=:>])/g,
      A = /([[}=:>])\s+/g,
      C = /(\{[^{]+?);(?=\})/g,
      w = /\s{2,}/g,
      v = /([^\(])(:+) */g,
      m = /[svh]\w+-[tblr]{2}/,
      x = /\(\s*(.*)\s*\)/g,
      $ = /([\s\S]*?);/g,
      y = /-self|flex-/g,
      O = /[^]*?(:[rp][el]a[\w-]+)[^]*/,
      j = /stretch|:\s*\w+\-(?:conte|avail)/,
      z = /([^-])(image-set\()/,
      N = "-webkit-",
      S = "-moz-",
      F = "-ms-",
      W = 59,
      q = 125,
      B = 123,
      D = 40,
      E = 41,
      G = 91,
      H = 93,
      I = 10,
      J = 13,
      K = 9,
      L = 64,
      M = 32,
      P = 38,
      Q = 45,
      R = 95,
      T = 42,
      U = 44,
      V = 58,
      X = 39,
      Y = 34,
      Z = 47,
      _ = 62,
      ee = 43,
      ae = 126,
      re = 0,
      ce = 12,
      se = 11,
      te = 107,
      ie = 109,
      fe = 115,
      ne = 112,
      le = 111,
      oe = 105,
      he = 99,
      ue = 100,
      de = 112,
      be = 1,
      pe = 1,
      ke = 0,
      ge = 1,
      Ae = 1,
      Ce = 1,
      we = 0,
      ve = 0,
      me = 0,
      xe = [],
      $e = [],
      ye = 0,
      Oe = null,
      je = -2,
      ze = -1,
      Ne = 0,
      Se = 1,
      Fe = 2,
      We = 3,
      qe = 0,
      Be = 1,
      De = "",
      Ee = "",
      Ge = "";

  function He(e, a, s, t, i) {
    for (var f, n, o = 0, h = 0, u = 0, d = 0, g = 0, A = 0, C = 0, w = 0, m = 0, $ = 0, y = 0, O = 0, j = 0, z = 0, R = 0, we = 0, $e = 0, Oe = 0, je = 0, ze = s.length, Je = ze - 1, Re = "", Te = "", Ue = "", Ve = "", Xe = "", Ye = ""; R < ze;) {
      if (C = s.charCodeAt(R), R === Je) if (h + d + u + o !== 0) {
        if (0 !== h) C = h === Z ? I : Z;
        d = u = o = 0, ze++, Je++;
      }

      if (h + d + u + o === 0) {
        if (R === Je) {
          if (we > 0) Te = Te.replace(c, "");

          if (Te.trim().length > 0) {
            switch (C) {
              case M:
              case K:
              case W:
              case J:
              case I:
                break;

              default:
                Te += s.charAt(R);
            }

            C = W;
          }
        }

        if (1 === $e) switch (C) {
          case B:
          case q:
          case W:
          case Y:
          case X:
          case D:
          case E:
          case U:
            $e = 0;

          case K:
          case J:
          case I:
          case M:
            break;

          default:
            for ($e = 0, je = R, g = C, R--, C = W; je < ze;) {
              switch (s.charCodeAt(je++)) {
                case I:
                case J:
                case W:
                  ++R, C = g, je = ze;
                  break;

                case V:
                  if (we > 0) ++R, C = g;

                case B:
                  je = ze;
              }
            }

        }

        switch (C) {
          case B:
            for (g = (Te = Te.trim()).charCodeAt(0), y = 1, je = ++R; R < ze;) {
              switch (C = s.charCodeAt(R)) {
                case B:
                  y++;
                  break;

                case q:
                  y--;
                  break;

                case Z:
                  switch (A = s.charCodeAt(R + 1)) {
                    case T:
                    case Z:
                      R = Qe(A, R, Je, s);
                  }

                  break;

                case G:
                  C++;

                case D:
                  C++;

                case Y:
                case X:
                  for (; R++ < Je && s.charCodeAt(R) !== C;) {
                    ;
                  }

              }

              if (0 === y) break;
              R++;
            }

            if (Ue = s.substring(je, R), g === re) g = (Te = Te.replace(r, "").trim()).charCodeAt(0);

            switch (g) {
              case L:
                if (we > 0) Te = Te.replace(c, "");

                switch (A = Te.charCodeAt(1)) {
                  case ue:
                  case ie:
                  case fe:
                  case Q:
                    f = a;
                    break;

                  default:
                    f = xe;
                }

                if (je = (Ue = He(a, f, Ue, A, i + 1)).length, me > 0 && 0 === je) je = Te.length;
                if (ye > 0) if (f = Ie(xe, Te, Oe), n = Pe(We, Ue, f, a, pe, be, je, A, i, t), Te = f.join(""), void 0 !== n) if (0 === (je = (Ue = n.trim()).length)) A = 0, Ue = "";
                if (je > 0) switch (A) {
                  case fe:
                    Te = Te.replace(x, Me);

                  case ue:
                  case ie:
                  case Q:
                    Ue = Te + "{" + Ue + "}";
                    break;

                  case te:
                    if (Ue = (Te = Te.replace(b, "$1 $2" + (Be > 0 ? De : ""))) + "{" + Ue + "}", 1 === Ae || 2 === Ae && Le("@" + Ue, 3)) Ue = "@" + N + Ue + "@" + Ue;else Ue = "@" + Ue;
                    break;

                  default:
                    if (Ue = Te + Ue, t === de) Ve += Ue, Ue = "";
                } else Ue = "";
                break;

              default:
                Ue = He(a, Ie(a, Te, Oe), Ue, t, i + 1);
            }

            Xe += Ue, O = 0, $e = 0, z = 0, we = 0, Oe = 0, j = 0, Te = "", Ue = "", C = s.charCodeAt(++R);
            break;

          case q:
          case W:
            if ((je = (Te = (we > 0 ? Te.replace(c, "") : Te).trim()).length) > 1) {
              if (0 === z) if ((g = Te.charCodeAt(0)) === Q || g > 96 && g < 123) je = (Te = Te.replace(" ", ":")).length;
              if (ye > 0) if (void 0 !== (n = Pe(Se, Te, a, e, pe, be, Ve.length, t, i, t))) if (0 === (je = (Te = n.trim()).length)) Te = "\0\0";

              switch (g = Te.charCodeAt(0), A = Te.charCodeAt(1), g) {
                case re:
                  break;

                case L:
                  if (A === oe || A === he) {
                    Ye += Te + s.charAt(R);
                    break;
                  }

                default:
                  if (Te.charCodeAt(je - 1) === V) break;
                  Ve += Ke(Te, g, A, Te.charCodeAt(2));
              }
            }

            O = 0, $e = 0, z = 0, we = 0, Oe = 0, Te = "", C = s.charCodeAt(++R);
        }
      }

      switch (C) {
        case J:
        case I:
          if (h + d + u + o + ve === 0) switch ($) {
            case E:
            case X:
            case Y:
            case L:
            case ae:
            case _:
            case T:
            case ee:
            case Z:
            case Q:
            case V:
            case U:
            case W:
            case B:
            case q:
              break;

            default:
              if (z > 0) $e = 1;
          }
          if (h === Z) h = 0;else if (ge + O === 0 && t !== te && Te.length > 0) we = 1, Te += "\0";
          if (ye * qe > 0) Pe(Ne, Te, a, e, pe, be, Ve.length, t, i, t);
          be = 1, pe++;
          break;

        case W:
        case q:
          if (h + d + u + o === 0) {
            be++;
            break;
          }

        default:
          switch (be++, Re = s.charAt(R), C) {
            case K:
            case M:
              if (d + o + h === 0) switch (w) {
                case U:
                case V:
                case K:
                case M:
                  Re = "";
                  break;

                default:
                  if (C !== M) Re = " ";
              }
              break;

            case re:
              Re = "\\0";
              break;

            case ce:
              Re = "\\f";
              break;

            case se:
              Re = "\\v";
              break;

            case P:
              if (d + h + o === 0 && ge > 0) Oe = 1, we = 1, Re = "\f" + Re;
              break;

            case 108:
              if (d + h + o + ke === 0 && z > 0) switch (R - z) {
                case 2:
                  if (w === ne && s.charCodeAt(R - 3) === V) ke = w;

                case 8:
                  if (m === le) ke = m;
              }
              break;

            case V:
              if (d + h + o === 0) z = R;
              break;

            case U:
              if (h + u + d + o === 0) we = 1, Re += "\r";
              break;

            case Y:
            case X:
              if (0 === h) d = d === C ? 0 : 0 === d ? C : d;
              break;

            case G:
              if (d + h + u === 0) o++;
              break;

            case H:
              if (d + h + u === 0) o--;
              break;

            case E:
              if (d + h + o === 0) u--;
              break;

            case D:
              if (d + h + o === 0) {
                if (0 === O) switch (2 * w + 3 * m) {
                  case 533:
                    break;

                  default:
                    y = 0, O = 1;
                }
                u++;
              }

              break;

            case L:
              if (h + u + d + o + z + j === 0) j = 1;
              break;

            case T:
            case Z:
              if (d + o + u > 0) break;

              switch (h) {
                case 0:
                  switch (2 * C + 3 * s.charCodeAt(R + 1)) {
                    case 235:
                      h = Z;
                      break;

                    case 220:
                      je = R, h = T;
                  }

                  break;

                case T:
                  if (C === Z && w === T && je + 2 !== R) {
                    if (33 === s.charCodeAt(je + 2)) Ve += s.substring(je, R + 1);
                    Re = "", h = 0;
                  }

              }

          }

          if (0 === h) {
            if (ge + d + o + j === 0 && t !== te && C !== W) switch (C) {
              case U:
              case ae:
              case _:
              case ee:
              case E:
              case D:
                if (0 === O) {
                  switch (w) {
                    case K:
                    case M:
                    case I:
                    case J:
                      Re += "\0";
                      break;

                    default:
                      Re = "\0" + Re + (C === U ? "" : "\0");
                  }

                  we = 1;
                } else switch (C) {
                  case D:
                    if (z + 7 === R && 108 === w) z = 0;
                    O = ++y;
                    break;

                  case E:
                    if (0 == (O = --y)) we = 1, Re += "\0";
                }

                break;

              case K:
              case M:
                switch (w) {
                  case re:
                  case B:
                  case q:
                  case W:
                  case U:
                  case ce:
                  case K:
                  case M:
                  case I:
                  case J:
                    break;

                  default:
                    if (0 === O) we = 1, Re += "\0";
                }

            }
            if (Te += Re, C !== M && C !== K) $ = C;
          }

      }

      m = w, w = C, R++;
    }

    if (je = Ve.length, me > 0) if (0 === je && 0 === Xe.length && 0 === a[0].length == false) if (t !== ie || 1 === a.length && (ge > 0 ? Ee : Ge) === a[0]) je = a.join(",").length + 2;

    if (je > 0) {
      if (f = 0 === ge && t !== te ? function (e) {
        for (var a, r, s = 0, t = e.length, i = Array(t); s < t; ++s) {
          for (var f = e[s].split(l), n = "", o = 0, h = 0, u = 0, d = 0, b = f.length; o < b; ++o) {
            if (0 === (h = (r = f[o]).length) && b > 1) continue;
            if (u = n.charCodeAt(n.length - 1), d = r.charCodeAt(0), a = "", 0 !== o) switch (u) {
              case T:
              case ae:
              case _:
              case ee:
              case M:
              case D:
                break;

              default:
                a = " ";
            }

            switch (d) {
              case P:
                r = a + Ee;

              case ae:
              case _:
              case ee:
              case M:
              case E:
              case D:
                break;

              case G:
                r = a + r + Ee;
                break;

              case V:
                switch (2 * r.charCodeAt(1) + 3 * r.charCodeAt(2)) {
                  case 530:
                    if (Ce > 0) {
                      r = a + r.substring(8, h - 1);
                      break;
                    }

                  default:
                    if (o < 1 || f[o - 1].length < 1) r = a + Ee + r;
                }

                break;

              case U:
                a = "";

              default:
                if (h > 1 && r.indexOf(":") > 0) r = a + r.replace(v, "$1" + Ee + "$2");else r = a + r + Ee;
            }

            n += r;
          }

          i[s] = n.replace(c, "").trim();
        }

        return i;
      }(a) : a, ye > 0) if (void 0 !== (n = Pe(Fe, Ve, f, e, pe, be, je, t, i, t)) && 0 === (Ve = n).length) return Ye + Ve + Xe;

      if (Ve = f.join(",") + "{" + Ve + "}", Ae * ke != 0) {
        if (2 === Ae && !Le(Ve, 2)) ke = 0;

        switch (ke) {
          case le:
            Ve = Ve.replace(k, ":" + S + "$1") + Ve;
            break;

          case ne:
            Ve = Ve.replace(p, "::" + N + "input-$1") + Ve.replace(p, "::" + S + "$1") + Ve.replace(p, ":" + F + "input-$1") + Ve;
        }

        ke = 0;
      }
    }

    return Ye + Ve + Xe;
  }

  function Ie(e, a, r) {
    var c = a.trim().split(o),
        s = c,
        t = c.length,
        i = e.length;

    switch (i) {
      case 0:
      case 1:
        for (var f = 0, n = 0 === i ? "" : e[0] + " "; f < t; ++f) {
          s[f] = Je(n, s[f], r, i).trim();
        }

        break;

      default:
        f = 0;
        var l = 0;

        for (s = []; f < t; ++f) {
          for (var h = 0; h < i; ++h) {
            s[l++] = Je(e[h] + " ", c[f], r, i).trim();
          }
        }

    }

    return s;
  }

  function Je(e, a, r, c) {
    var s = a,
        t = s.charCodeAt(0);
    if (t < 33) t = (s = s.trim()).charCodeAt(0);

    switch (t) {
      case P:
        switch (ge + c) {
          case 0:
          case 1:
            if (0 === e.trim().length) break;

          default:
            return s.replace(h, "$1" + e.trim());
        }

        break;

      case V:
        switch (s.charCodeAt(1)) {
          case 103:
            if (Ce > 0 && ge > 0) return s.replace(u, "$1").replace(h, "$1" + Ge);
            break;

          default:
            return e.trim() + s.replace(h, "$1" + e.trim());
        }

      default:
        if (r * ge > 0 && s.indexOf("\f") > 0) return s.replace(h, (e.charCodeAt(0) === V ? "" : "$1") + e.trim());
    }

    return e + s;
  }

  function Ke(e, a, r, c) {
    var l,
        o = 0,
        h = e + ";",
        u = 2 * a + 3 * r + 4 * c;
    if (944 === u) return function (e) {
      var a = e.length,
          r = e.indexOf(":", 9) + 1,
          c = e.substring(0, r).trim(),
          s = e.substring(r, a - 1).trim();

      switch (e.charCodeAt(9) * Be) {
        case 0:
          break;

        case Q:
          if (110 !== e.charCodeAt(10)) break;

        default:
          for (var t = s.split((s = "", f)), i = 0, r = 0, a = t.length; i < a; r = 0, ++i) {
            for (var l = t[i], o = l.split(n); l = o[r];) {
              var h = l.charCodeAt(0);
              if (1 === Be && (h > L && h < 90 || h > 96 && h < 123 || h === R || h === Q && l.charCodeAt(1) !== Q)) switch (isNaN(parseFloat(l)) + (-1 !== l.indexOf("("))) {
                case 1:
                  switch (l) {
                    case "infinite":
                    case "alternate":
                    case "backwards":
                    case "running":
                    case "normal":
                    case "forwards":
                    case "both":
                    case "none":
                    case "linear":
                    case "ease":
                    case "ease-in":
                    case "ease-out":
                    case "ease-in-out":
                    case "paused":
                    case "reverse":
                    case "alternate-reverse":
                    case "inherit":
                    case "initial":
                    case "unset":
                    case "step-start":
                    case "step-end":
                      break;

                    default:
                      l += De;
                  }

              }
              o[r++] = l;
            }

            s += (0 === i ? "" : ",") + o.join(" ");
          }

      }

      if (s = c + s + ";", 1 === Ae || 2 === Ae && Le(s, 1)) return N + s + s;
      return s;
    }(h);else if (0 === Ae || 2 === Ae && !Le(h, 1)) return h;

    switch (u) {
      case 1015:
        return 97 === h.charCodeAt(10) ? N + h + h : h;

      case 951:
        return 116 === h.charCodeAt(3) ? N + h + h : h;

      case 963:
        return 110 === h.charCodeAt(5) ? N + h + h : h;

      case 1009:
        if (100 !== h.charCodeAt(4)) break;

      case 969:
      case 942:
        return N + h + h;

      case 978:
        return N + h + S + h + h;

      case 1019:
      case 983:
        return N + h + S + h + F + h + h;

      case 883:
        if (h.charCodeAt(8) === Q) return N + h + h;
        if (h.indexOf("image-set(", 11) > 0) return h.replace(z, "$1" + N + "$2") + h;
        return h;

      case 932:
        if (h.charCodeAt(4) === Q) switch (h.charCodeAt(5)) {
          case 103:
            return N + "box-" + h.replace("-grow", "") + N + h + F + h.replace("grow", "positive") + h;

          case 115:
            return N + h + F + h.replace("shrink", "negative") + h;

          case 98:
            return N + h + F + h.replace("basis", "preferred-size") + h;
        }
        return N + h + F + h + h;

      case 964:
        return N + h + F + "flex-" + h + h;

      case 1023:
        if (99 !== h.charCodeAt(8)) break;
        return l = h.substring(h.indexOf(":", 15)).replace("flex-", "").replace("space-between", "justify"), N + "box-pack" + l + N + h + F + "flex-pack" + l + h;

      case 1005:
        return t.test(h) ? h.replace(s, ":" + N) + h.replace(s, ":" + S) + h : h;

      case 1e3:
        switch (o = (l = h.substring(13).trim()).indexOf("-") + 1, l.charCodeAt(0) + l.charCodeAt(o)) {
          case 226:
            l = h.replace(m, "tb");
            break;

          case 232:
            l = h.replace(m, "tb-rl");
            break;

          case 220:
            l = h.replace(m, "lr");
            break;

          default:
            return h;
        }

        return N + h + F + l + h;

      case 1017:
        if (-1 === h.indexOf("sticky", 9)) return h;

      case 975:
        switch (o = (h = e).length - 10, u = (l = (33 === h.charCodeAt(o) ? h.substring(0, o) : h).substring(e.indexOf(":", 7) + 1).trim()).charCodeAt(0) + (0 | l.charCodeAt(7))) {
          case 203:
            if (l.charCodeAt(8) < 111) break;

          case 115:
            h = h.replace(l, N + l) + ";" + h;
            break;

          case 207:
          case 102:
            h = h.replace(l, N + (u > 102 ? "inline-" : "") + "box") + ";" + h.replace(l, N + l) + ";" + h.replace(l, F + l + "box") + ";" + h;
        }

        return h + ";";

      case 938:
        if (h.charCodeAt(5) === Q) switch (h.charCodeAt(6)) {
          case 105:
            return l = h.replace("-items", ""), N + h + N + "box-" + l + F + "flex-" + l + h;

          case 115:
            return N + h + F + "flex-item-" + h.replace(y, "") + h;

          default:
            return N + h + F + "flex-line-pack" + h.replace("align-content", "").replace(y, "") + h;
        }
        break;

      case 973:
      case 989:
        if (h.charCodeAt(3) !== Q || 122 === h.charCodeAt(4)) break;

      case 931:
      case 953:
        if (true === j.test(e)) if (115 === (l = e.substring(e.indexOf(":") + 1)).charCodeAt(0)) return Ke(e.replace("stretch", "fill-available"), a, r, c).replace(":fill-available", ":stretch");else return h.replace(l, N + l) + h.replace(l, S + l.replace("fill-", "")) + h;
        break;

      case 962:
        if (h = N + h + (102 === h.charCodeAt(5) ? F + h : "") + h, r + c === 211 && 105 === h.charCodeAt(13) && h.indexOf("transform", 10) > 0) return h.substring(0, h.indexOf(";", 27) + 1).replace(i, "$1" + N + "$2") + h;
    }

    return h;
  }

  function Le(e, a) {
    var r = e.indexOf(1 === a ? ":" : "{"),
        c = e.substring(0, 3 !== a ? r : 10),
        s = e.substring(r + 1, e.length - 1);
    return Oe(2 !== a ? c : c.replace(O, "$1"), s, a);
  }

  function Me(e, a) {
    var r = Ke(a, a.charCodeAt(0), a.charCodeAt(1), a.charCodeAt(2));
    return r !== a + ";" ? r.replace($, " or ($1)").substring(4) : "(" + a + ")";
  }

  function Pe(e, a, r, c, s, t, i, f, n, l) {
    for (var o, h = 0, u = a; h < ye; ++h) {
      switch (o = $e[h].call(Te, e, u, r, c, s, t, i, f, n, l)) {
        case void 0:
        case false:
        case true:
        case null:
          break;

        default:
          u = o;
      }
    }

    if (u !== a) return u;
  }

  function Qe(e, a, r, c) {
    for (var s = a + 1; s < r; ++s) {
      switch (c.charCodeAt(s)) {
        case Z:
          if (e === T) if (c.charCodeAt(s - 1) === T && a + 2 !== s) return s + 1;
          break;

        case I:
          if (e === Z) return s + 1;
      }
    }

    return s;
  }

  function Re(e) {
    for (var a in e) {
      var r = e[a];

      switch (a) {
        case "keyframe":
          Be = 0 | r;
          break;

        case "global":
          Ce = 0 | r;
          break;

        case "cascade":
          ge = 0 | r;
          break;

        case "compress":
          we = 0 | r;
          break;

        case "semicolon":
          ve = 0 | r;
          break;

        case "preserve":
          me = 0 | r;
          break;

        case "prefix":
          if (Oe = null, !r) Ae = 0;else if ("function" != typeof r) Ae = 1;else Ae = 2, Oe = r;
      }
    }

    return Re;
  }

  function Te(a, r) {
    if (void 0 !== this && this.constructor === Te) return e(a);
    var s = a,
        t = s.charCodeAt(0);
    if (t < 33) t = (s = s.trim()).charCodeAt(0);
    if (Be > 0) De = s.replace(d, t === G ? "" : "-");
    if (t = 1, 1 === ge) Ge = s;else Ee = s;
    var i,
        f = [Ge];
    if (ye > 0) if (void 0 !== (i = Pe(ze, r, f, f, pe, be, 0, 0, 0, 0)) && "string" == typeof i) r = i;
    var n = He(xe, f, r, 0, 0);
    if (ye > 0) if (void 0 !== (i = Pe(je, n, f, f, pe, be, n.length, 0, 0, 0)) && "string" != typeof (n = i)) t = 0;
    return De = "", Ge = "", Ee = "", ke = 0, pe = 1, be = 1, we * t == 0 ? n : n.replace(c, "").replace(g, "").replace(A, "$1").replace(C, "$1").replace(w, " ");
  }

  if (Te.use = function e(a) {
    switch (a) {
      case void 0:
      case null:
        ye = $e.length = 0;
        break;

      default:
        if ("function" == typeof a) $e[ye++] = a;else if ("object" == typeof a) for (var r = 0, c = a.length; r < c; ++r) {
          e(a[r]);
        } else qe = 0 | !!a;
    }

    return e;
  }, Te.set = Re, void 0 !== a) Re(a);
  return Te;
});

/***/ }),

/***/ "bmMU":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isArray = Array.isArray;
var keyList = Object.keys;
var hasProp = Object.prototype.hasOwnProperty;
var hasElementType = typeof Element !== 'undefined';

function equal(a, b) {
  // fast-deep-equal index.js 2.0.1
  if (a === b) return true;

  if (a && b && typeof a == 'object' && typeof b == 'object') {
    var arrA = isArray(a),
        arrB = isArray(b),
        i,
        length,
        key;

    if (arrA && arrB) {
      length = a.length;
      if (length != b.length) return false;

      for (i = length; i-- !== 0;) {
        if (!equal(a[i], b[i])) return false;
      }

      return true;
    }

    if (arrA != arrB) return false;
    var dateA = a instanceof Date,
        dateB = b instanceof Date;
    if (dateA != dateB) return false;
    if (dateA && dateB) return a.getTime() == b.getTime();
    var regexpA = a instanceof RegExp,
        regexpB = b instanceof RegExp;
    if (regexpA != regexpB) return false;
    if (regexpA && regexpB) return a.toString() == b.toString();
    var keys = keyList(a);
    length = keys.length;
    if (length !== keyList(b).length) return false;

    for (i = length; i-- !== 0;) {
      if (!hasProp.call(b, keys[i])) return false;
    } // end fast-deep-equal
    // start react-fast-compare
    // custom handling for DOM elements


    if (hasElementType && a instanceof Element && b instanceof Element) return a === b; // custom handling for React

    for (i = length; i-- !== 0;) {
      key = keys[i];

      if (key === '_owner' && a.$$typeof) {
        // React-specific: avoid traversing React elements' _owner.
        //  _owner contains circular references
        // and is not needed when comparing the actual elements (and not their owners)
        // .$$typeof and ._store on just reasonable markers of a react element
        continue;
      } else {
        // all other properties should be traversed as usual
        if (!equal(a[key], b[key])) return false;
      }
    } // end react-fast-compare
    // fast-deep-equal index.js 2.0.1


    return true;
  }

  return a !== a && b !== b;
} // end fast-deep-equal


module.exports = function exportedEqual(a, b) {
  try {
    return equal(a, b);
  } catch (error) {
    if (error.message && error.message.match(/stack|recursion/i) || error.number === -2146828260) {
      // warn on circular references, don't crash
      // browsers give this different errors name and messages:
      // chrome/safari: "RangeError", "Maximum call stack size exceeded"
      // firefox: "InternalError", too much recursion"
      // edge: "Error", "Out of stack space"
      console.warn('Warning: react-fast-compare does not handle circular references.', error.name, error.message);
      return false;
    } // some other error. we should definitely know about these


    throw error;
  }
};

/***/ }),

/***/ "hFT/":
/***/ (function(module, exports) {

exports.__esModule = true;
var ATTRIBUTE_NAMES = exports.ATTRIBUTE_NAMES = {
  BODY: "bodyAttributes",
  HTML: "htmlAttributes",
  TITLE: "titleAttributes"
};
var TAG_NAMES = exports.TAG_NAMES = {
  BASE: "base",
  BODY: "body",
  HEAD: "head",
  HTML: "html",
  LINK: "link",
  META: "meta",
  NOSCRIPT: "noscript",
  SCRIPT: "script",
  STYLE: "style",
  TITLE: "title"
};
var VALID_TAG_NAMES = exports.VALID_TAG_NAMES = Object.keys(TAG_NAMES).map(function (name) {
  return TAG_NAMES[name];
});
var TAG_PROPERTIES = exports.TAG_PROPERTIES = {
  CHARSET: "charset",
  CSS_TEXT: "cssText",
  HREF: "href",
  HTTPEQUIV: "http-equiv",
  INNER_HTML: "innerHTML",
  ITEM_PROP: "itemprop",
  NAME: "name",
  PROPERTY: "property",
  REL: "rel",
  SRC: "src"
};
var REACT_TAG_MAP = exports.REACT_TAG_MAP = {
  accesskey: "accessKey",
  charset: "charSet",
  class: "className",
  contenteditable: "contentEditable",
  contextmenu: "contextMenu",
  "http-equiv": "httpEquiv",
  itemprop: "itemProp",
  tabindex: "tabIndex"
};
var HELMET_PROPS = exports.HELMET_PROPS = {
  DEFAULT_TITLE: "defaultTitle",
  DEFER: "defer",
  ENCODE_SPECIAL_CHARACTERS: "encodeSpecialCharacters",
  ON_CHANGE_CLIENT_STATE: "onChangeClientState",
  TITLE_TEMPLATE: "titleTemplate"
};
var HTML_TAG_MAP = exports.HTML_TAG_MAP = Object.keys(REACT_TAG_MAP).reduce(function (obj, key) {
  obj[REACT_TAG_MAP[key]] = key;
  return obj;
}, {});
var SELF_CLOSING_TAGS = exports.SELF_CLOSING_TAGS = [TAG_NAMES.NOSCRIPT, TAG_NAMES.SCRIPT, TAG_NAMES.STYLE];
var HELMET_ATTRIBUTE = exports.HELMET_ATTRIBUTE = "data-react-helmet";

/***/ }),

/***/ "qT12":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


var b = "function" === typeof Symbol && Symbol.for,
    c = b ? Symbol.for("react.element") : 60103,
    d = b ? Symbol.for("react.portal") : 60106,
    e = b ? Symbol.for("react.fragment") : 60107,
    f = b ? Symbol.for("react.strict_mode") : 60108,
    g = b ? Symbol.for("react.profiler") : 60114,
    h = b ? Symbol.for("react.provider") : 60109,
    k = b ? Symbol.for("react.context") : 60110,
    l = b ? Symbol.for("react.async_mode") : 60111,
    m = b ? Symbol.for("react.concurrent_mode") : 60111,
    n = b ? Symbol.for("react.forward_ref") : 60112,
    p = b ? Symbol.for("react.suspense") : 60113,
    q = b ? Symbol.for("react.suspense_list") : 60120,
    r = b ? Symbol.for("react.memo") : 60115,
    t = b ? Symbol.for("react.lazy") : 60116,
    v = b ? Symbol.for("react.block") : 60121,
    w = b ? Symbol.for("react.fundamental") : 60117,
    x = b ? Symbol.for("react.responder") : 60118,
    y = b ? Symbol.for("react.scope") : 60119;

function z(a) {
  if ("object" === typeof a && null !== a) {
    var u = a.$$typeof;

    switch (u) {
      case c:
        switch (a = a.type, a) {
          case l:
          case m:
          case e:
          case g:
          case f:
          case p:
            return a;

          default:
            switch (a = a && a.$$typeof, a) {
              case k:
              case n:
              case t:
              case r:
              case h:
                return a;

              default:
                return u;
            }

        }

      case d:
        return u;
    }
  }
}

function A(a) {
  return z(a) === m;
}

exports.AsyncMode = l;
exports.ConcurrentMode = m;
exports.ContextConsumer = k;
exports.ContextProvider = h;
exports.Element = c;
exports.ForwardRef = n;
exports.Fragment = e;
exports.Lazy = t;
exports.Memo = r;
exports.Portal = d;
exports.Profiler = g;
exports.StrictMode = f;
exports.Suspense = p;

exports.isAsyncMode = function (a) {
  return A(a) || z(a) === l;
};

exports.isConcurrentMode = A;

exports.isContextConsumer = function (a) {
  return z(a) === k;
};

exports.isContextProvider = function (a) {
  return z(a) === h;
};

exports.isElement = function (a) {
  return "object" === typeof a && null !== a && a.$$typeof === c;
};

exports.isForwardRef = function (a) {
  return z(a) === n;
};

exports.isFragment = function (a) {
  return z(a) === e;
};

exports.isLazy = function (a) {
  return z(a) === t;
};

exports.isMemo = function (a) {
  return z(a) === r;
};

exports.isPortal = function (a) {
  return z(a) === d;
};

exports.isProfiler = function (a) {
  return z(a) === g;
};

exports.isStrictMode = function (a) {
  return z(a) === f;
};

exports.isSuspense = function (a) {
  return z(a) === p;
};

exports.isValidElementType = function (a) {
  return "string" === typeof a || "function" === typeof a || a === e || a === m || a === g || a === f || a === p || a === q || "object" === typeof a && null !== a && (a.$$typeof === t || a.$$typeof === r || a.$$typeof === h || a.$$typeof === k || a.$$typeof === n || a.$$typeof === w || a.$$typeof === x || a.$$typeof === y || a.$$typeof === v);
};

exports.typeOf = z;

/***/ }),

/***/ "tioU":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* reexport */ common_Layout_Layout; });

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__("q1tI");
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/styled-components/dist/styled-components.browser.esm.js
var styled_components_browser_esm = __webpack_require__("vOnD");

// EXTERNAL MODULE: ./node_modules/react-helmet/lib/Helmet.js
var Helmet = __webpack_require__("TJpk");
var Helmet_default = /*#__PURE__*/__webpack_require__.n(Helmet);

// CONCATENATED MODULE: ./src/components/common/SEO.js
var SEO_DATA={description:'Fuzzy.one, a solutions library.',title:'Fuzzy.One',url:'',author:'gg',keywords:['gatsby','site','fuzzy.one'],img:'',twitterId:'',facebookId:''};var SEO_SEO=function SEO(){return/*#__PURE__*/react_default.a.createElement(Helmet_default.a,null,/*#__PURE__*/react_default.a.createElement("meta",{property:"fb:app_id",content:SEO_DATA.facebookId}),/*#__PURE__*/react_default.a.createElement("meta",{property:"og:title",content:SEO_DATA.title}),/*#__PURE__*/react_default.a.createElement("meta",{property:"og:type",content:"website"}),/*#__PURE__*/react_default.a.createElement("meta",{property:"og:url",content:SEO_DATA.url}),/*#__PURE__*/react_default.a.createElement("meta",{property:"og:image",content:SEO_DATA.img}),/*#__PURE__*/react_default.a.createElement("meta",{property:"og:description",content:SEO_DATA.description}),/*#__PURE__*/react_default.a.createElement("meta",{name:"twitter:card",content:"summary_large_image"}),/*#__PURE__*/react_default.a.createElement("meta",{name:"twitter:creator",content:SEO_DATA.twitterId}),/*#__PURE__*/react_default.a.createElement("meta",{name:"twitter:site",content:SEO_DATA.url}),/*#__PURE__*/react_default.a.createElement("meta",{name:"twitter:title",content:SEO_DATA.title}),/*#__PURE__*/react_default.a.createElement("meta",{name:"twitter:description",content:SEO_DATA.description}),/*#__PURE__*/react_default.a.createElement("meta",{name:"twitter:domain",content:SEO_DATA.url}),/*#__PURE__*/react_default.a.createElement("meta",{name:"twitter:image:src",content:SEO_DATA.img}),/*#__PURE__*/react_default.a.createElement("meta",{name:"description",content:SEO_DATA.description}),/*#__PURE__*/react_default.a.createElement("meta",{name:"keywords",content:SEO_DATA.keywords.join(', ')}),/*#__PURE__*/react_default.a.createElement("meta",{name:"author",content:SEO_DATA.author}),/*#__PURE__*/react_default.a.createElement("title",null,SEO_DATA.title),/*#__PURE__*/react_default.a.createElement("html",{lang:"en"}));};/* harmony default export */ var common_SEO = (SEO_SEO);
// CONCATENATED MODULE: ./src/styles/theme.js
var theme={font:{primary:"'Montserrat', sans-serif;",secondary:"'Montserrat', sans-serif;"},font_size:{smaller:'font-size: 15px; line-height: 24px',small:'font-size: 20px; line-height: 30px',regular:'font-size: 24px; line-height: 32px',large:'font-size: 30px; line-height: 40px',larger:'font-size: 36px; line-height: 48px',xlarge:'font-size: 48px; line-height: 56px'},color:{white:{regular:'#FFFFFF',dark:'#F6F6F6'},black:{lighter:'#ABA8AF',light:'#564F62',regular:'#211E26',pitch:"#141414"},primary:'#4AA63D',light:"#55C645"},screen:{xs:'575px',sm:'767px',md:'991px',lg:'1199px'}};/* harmony default export */ var styles_theme = (theme);
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteralLoose.js
function _taggedTemplateLiteralLoose(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  strings.raw = raw;
  return strings;
}
// CONCATENATED MODULE: ./src/styles/GlobalStyles.js
var _templateObject;var normalize="\n  /*! modern-normalize | MIT License | https://github.com/sindresorhus/  modern-normalize */html{box-sizing:border-box}*,::after,::before{box-sizing:inherit}  :root{-moz-tab-size:4;tab-size:4}html{line-height:1.15;-webkit-text-size-adjust:100%}  body{margin:0}body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,  'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol'}hr{height:0}abbr[title]{text-decoration:underline dotted}b,  strong{font-weight:bolder}code,kbd,pre,samp{font-family:SFMono-Regular,Consolas,'Liberation Mono',Menlo,Courier,monospace;  font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}  button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,select{text-transform:none}[type=button],  [type=reset],[type=submit],button{-webkit-appearance:button}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,  button::-moz-focus-inner{border-style:none;padding:0}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,  button:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:.35em .75em .625em}legend{padding:0}progress{vertical-align:baseline}  [type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}  [type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}\n";var GlobalStyles=Object(styled_components_browser_esm["b" /* createGlobalStyle */])(_templateObject||(_templateObject=_taggedTemplateLiteralLoose(["\n  ",";\n\n  body {\n    font-family: ",";\n  }\n\n  h1, h2, h3, p {\n    margin: 0;\n    font-weight: normal;\n  }\n\n  h1, h2 {\n    font-family: ",";\n  }\n\n  h1 {\n    ",";\n  }\n\n  h2 {\n    ",";\n  }\n\n  h3 {\n    ",";\n  }\n\n  p {\n    ",";\n    color: ",";\n  }\n\n  @media (max-width: ",") {\n    h1 {\n      ",";\n    }\n\n    h2 {\n      ",";\n    }\n\n    h3 {\n      ",";\n    }\n\n    p {\n      ",";\n    }\n  }\n\n  button {\n    border: none;\n    background: none;\n    outline: none;\n    padding: 0;\n    cursor: pointer;\n  }\n\n  a {\n    cursor: pointer;\n  }\n"])),normalize,function(props){return props.theme.font.secondary;},function(props){return props.theme.font.primary;},function(props){return props.theme.font_size.xlarge;},function(props){return props.theme.font_size.larger;},function(props){return props.theme.font_size.large;},function(props){return props.theme.font_size.regular;},function(props){return props.theme.color.black.light;},function(props){return props.theme.screen.sm;},function(props){return props.theme.font_size.larger;},function(props){return props.theme.font_size.large;},function(props){return props.theme.font_size.regular;},function(props){return props.theme.font_size.small;});/* harmony default export */ var styles_GlobalStyles = (GlobalStyles);
// CONCATENATED MODULE: ./src/components/common/Layout/Layout.js
var Layout_Layout=function Layout(_ref){var children=_ref.children;return/*#__PURE__*/react_default.a.createElement(styled_components_browser_esm["a" /* ThemeProvider */],{theme:styles_theme},/*#__PURE__*/react_default.a.createElement(react_default.a.Fragment,null,/*#__PURE__*/react_default.a.createElement(common_SEO,null),/*#__PURE__*/react_default.a.createElement(styles_GlobalStyles,null),children));};/* harmony default export */ var common_Layout_Layout = (Layout_Layout);
// CONCATENATED MODULE: ./src/components/common/Layout/index.js


/***/ }),

/***/ "v1p5":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {exports.__esModule = true;
exports.warn = exports.requestAnimationFrame = exports.reducePropsToState = exports.mapStateOnServer = exports.handleClientStateChange = exports.convertReactPropstoHtmlAttributes = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var _react = __webpack_require__("q1tI");

var _react2 = _interopRequireDefault(_react);

var _objectAssign = __webpack_require__("YVoz");

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _HelmetConstants = __webpack_require__("hFT/");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

var encodeSpecialCharacters = function encodeSpecialCharacters(str) {
  var encode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  if (encode === false) {
    return String(str);
  }

  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
};

var getTitleFromPropsList = function getTitleFromPropsList(propsList) {
  var innermostTitle = getInnermostProperty(propsList, _HelmetConstants.TAG_NAMES.TITLE);
  var innermostTemplate = getInnermostProperty(propsList, _HelmetConstants.HELMET_PROPS.TITLE_TEMPLATE);

  if (innermostTemplate && innermostTitle) {
    // use function arg to avoid need to escape $ characters
    return innermostTemplate.replace(/%s/g, function () {
      return innermostTitle;
    });
  }

  var innermostDefaultTitle = getInnermostProperty(propsList, _HelmetConstants.HELMET_PROPS.DEFAULT_TITLE);
  return innermostTitle || innermostDefaultTitle || undefined;
};

var getOnChangeClientState = function getOnChangeClientState(propsList) {
  return getInnermostProperty(propsList, _HelmetConstants.HELMET_PROPS.ON_CHANGE_CLIENT_STATE) || function () {};
};

var getAttributesFromPropsList = function getAttributesFromPropsList(tagType, propsList) {
  return propsList.filter(function (props) {
    return typeof props[tagType] !== "undefined";
  }).map(function (props) {
    return props[tagType];
  }).reduce(function (tagAttrs, current) {
    return _extends({}, tagAttrs, current);
  }, {});
};

var getBaseTagFromPropsList = function getBaseTagFromPropsList(primaryAttributes, propsList) {
  return propsList.filter(function (props) {
    return typeof props[_HelmetConstants.TAG_NAMES.BASE] !== "undefined";
  }).map(function (props) {
    return props[_HelmetConstants.TAG_NAMES.BASE];
  }).reverse().reduce(function (innermostBaseTag, tag) {
    if (!innermostBaseTag.length) {
      var keys = Object.keys(tag);

      for (var i = 0; i < keys.length; i++) {
        var attributeKey = keys[i];
        var lowerCaseAttributeKey = attributeKey.toLowerCase();

        if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && tag[lowerCaseAttributeKey]) {
          return innermostBaseTag.concat(tag);
        }
      }
    }

    return innermostBaseTag;
  }, []);
};

var getTagsFromPropsList = function getTagsFromPropsList(tagName, primaryAttributes, propsList) {
  // Calculate list of tags, giving priority innermost component (end of the propslist)
  var approvedSeenTags = {};
  return propsList.filter(function (props) {
    if (Array.isArray(props[tagName])) {
      return true;
    }

    if (typeof props[tagName] !== "undefined") {
      warn("Helmet: " + tagName + " should be of type \"Array\". Instead found type \"" + _typeof(props[tagName]) + "\"");
    }

    return false;
  }).map(function (props) {
    return props[tagName];
  }).reverse().reduce(function (approvedTags, instanceTags) {
    var instanceSeenTags = {};
    instanceTags.filter(function (tag) {
      var primaryAttributeKey = void 0;
      var keys = Object.keys(tag);

      for (var i = 0; i < keys.length; i++) {
        var attributeKey = keys[i];
        var lowerCaseAttributeKey = attributeKey.toLowerCase(); // Special rule with link tags, since rel and href are both primary tags, rel takes priority

        if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && !(primaryAttributeKey === _HelmetConstants.TAG_PROPERTIES.REL && tag[primaryAttributeKey].toLowerCase() === "canonical") && !(lowerCaseAttributeKey === _HelmetConstants.TAG_PROPERTIES.REL && tag[lowerCaseAttributeKey].toLowerCase() === "stylesheet")) {
          primaryAttributeKey = lowerCaseAttributeKey;
        } // Special case for innerHTML which doesn't work lowercased


        if (primaryAttributes.indexOf(attributeKey) !== -1 && (attributeKey === _HelmetConstants.TAG_PROPERTIES.INNER_HTML || attributeKey === _HelmetConstants.TAG_PROPERTIES.CSS_TEXT || attributeKey === _HelmetConstants.TAG_PROPERTIES.ITEM_PROP)) {
          primaryAttributeKey = attributeKey;
        }
      }

      if (!primaryAttributeKey || !tag[primaryAttributeKey]) {
        return false;
      }

      var value = tag[primaryAttributeKey].toLowerCase();

      if (!approvedSeenTags[primaryAttributeKey]) {
        approvedSeenTags[primaryAttributeKey] = {};
      }

      if (!instanceSeenTags[primaryAttributeKey]) {
        instanceSeenTags[primaryAttributeKey] = {};
      }

      if (!approvedSeenTags[primaryAttributeKey][value]) {
        instanceSeenTags[primaryAttributeKey][value] = true;
        return true;
      }

      return false;
    }).reverse().forEach(function (tag) {
      return approvedTags.push(tag);
    }); // Update seen tags with tags from this instance

    var keys = Object.keys(instanceSeenTags);

    for (var i = 0; i < keys.length; i++) {
      var attributeKey = keys[i];
      var tagUnion = (0, _objectAssign2.default)({}, approvedSeenTags[attributeKey], instanceSeenTags[attributeKey]);
      approvedSeenTags[attributeKey] = tagUnion;
    }

    return approvedTags;
  }, []).reverse();
};

var getInnermostProperty = function getInnermostProperty(propsList, property) {
  for (var i = propsList.length - 1; i >= 0; i--) {
    var props = propsList[i];

    if (props.hasOwnProperty(property)) {
      return props[property];
    }
  }

  return null;
};

var reducePropsToState = function reducePropsToState(propsList) {
  return {
    baseTag: getBaseTagFromPropsList([_HelmetConstants.TAG_PROPERTIES.HREF], propsList),
    bodyAttributes: getAttributesFromPropsList(_HelmetConstants.ATTRIBUTE_NAMES.BODY, propsList),
    defer: getInnermostProperty(propsList, _HelmetConstants.HELMET_PROPS.DEFER),
    encode: getInnermostProperty(propsList, _HelmetConstants.HELMET_PROPS.ENCODE_SPECIAL_CHARACTERS),
    htmlAttributes: getAttributesFromPropsList(_HelmetConstants.ATTRIBUTE_NAMES.HTML, propsList),
    linkTags: getTagsFromPropsList(_HelmetConstants.TAG_NAMES.LINK, [_HelmetConstants.TAG_PROPERTIES.REL, _HelmetConstants.TAG_PROPERTIES.HREF], propsList),
    metaTags: getTagsFromPropsList(_HelmetConstants.TAG_NAMES.META, [_HelmetConstants.TAG_PROPERTIES.NAME, _HelmetConstants.TAG_PROPERTIES.CHARSET, _HelmetConstants.TAG_PROPERTIES.HTTPEQUIV, _HelmetConstants.TAG_PROPERTIES.PROPERTY, _HelmetConstants.TAG_PROPERTIES.ITEM_PROP], propsList),
    noscriptTags: getTagsFromPropsList(_HelmetConstants.TAG_NAMES.NOSCRIPT, [_HelmetConstants.TAG_PROPERTIES.INNER_HTML], propsList),
    onChangeClientState: getOnChangeClientState(propsList),
    scriptTags: getTagsFromPropsList(_HelmetConstants.TAG_NAMES.SCRIPT, [_HelmetConstants.TAG_PROPERTIES.SRC, _HelmetConstants.TAG_PROPERTIES.INNER_HTML], propsList),
    styleTags: getTagsFromPropsList(_HelmetConstants.TAG_NAMES.STYLE, [_HelmetConstants.TAG_PROPERTIES.CSS_TEXT], propsList),
    title: getTitleFromPropsList(propsList),
    titleAttributes: getAttributesFromPropsList(_HelmetConstants.ATTRIBUTE_NAMES.TITLE, propsList)
  };
};

var rafPolyfill = function () {
  var clock = Date.now();
  return function (callback) {
    var currentTime = Date.now();

    if (currentTime - clock > 16) {
      clock = currentTime;
      callback(currentTime);
    } else {
      setTimeout(function () {
        rafPolyfill(callback);
      }, 0);
    }
  };
}();

var cafPolyfill = function cafPolyfill(id) {
  return clearTimeout(id);
};

var requestAnimationFrame = typeof window !== "undefined" ? window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || rafPolyfill : global.requestAnimationFrame || rafPolyfill;
var cancelAnimationFrame = typeof window !== "undefined" ? window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || cafPolyfill : global.cancelAnimationFrame || cafPolyfill;

var warn = function warn(msg) {
  return console && typeof console.warn === "function" && console.warn(msg);
};

var _helmetCallback = null;

var handleClientStateChange = function handleClientStateChange(newState) {
  if (_helmetCallback) {
    cancelAnimationFrame(_helmetCallback);
  }

  if (newState.defer) {
    _helmetCallback = requestAnimationFrame(function () {
      commitTagChanges(newState, function () {
        _helmetCallback = null;
      });
    });
  } else {
    commitTagChanges(newState);
    _helmetCallback = null;
  }
};

var commitTagChanges = function commitTagChanges(newState, cb) {
  var baseTag = newState.baseTag,
      bodyAttributes = newState.bodyAttributes,
      htmlAttributes = newState.htmlAttributes,
      linkTags = newState.linkTags,
      metaTags = newState.metaTags,
      noscriptTags = newState.noscriptTags,
      onChangeClientState = newState.onChangeClientState,
      scriptTags = newState.scriptTags,
      styleTags = newState.styleTags,
      title = newState.title,
      titleAttributes = newState.titleAttributes;
  updateAttributes(_HelmetConstants.TAG_NAMES.BODY, bodyAttributes);
  updateAttributes(_HelmetConstants.TAG_NAMES.HTML, htmlAttributes);
  updateTitle(title, titleAttributes);
  var tagUpdates = {
    baseTag: updateTags(_HelmetConstants.TAG_NAMES.BASE, baseTag),
    linkTags: updateTags(_HelmetConstants.TAG_NAMES.LINK, linkTags),
    metaTags: updateTags(_HelmetConstants.TAG_NAMES.META, metaTags),
    noscriptTags: updateTags(_HelmetConstants.TAG_NAMES.NOSCRIPT, noscriptTags),
    scriptTags: updateTags(_HelmetConstants.TAG_NAMES.SCRIPT, scriptTags),
    styleTags: updateTags(_HelmetConstants.TAG_NAMES.STYLE, styleTags)
  };
  var addedTags = {};
  var removedTags = {};
  Object.keys(tagUpdates).forEach(function (tagType) {
    var _tagUpdates$tagType = tagUpdates[tagType],
        newTags = _tagUpdates$tagType.newTags,
        oldTags = _tagUpdates$tagType.oldTags;

    if (newTags.length) {
      addedTags[tagType] = newTags;
    }

    if (oldTags.length) {
      removedTags[tagType] = tagUpdates[tagType].oldTags;
    }
  });
  cb && cb();
  onChangeClientState(newState, addedTags, removedTags);
};

var flattenArray = function flattenArray(possibleArray) {
  return Array.isArray(possibleArray) ? possibleArray.join("") : possibleArray;
};

var updateTitle = function updateTitle(title, attributes) {
  if (typeof title !== "undefined" && document.title !== title) {
    document.title = flattenArray(title);
  }

  updateAttributes(_HelmetConstants.TAG_NAMES.TITLE, attributes);
};

var updateAttributes = function updateAttributes(tagName, attributes) {
  var elementTag = document.getElementsByTagName(tagName)[0];

  if (!elementTag) {
    return;
  }

  var helmetAttributeString = elementTag.getAttribute(_HelmetConstants.HELMET_ATTRIBUTE);
  var helmetAttributes = helmetAttributeString ? helmetAttributeString.split(",") : [];
  var attributesToRemove = [].concat(helmetAttributes);
  var attributeKeys = Object.keys(attributes);

  for (var i = 0; i < attributeKeys.length; i++) {
    var attribute = attributeKeys[i];
    var value = attributes[attribute] || "";

    if (elementTag.getAttribute(attribute) !== value) {
      elementTag.setAttribute(attribute, value);
    }

    if (helmetAttributes.indexOf(attribute) === -1) {
      helmetAttributes.push(attribute);
    }

    var indexToSave = attributesToRemove.indexOf(attribute);

    if (indexToSave !== -1) {
      attributesToRemove.splice(indexToSave, 1);
    }
  }

  for (var _i = attributesToRemove.length - 1; _i >= 0; _i--) {
    elementTag.removeAttribute(attributesToRemove[_i]);
  }

  if (helmetAttributes.length === attributesToRemove.length) {
    elementTag.removeAttribute(_HelmetConstants.HELMET_ATTRIBUTE);
  } else if (elementTag.getAttribute(_HelmetConstants.HELMET_ATTRIBUTE) !== attributeKeys.join(",")) {
    elementTag.setAttribute(_HelmetConstants.HELMET_ATTRIBUTE, attributeKeys.join(","));
  }
};

var updateTags = function updateTags(type, tags) {
  var headElement = document.head || document.querySelector(_HelmetConstants.TAG_NAMES.HEAD);
  var tagNodes = headElement.querySelectorAll(type + "[" + _HelmetConstants.HELMET_ATTRIBUTE + "]");
  var oldTags = Array.prototype.slice.call(tagNodes);
  var newTags = [];
  var indexToDelete = void 0;

  if (tags && tags.length) {
    tags.forEach(function (tag) {
      var newElement = document.createElement(type);

      for (var attribute in tag) {
        if (tag.hasOwnProperty(attribute)) {
          if (attribute === _HelmetConstants.TAG_PROPERTIES.INNER_HTML) {
            newElement.innerHTML = tag.innerHTML;
          } else if (attribute === _HelmetConstants.TAG_PROPERTIES.CSS_TEXT) {
            if (newElement.styleSheet) {
              newElement.styleSheet.cssText = tag.cssText;
            } else {
              newElement.appendChild(document.createTextNode(tag.cssText));
            }
          } else {
            var value = typeof tag[attribute] === "undefined" ? "" : tag[attribute];
            newElement.setAttribute(attribute, value);
          }
        }
      }

      newElement.setAttribute(_HelmetConstants.HELMET_ATTRIBUTE, "true"); // Remove a duplicate tag from domTagstoRemove, so it isn't cleared.

      if (oldTags.some(function (existingTag, index) {
        indexToDelete = index;
        return newElement.isEqualNode(existingTag);
      })) {
        oldTags.splice(indexToDelete, 1);
      } else {
        newTags.push(newElement);
      }
    });
  }

  oldTags.forEach(function (tag) {
    return tag.parentNode.removeChild(tag);
  });
  newTags.forEach(function (tag) {
    return headElement.appendChild(tag);
  });
  return {
    oldTags: oldTags,
    newTags: newTags
  };
};

var generateElementAttributesAsString = function generateElementAttributesAsString(attributes) {
  return Object.keys(attributes).reduce(function (str, key) {
    var attr = typeof attributes[key] !== "undefined" ? key + "=\"" + attributes[key] + "\"" : "" + key;
    return str ? str + " " + attr : attr;
  }, "");
};

var generateTitleAsString = function generateTitleAsString(type, title, attributes, encode) {
  var attributeString = generateElementAttributesAsString(attributes);
  var flattenedTitle = flattenArray(title);
  return attributeString ? "<" + type + " " + _HelmetConstants.HELMET_ATTRIBUTE + "=\"true\" " + attributeString + ">" + encodeSpecialCharacters(flattenedTitle, encode) + "</" + type + ">" : "<" + type + " " + _HelmetConstants.HELMET_ATTRIBUTE + "=\"true\">" + encodeSpecialCharacters(flattenedTitle, encode) + "</" + type + ">";
};

var generateTagsAsString = function generateTagsAsString(type, tags, encode) {
  return tags.reduce(function (str, tag) {
    var attributeHtml = Object.keys(tag).filter(function (attribute) {
      return !(attribute === _HelmetConstants.TAG_PROPERTIES.INNER_HTML || attribute === _HelmetConstants.TAG_PROPERTIES.CSS_TEXT);
    }).reduce(function (string, attribute) {
      var attr = typeof tag[attribute] === "undefined" ? attribute : attribute + "=\"" + encodeSpecialCharacters(tag[attribute], encode) + "\"";
      return string ? string + " " + attr : attr;
    }, "");
    var tagContent = tag.innerHTML || tag.cssText || "";
    var isSelfClosing = _HelmetConstants.SELF_CLOSING_TAGS.indexOf(type) === -1;
    return str + "<" + type + " " + _HelmetConstants.HELMET_ATTRIBUTE + "=\"true\" " + attributeHtml + (isSelfClosing ? "/>" : ">" + tagContent + "</" + type + ">");
  }, "");
};

var convertElementAttributestoReactProps = function convertElementAttributestoReactProps(attributes) {
  var initProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return Object.keys(attributes).reduce(function (obj, key) {
    obj[_HelmetConstants.REACT_TAG_MAP[key] || key] = attributes[key];
    return obj;
  }, initProps);
};

var convertReactPropstoHtmlAttributes = function convertReactPropstoHtmlAttributes(props) {
  var initAttributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return Object.keys(props).reduce(function (obj, key) {
    obj[_HelmetConstants.HTML_TAG_MAP[key] || key] = props[key];
    return obj;
  }, initAttributes);
};

var generateTitleAsReactComponent = function generateTitleAsReactComponent(type, title, attributes) {
  var _initProps; // assigning into an array to define toString function on it


  var initProps = (_initProps = {
    key: title
  }, _initProps[_HelmetConstants.HELMET_ATTRIBUTE] = true, _initProps);
  var props = convertElementAttributestoReactProps(attributes, initProps);
  return [_react2.default.createElement(_HelmetConstants.TAG_NAMES.TITLE, props, title)];
};

var generateTagsAsReactComponent = function generateTagsAsReactComponent(type, tags) {
  return tags.map(function (tag, i) {
    var _mappedTag;

    var mappedTag = (_mappedTag = {
      key: i
    }, _mappedTag[_HelmetConstants.HELMET_ATTRIBUTE] = true, _mappedTag);
    Object.keys(tag).forEach(function (attribute) {
      var mappedAttribute = _HelmetConstants.REACT_TAG_MAP[attribute] || attribute;

      if (mappedAttribute === _HelmetConstants.TAG_PROPERTIES.INNER_HTML || mappedAttribute === _HelmetConstants.TAG_PROPERTIES.CSS_TEXT) {
        var content = tag.innerHTML || tag.cssText;
        mappedTag.dangerouslySetInnerHTML = {
          __html: content
        };
      } else {
        mappedTag[mappedAttribute] = tag[attribute];
      }
    });
    return _react2.default.createElement(type, mappedTag);
  });
};

var getMethodsForTag = function getMethodsForTag(type, tags, encode) {
  switch (type) {
    case _HelmetConstants.TAG_NAMES.TITLE:
      return {
        toComponent: function toComponent() {
          return generateTitleAsReactComponent(type, tags.title, tags.titleAttributes, encode);
        },
        toString: function toString() {
          return generateTitleAsString(type, tags.title, tags.titleAttributes, encode);
        }
      };

    case _HelmetConstants.ATTRIBUTE_NAMES.BODY:
    case _HelmetConstants.ATTRIBUTE_NAMES.HTML:
      return {
        toComponent: function toComponent() {
          return convertElementAttributestoReactProps(tags);
        },
        toString: function toString() {
          return generateElementAttributesAsString(tags);
        }
      };

    default:
      return {
        toComponent: function toComponent() {
          return generateTagsAsReactComponent(type, tags);
        },
        toString: function toString() {
          return generateTagsAsString(type, tags, encode);
        }
      };
  }
};

var mapStateOnServer = function mapStateOnServer(_ref) {
  var baseTag = _ref.baseTag,
      bodyAttributes = _ref.bodyAttributes,
      encode = _ref.encode,
      htmlAttributes = _ref.htmlAttributes,
      linkTags = _ref.linkTags,
      metaTags = _ref.metaTags,
      noscriptTags = _ref.noscriptTags,
      scriptTags = _ref.scriptTags,
      styleTags = _ref.styleTags,
      _ref$title = _ref.title,
      title = _ref$title === undefined ? "" : _ref$title,
      titleAttributes = _ref.titleAttributes;
  return {
    base: getMethodsForTag(_HelmetConstants.TAG_NAMES.BASE, baseTag, encode),
    bodyAttributes: getMethodsForTag(_HelmetConstants.ATTRIBUTE_NAMES.BODY, bodyAttributes, encode),
    htmlAttributes: getMethodsForTag(_HelmetConstants.ATTRIBUTE_NAMES.HTML, htmlAttributes, encode),
    link: getMethodsForTag(_HelmetConstants.TAG_NAMES.LINK, linkTags, encode),
    meta: getMethodsForTag(_HelmetConstants.TAG_NAMES.META, metaTags, encode),
    noscript: getMethodsForTag(_HelmetConstants.TAG_NAMES.NOSCRIPT, noscriptTags, encode),
    script: getMethodsForTag(_HelmetConstants.TAG_NAMES.SCRIPT, scriptTags, encode),
    style: getMethodsForTag(_HelmetConstants.TAG_NAMES.STYLE, styleTags, encode),
    title: getMethodsForTag(_HelmetConstants.TAG_NAMES.TITLE, {
      title: title,
      titleAttributes: titleAttributes
    }, encode)
  };
};

exports.convertReactPropstoHtmlAttributes = convertReactPropstoHtmlAttributes;
exports.handleClientStateChange = handleClientStateChange;
exports.mapStateOnServer = mapStateOnServer;
exports.reducePropsToState = reducePropsToState;
exports.requestAnimationFrame = requestAnimationFrame;
exports.warn = warn;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("yLpj")))

/***/ }),

/***/ "vOnD":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return createGlobalStyle; });
/* unused harmony export css */
/* unused harmony export isStyledComponent */
/* unused harmony export keyframes */
/* unused harmony export ServerStyleSheet */
/* unused harmony export StyleSheetConsumer */
/* unused harmony export StyleSheetContext */
/* unused harmony export StyleSheetManager */
/* unused harmony export ThemeConsumer */
/* unused harmony export ThemeContext */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ThemeProvider; });
/* unused harmony export withTheme */
/* unused harmony export __DO_NOT_USE_OR_YOU_WILL_BE_HAUNTED_BY_SPOOKY_GHOSTS */
/* harmony import */ var stylis_stylis_min__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("aJjT");
/* harmony import */ var stylis_stylis_min__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(stylis_stylis_min__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var stylis_rule_sheet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("TAZq");
/* harmony import */ var stylis_rule_sheet__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(stylis_rule_sheet__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _emotion_unitless__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("ME5O");
/* harmony import */ var react_is__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("TOwV");
/* harmony import */ var react_is__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_is__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var memoize_one__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("Wwog");
/* harmony import */ var _emotion_is_prop_valid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("9uj6");
/* harmony import */ var merge_anything__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("ECyS");







 // 

var interleave = function interleave(strings, interpolations) {
  var result = [strings[0]];

  for (var i = 0, len = interpolations.length; i < len; i += 1) {
    result.push(interpolations[i], strings[i + 1]);
  }

  return result;
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var classCallCheck = function classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var inherits = function inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var objectWithoutProperties = function objectWithoutProperties(obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
}; // 


var isPlainObject = function isPlainObject(x) {
  return (typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object' && x.constructor === Object;
}; // 


var EMPTY_ARRAY = Object.freeze([]);
var EMPTY_OBJECT = Object.freeze({}); // 

function isFunction(test) {
  return typeof test === 'function';
} // 


function getComponentName(target) {
  return ( false) || target.displayName || target.name || 'Component';
} // 


function isStatelessFunction(test) {
  return typeof test === 'function' && !(test.prototype && test.prototype.isReactComponent);
} // 


function isStyledComponent(target) {
  return target && typeof target.styledComponentId === 'string';
} // 


var SC_ATTR = typeof process !== 'undefined' && (({}).REACT_APP_SC_ATTR || ({}).SC_ATTR) || 'data-styled';
var SC_VERSION_ATTR = 'data-styled-version';
var SC_STREAM_ATTR = 'data-styled-streamed';
var IS_BROWSER = typeof window !== 'undefined' && 'HTMLElement' in window;
var DISABLE_SPEEDY = typeof SC_DISABLE_SPEEDY === 'boolean' && SC_DISABLE_SPEEDY || typeof process !== 'undefined' && (({}).REACT_APP_SC_DISABLE_SPEEDY || ({}).SC_DISABLE_SPEEDY) || "production" !== 'production'; // Shared empty execution context when generating static styles

var STATIC_EXECUTION_CONTEXT = {}; // 

/**
 * Parse errors.md and turn it into a simple hash of code: message
 */

var ERRORS =  false ? undefined : {};
/**
 * super basic version of sprintf
 */

function format() {
  var a = arguments.length <= 0 ? undefined : arguments[0];
  var b = [];

  for (var c = 1, len = arguments.length; c < len; c += 1) {
    b.push(arguments.length <= c ? undefined : arguments[c]);
  }

  b.forEach(function (d) {
    a = a.replace(/%[a-z]/, d);
  });
  return a;
}
/**
 * Create an error file out of errors.md for development and a simple web link to the full errors
 * in production mode.
 */


var StyledComponentsError = function (_Error) {
  inherits(StyledComponentsError, _Error);

  function StyledComponentsError(code) {
    classCallCheck(this, StyledComponentsError);

    for (var _len = arguments.length, interpolations = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      interpolations[_key - 1] = arguments[_key];
    }

    if (true) {
      var _this = possibleConstructorReturn(this, _Error.call(this, 'An error occurred. See https://github.com/styled-components/styled-components/blob/master/packages/styled-components/src/utils/errors.md#' + code + ' for more information.' + (interpolations.length > 0 ? ' Additional arguments: ' + interpolations.join(', ') : '')));
    } else { var _this; }

    return possibleConstructorReturn(_this);
  }

  return StyledComponentsError;
}(Error); // 


var SC_COMPONENT_ID = /^[^\S\n]*?\/\* sc-component-id:\s*(\S+)\s+\*\//gm;

var extractComps = function extractComps(maybeCSS) {
  var css = '' + (maybeCSS || ''); // Definitely a string, and a clone

  var existingComponents = [];
  css.replace(SC_COMPONENT_ID, function (match, componentId, matchIndex) {
    existingComponents.push({
      componentId: componentId,
      matchIndex: matchIndex
    });
    return match;
  });
  return existingComponents.map(function (_ref, i) {
    var componentId = _ref.componentId,
        matchIndex = _ref.matchIndex;
    var nextComp = existingComponents[i + 1];
    var cssFromDOM = nextComp ? css.slice(matchIndex, nextComp.matchIndex) : css.slice(matchIndex);
    return {
      componentId: componentId,
      cssFromDOM: cssFromDOM
    };
  });
}; // 


var COMMENT_REGEX = /^\s*\/\/.*$/gm; // NOTE: This stylis instance is only used to split rules from SSR'd style tags

var stylisSplitter = new stylis_stylis_min__WEBPACK_IMPORTED_MODULE_0___default.a({
  global: false,
  cascade: true,
  keyframe: false,
  prefix: false,
  compress: false,
  semicolon: true
});
var stylis = new stylis_stylis_min__WEBPACK_IMPORTED_MODULE_0___default.a({
  global: false,
  cascade: true,
  keyframe: false,
  prefix: true,
  compress: false,
  semicolon: false // NOTE: This means "autocomplete missing semicolons"

}); // Wrap `insertRulePlugin to build a list of rules,
// and then make our own plugin to return the rules. This
// makes it easier to hook into the existing SSR architecture

var parsingRules = []; // eslint-disable-next-line consistent-return

var returnRulesPlugin = function returnRulesPlugin(context) {
  if (context === -2) {
    var parsedRules = parsingRules;
    parsingRules = [];
    return parsedRules;
  }
};

var parseRulesPlugin = stylis_rule_sheet__WEBPACK_IMPORTED_MODULE_1___default()(function (rule) {
  parsingRules.push(rule);
});

var _componentId = void 0;

var _selector = void 0;

var _selectorRegexp = void 0;

var selfReferenceReplacer = function selfReferenceReplacer(match, offset, string) {
  if ( // the first self-ref is always untouched
  offset > 0 && // there should be at least two self-refs to do a replacement (.b > .b)
  string.slice(0, offset).indexOf(_selector) !== -1 && // no consecutive self refs (.b.b); that is a precedence boost and treated differently
  string.slice(offset - _selector.length, offset) !== _selector) {
    return '.' + _componentId;
  }

  return match;
};
/**
 * When writing a style like
 *
 * & + & {
 *   color: red;
 * }
 *
 * The second ampersand should be a reference to the static component class. stylis
 * has no knowledge of static class so we have to intelligently replace the base selector.
 */


var selfReferenceReplacementPlugin = function selfReferenceReplacementPlugin(context, _, selectors) {
  if (context === 2 && selectors.length && selectors[0].lastIndexOf(_selector) > 0) {
    // eslint-disable-next-line no-param-reassign
    selectors[0] = selectors[0].replace(_selectorRegexp, selfReferenceReplacer);
  }
};

stylis.use([selfReferenceReplacementPlugin, parseRulesPlugin, returnRulesPlugin]);
stylisSplitter.use([parseRulesPlugin, returnRulesPlugin]);

var splitByRules = function splitByRules(css) {
  return stylisSplitter('', css);
};

function stringifyRules(rules, selector, prefix) {
  var componentId = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '&';
  var flatCSS = rules.join('').replace(COMMENT_REGEX, ''); // replace JS comments

  var cssStr = selector && prefix ? prefix + ' ' + selector + ' { ' + flatCSS + ' }' : flatCSS; // stylis has no concept of state to be passed to plugins
  // but since JS is single=threaded, we can rely on that to ensure
  // these properties stay in sync with the current stylis run

  _componentId = componentId;
  _selector = selector;
  _selectorRegexp = new RegExp('\\' + _selector + '\\b', 'g');
  return stylis(prefix || !selector ? '' : selector, cssStr);
} // 

/* eslint-disable camelcase, no-undef */


var getNonce = function getNonce() {
  return  true ? __webpack_require__.nc : undefined;
}; // 

/* These are helpers for the StyleTags to keep track of the injected
 * rule names for each (component) ID that they're keeping track of.
 * They're crucial for detecting whether a name has already been
 * injected.
 * (This excludes rehydrated names) */

/* adds a new ID:name pairing to a names dictionary */


var addNameForId = function addNameForId(names, id, name) {
  if (name) {
    // eslint-disable-next-line no-param-reassign
    var namesForId = names[id] || (names[id] = Object.create(null));
    namesForId[name] = true;
  }
};
/* resets an ID entirely by overwriting it in the dictionary */


var resetIdNames = function resetIdNames(names, id) {
  // eslint-disable-next-line no-param-reassign
  names[id] = Object.create(null);
};
/* factory for a names dictionary checking the existance of an ID:name pairing */


var hasNameForId = function hasNameForId(names) {
  return function (id, name) {
    return names[id] !== undefined && names[id][name];
  };
};
/* stringifies names for the html/element output */


var stringifyNames = function stringifyNames(names) {
  var str = ''; // eslint-disable-next-line guard-for-in

  for (var id in names) {
    str += Object.keys(names[id]).join(' ') + ' ';
  }

  return str.trim();
};
/* clones the nested names dictionary */


var cloneNames = function cloneNames(names) {
  var clone = Object.create(null); // eslint-disable-next-line guard-for-in

  for (var id in names) {
    clone[id] = _extends({}, names[id]);
  }

  return clone;
}; // 

/* These are helpers that deal with the insertRule (aka speedy) API
 * They are used in the StyleTags and specifically the speedy tag
 */

/* retrieve a sheet for a given style tag */


var sheetForTag = function sheetForTag(tag) {
  // $FlowFixMe
  if (tag.sheet) return tag.sheet;
  /* Firefox quirk requires us to step through all stylesheets to find one owned by the given tag */

  var size = tag.ownerDocument.styleSheets.length;

  for (var i = 0; i < size; i += 1) {
    var sheet = tag.ownerDocument.styleSheets[i]; // $FlowFixMe

    if (sheet.ownerNode === tag) return sheet;
  }
  /* we should always be able to find a tag */


  throw new StyledComponentsError(10);
};
/* insert a rule safely and return whether it was actually injected */


var safeInsertRule = function safeInsertRule(sheet, cssRule, index) {
  /* abort early if cssRule string is falsy */
  if (!cssRule) return false;
  var maxIndex = sheet.cssRules.length;

  try {
    /* use insertRule and cap passed index with maxIndex (no of cssRules) */
    sheet.insertRule(cssRule, index <= maxIndex ? index : maxIndex);
  } catch (err) {
    /* any error indicates an invalid rule */
    return false;
  }

  return true;
};
/* deletes `size` rules starting from `removalIndex` */


var deleteRules = function deleteRules(sheet, removalIndex, size) {
  var lowerBound = removalIndex - size;

  for (var i = removalIndex; i > lowerBound; i -= 1) {
    sheet.deleteRule(i);
  }
}; // 

/* this marker separates component styles and is important for rehydration */


var makeTextMarker = function makeTextMarker(id) {
  return '\n/* sc-component-id: ' + id + ' */\n';
};
/* add up all numbers in array up until and including the index */


var addUpUntilIndex = function addUpUntilIndex(sizes, index) {
  var totalUpToIndex = 0;

  for (var i = 0; i <= index; i += 1) {
    totalUpToIndex += sizes[i];
  }

  return totalUpToIndex;
};
/* create a new style tag after lastEl */


var makeStyleTag = function makeStyleTag(target, tagEl, insertBefore) {
  var targetDocument = document;
  if (target) targetDocument = target.ownerDocument;else if (tagEl) targetDocument = tagEl.ownerDocument;
  var el = targetDocument.createElement('style');
  el.setAttribute(SC_ATTR, '');
  el.setAttribute(SC_VERSION_ATTR, "4.4.1");
  var nonce = getNonce();

  if (nonce) {
    el.setAttribute('nonce', nonce);
  }
  /* Work around insertRule quirk in EdgeHTML */


  el.appendChild(targetDocument.createTextNode(''));

  if (target && !tagEl) {
    /* Append to target when no previous element was passed */
    target.appendChild(el);
  } else {
    if (!tagEl || !target || !tagEl.parentNode) {
      throw new StyledComponentsError(6);
    }
    /* Insert new style tag after the previous one */


    tagEl.parentNode.insertBefore(el, insertBefore ? tagEl : tagEl.nextSibling);
  }

  return el;
};
/* takes a css factory function and outputs an html styled tag factory */


var wrapAsHtmlTag = function wrapAsHtmlTag(css, names) {
  return function (additionalAttrs) {
    var nonce = getNonce();
    var attrs = [nonce && 'nonce="' + nonce + '"', SC_ATTR + '="' + stringifyNames(names) + '"', SC_VERSION_ATTR + '="' + "4.4.1" + '"', additionalAttrs];
    var htmlAttr = attrs.filter(Boolean).join(' ');
    return '<style ' + htmlAttr + '>' + css() + '</style>';
  };
};
/* takes a css factory function and outputs an element factory */


var wrapAsElement = function wrapAsElement(css, names) {
  return function () {
    var _props;

    var props = (_props = {}, _props[SC_ATTR] = stringifyNames(names), _props[SC_VERSION_ATTR] = "4.4.1", _props);
    var nonce = getNonce();

    if (nonce) {
      // $FlowFixMe
      props.nonce = nonce;
    } // eslint-disable-next-line react/no-danger


    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement('style', _extends({}, props, {
      dangerouslySetInnerHTML: {
        __html: css()
      }
    }));
  };
};

var getIdsFromMarkersFactory = function getIdsFromMarkersFactory(markers) {
  return function () {
    return Object.keys(markers);
  };
};
/* speedy tags utilise insertRule */


var makeSpeedyTag = function makeSpeedyTag(el, getImportRuleTag) {
  var names = Object.create(null);
  var markers = Object.create(null);
  var sizes = [];
  var extractImport = getImportRuleTag !== undefined;
  /* indicates whether getImportRuleTag was called */

  var usedImportRuleTag = false;

  var insertMarker = function insertMarker(id) {
    var prev = markers[id];

    if (prev !== undefined) {
      return prev;
    }

    markers[id] = sizes.length;
    sizes.push(0);
    resetIdNames(names, id);
    return markers[id];
  };

  var insertRules = function insertRules(id, cssRules, name) {
    var marker = insertMarker(id);
    var sheet = sheetForTag(el);
    var insertIndex = addUpUntilIndex(sizes, marker);
    var injectedRules = 0;
    var importRules = [];
    var cssRulesSize = cssRules.length;

    for (var i = 0; i < cssRulesSize; i += 1) {
      var cssRule = cssRules[i];
      var mayHaveImport = extractImport;
      /* @import rules are reordered to appear first */

      if (mayHaveImport && cssRule.indexOf('@import') !== -1) {
        importRules.push(cssRule);
      } else if (safeInsertRule(sheet, cssRule, insertIndex + injectedRules)) {
        mayHaveImport = false;
        injectedRules += 1;
      }
    }

    if (extractImport && importRules.length > 0) {
      usedImportRuleTag = true; // $FlowFixMe

      getImportRuleTag().insertRules(id + '-import', importRules);
    }

    sizes[marker] += injectedRules;
    /* add up no of injected rules */

    addNameForId(names, id, name);
  };

  var removeRules = function removeRules(id) {
    var marker = markers[id];
    if (marker === undefined) return; // $FlowFixMe

    if (el.isConnected === false) return;
    var size = sizes[marker];
    var sheet = sheetForTag(el);
    var removalIndex = addUpUntilIndex(sizes, marker) - 1;
    deleteRules(sheet, removalIndex, size);
    sizes[marker] = 0;
    resetIdNames(names, id);

    if (extractImport && usedImportRuleTag) {
      // $FlowFixMe
      getImportRuleTag().removeRules(id + '-import');
    }
  };

  var css = function css() {
    var _sheetForTag = sheetForTag(el),
        cssRules = _sheetForTag.cssRules;

    var str = ''; // eslint-disable-next-line guard-for-in

    for (var id in markers) {
      str += makeTextMarker(id);
      var marker = markers[id];
      var end = addUpUntilIndex(sizes, marker);
      var size = sizes[marker];

      for (var i = end - size; i < end; i += 1) {
        var rule = cssRules[i];

        if (rule !== undefined) {
          str += rule.cssText;
        }
      }
    }

    return str;
  };

  return {
    clone: function clone() {
      throw new StyledComponentsError(5);
    },
    css: css,
    getIds: getIdsFromMarkersFactory(markers),
    hasNameForId: hasNameForId(names),
    insertMarker: insertMarker,
    insertRules: insertRules,
    removeRules: removeRules,
    sealed: false,
    styleTag: el,
    toElement: wrapAsElement(css, names),
    toHTML: wrapAsHtmlTag(css, names)
  };
};

var makeTextNode = function makeTextNode(targetDocument, id) {
  return targetDocument.createTextNode(makeTextMarker(id));
};

var makeBrowserTag = function makeBrowserTag(el, getImportRuleTag) {
  var names = Object.create(null);
  var markers = Object.create(null);
  var extractImport = getImportRuleTag !== undefined;
  /* indicates whether getImportRuleTag was called */

  var usedImportRuleTag = false;

  var insertMarker = function insertMarker(id) {
    var prev = markers[id];

    if (prev !== undefined) {
      return prev;
    }

    markers[id] = makeTextNode(el.ownerDocument, id);
    el.appendChild(markers[id]);
    names[id] = Object.create(null);
    return markers[id];
  };

  var insertRules = function insertRules(id, cssRules, name) {
    var marker = insertMarker(id);
    var importRules = [];
    var cssRulesSize = cssRules.length;

    for (var i = 0; i < cssRulesSize; i += 1) {
      var rule = cssRules[i];
      var mayHaveImport = extractImport;

      if (mayHaveImport && rule.indexOf('@import') !== -1) {
        importRules.push(rule);
      } else {
        mayHaveImport = false;
        var separator = i === cssRulesSize - 1 ? '' : ' ';
        marker.appendData('' + rule + separator);
      }
    }

    addNameForId(names, id, name);

    if (extractImport && importRules.length > 0) {
      usedImportRuleTag = true; // $FlowFixMe

      getImportRuleTag().insertRules(id + '-import', importRules);
    }
  };

  var removeRules = function removeRules(id) {
    var marker = markers[id];
    if (marker === undefined) return;
    /* create new empty text node and replace the current one */

    var newMarker = makeTextNode(el.ownerDocument, id);
    el.replaceChild(newMarker, marker);
    markers[id] = newMarker;
    resetIdNames(names, id);

    if (extractImport && usedImportRuleTag) {
      // $FlowFixMe
      getImportRuleTag().removeRules(id + '-import');
    }
  };

  var css = function css() {
    var str = ''; // eslint-disable-next-line guard-for-in

    for (var id in markers) {
      str += markers[id].data;
    }

    return str;
  };

  return {
    clone: function clone() {
      throw new StyledComponentsError(5);
    },
    css: css,
    getIds: getIdsFromMarkersFactory(markers),
    hasNameForId: hasNameForId(names),
    insertMarker: insertMarker,
    insertRules: insertRules,
    removeRules: removeRules,
    sealed: false,
    styleTag: el,
    toElement: wrapAsElement(css, names),
    toHTML: wrapAsHtmlTag(css, names)
  };
};

var makeServerTag = function makeServerTag(namesArg, markersArg) {
  var names = namesArg === undefined ? Object.create(null) : namesArg;
  var markers = markersArg === undefined ? Object.create(null) : markersArg;

  var insertMarker = function insertMarker(id) {
    var prev = markers[id];

    if (prev !== undefined) {
      return prev;
    }

    return markers[id] = [''];
  };

  var insertRules = function insertRules(id, cssRules, name) {
    var marker = insertMarker(id);
    marker[0] += cssRules.join(' ');
    addNameForId(names, id, name);
  };

  var removeRules = function removeRules(id) {
    var marker = markers[id];
    if (marker === undefined) return;
    marker[0] = '';
    resetIdNames(names, id);
  };

  var css = function css() {
    var str = ''; // eslint-disable-next-line guard-for-in

    for (var id in markers) {
      var cssForId = markers[id][0];

      if (cssForId) {
        str += makeTextMarker(id) + cssForId;
      }
    }

    return str;
  };

  var clone = function clone() {
    var namesClone = cloneNames(names);
    var markersClone = Object.create(null); // eslint-disable-next-line guard-for-in

    for (var id in markers) {
      markersClone[id] = [markers[id][0]];
    }

    return makeServerTag(namesClone, markersClone);
  };

  var tag = {
    clone: clone,
    css: css,
    getIds: getIdsFromMarkersFactory(markers),
    hasNameForId: hasNameForId(names),
    insertMarker: insertMarker,
    insertRules: insertRules,
    removeRules: removeRules,
    sealed: false,
    styleTag: null,
    toElement: wrapAsElement(css, names),
    toHTML: wrapAsHtmlTag(css, names)
  };
  return tag;
};

var makeTag = function makeTag(target, tagEl, forceServer, insertBefore, getImportRuleTag) {
  if (IS_BROWSER && !forceServer) {
    var el = makeStyleTag(target, tagEl, insertBefore);

    if (DISABLE_SPEEDY) {
      return makeBrowserTag(el, getImportRuleTag);
    } else {
      return makeSpeedyTag(el, getImportRuleTag);
    }
  }

  return makeServerTag();
};

var rehydrate = function rehydrate(tag, els, extracted) {
  /* add all extracted components to the new tag */
  for (var i = 0, len = extracted.length; i < len; i += 1) {
    var _extracted$i = extracted[i],
        componentId = _extracted$i.componentId,
        cssFromDOM = _extracted$i.cssFromDOM;
    var cssRules = splitByRules(cssFromDOM);
    tag.insertRules(componentId, cssRules);
  }
  /* remove old HTMLStyleElements, since they have been rehydrated */


  for (var _i = 0, _len = els.length; _i < _len; _i += 1) {
    var el = els[_i];

    if (el.parentNode) {
      el.parentNode.removeChild(el);
    }
  }
}; // 


var SPLIT_REGEX = /\s+/;
/* determine the maximum number of components before tags are sharded */

var MAX_SIZE = void 0;

if (IS_BROWSER) {
  /* in speedy mode we can keep a lot more rules in a sheet before a slowdown can be expected */
  MAX_SIZE = DISABLE_SPEEDY ? 40 : 1000;
} else {
  /* for servers we do not need to shard at all */
  MAX_SIZE = -1;
}

var sheetRunningId = 0;
var master = void 0;

var StyleSheet = function () {
  /* a map from ids to tags */

  /* deferred rules for a given id */

  /* this is used for not reinjecting rules via hasNameForId() */

  /* when rules for an id are removed using remove() we have to ignore rehydratedNames for it */

  /* a list of tags belonging to this StyleSheet */

  /* a tag for import rules */

  /* current capacity until a new tag must be created */

  /* children (aka clones) of this StyleSheet inheriting all and future injections */
  function StyleSheet() {
    var _this = this;

    var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : IS_BROWSER ? document.head : null;
    var forceServer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    classCallCheck(this, StyleSheet);

    this.getImportRuleTag = function () {
      var importRuleTag = _this.importRuleTag;

      if (importRuleTag !== undefined) {
        return importRuleTag;
      }

      var firstTag = _this.tags[0];
      var insertBefore = true;
      return _this.importRuleTag = makeTag(_this.target, firstTag ? firstTag.styleTag : null, _this.forceServer, insertBefore);
    };

    sheetRunningId += 1;
    this.id = sheetRunningId;
    this.forceServer = forceServer;
    this.target = forceServer ? null : target;
    this.tagMap = {};
    this.deferred = {};
    this.rehydratedNames = {};
    this.ignoreRehydratedNames = {};
    this.tags = [];
    this.capacity = 1;
    this.clones = [];
  }
  /* rehydrate all SSR'd style tags */


  StyleSheet.prototype.rehydrate = function rehydrate$$1() {
    if (!IS_BROWSER || this.forceServer) return this;
    var els = [];
    var extracted = [];
    var isStreamed = false;
    /* retrieve all of our SSR style elements from the DOM */

    var nodes = document.querySelectorAll('style[' + SC_ATTR + '][' + SC_VERSION_ATTR + '="' + "4.4.1" + '"]');
    var nodesSize = nodes.length;
    /* abort rehydration if no previous style tags were found */

    if (!nodesSize) return this;

    for (var i = 0; i < nodesSize; i += 1) {
      var el = nodes[i];
      /* check if style tag is a streamed tag */

      if (!isStreamed) isStreamed = !!el.getAttribute(SC_STREAM_ATTR);
      /* retrieve all component names */

      var elNames = (el.getAttribute(SC_ATTR) || '').trim().split(SPLIT_REGEX);
      var elNamesSize = elNames.length;

      for (var j = 0, name; j < elNamesSize; j += 1) {
        name = elNames[j];
        /* add rehydrated name to sheet to avoid re-adding styles */

        this.rehydratedNames[name] = true;
      }
      /* extract all components and their CSS */


      extracted.push.apply(extracted, extractComps(el.textContent));
      /* store original HTMLStyleElement */

      els.push(el);
    }
    /* abort rehydration if nothing was extracted */


    var extractedSize = extracted.length;
    if (!extractedSize) return this;
    /* create a tag to be used for rehydration */

    var tag = this.makeTag(null);
    rehydrate(tag, els, extracted);
    /* reset capacity and adjust MAX_SIZE by the initial size of the rehydration */

    this.capacity = Math.max(1, MAX_SIZE - extractedSize);
    this.tags.push(tag);
    /* retrieve all component ids */

    for (var _j = 0; _j < extractedSize; _j += 1) {
      this.tagMap[extracted[_j].componentId] = tag;
    }

    return this;
  };
  /* retrieve a "master" instance of StyleSheet which is typically used when no other is available
   * The master StyleSheet is targeted by createGlobalStyle, keyframes, and components outside of any
    * StyleSheetManager's context */

  /* reset the internal "master" instance */


  StyleSheet.reset = function reset() {
    var forceServer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    master = new StyleSheet(undefined, forceServer).rehydrate();
  };
  /* adds "children" to the StyleSheet that inherit all of the parents' rules
   * while their own rules do not affect the parent */


  StyleSheet.prototype.clone = function clone() {
    var sheet = new StyleSheet(this.target, this.forceServer);
    /* add to clone array */

    this.clones.push(sheet);
    /* clone all tags */

    sheet.tags = this.tags.map(function (tag) {
      var ids = tag.getIds();
      var newTag = tag.clone();
      /* reconstruct tagMap */

      for (var i = 0; i < ids.length; i += 1) {
        sheet.tagMap[ids[i]] = newTag;
      }

      return newTag;
    });
    /* clone other maps */

    sheet.rehydratedNames = _extends({}, this.rehydratedNames);
    sheet.deferred = _extends({}, this.deferred);
    return sheet;
  };
  /* force StyleSheet to create a new tag on the next injection */


  StyleSheet.prototype.sealAllTags = function sealAllTags() {
    this.capacity = 1;
    this.tags.forEach(function (tag) {
      // eslint-disable-next-line no-param-reassign
      tag.sealed = true;
    });
  };

  StyleSheet.prototype.makeTag = function makeTag$$1(tag) {
    var lastEl = tag ? tag.styleTag : null;
    var insertBefore = false;
    return makeTag(this.target, lastEl, this.forceServer, insertBefore, this.getImportRuleTag);
  };
  /* get a tag for a given componentId, assign the componentId to one, or shard */


  StyleSheet.prototype.getTagForId = function getTagForId(id) {
    /* simply return a tag, when the componentId was already assigned one */
    var prev = this.tagMap[id];

    if (prev !== undefined && !prev.sealed) {
      return prev;
    }

    var tag = this.tags[this.tags.length - 1];
    /* shard (create a new tag) if the tag is exhausted (See MAX_SIZE) */

    this.capacity -= 1;

    if (this.capacity === 0) {
      this.capacity = MAX_SIZE;
      tag = this.makeTag(tag);
      this.tags.push(tag);
    }

    return this.tagMap[id] = tag;
  };
  /* mainly for createGlobalStyle to check for its id */


  StyleSheet.prototype.hasId = function hasId(id) {
    return this.tagMap[id] !== undefined;
  };
  /* caching layer checking id+name to already have a corresponding tag and injected rules */


  StyleSheet.prototype.hasNameForId = function hasNameForId(id, name) {
    /* exception for rehydrated names which are checked separately */
    if (this.ignoreRehydratedNames[id] === undefined && this.rehydratedNames[name]) {
      return true;
    }

    var tag = this.tagMap[id];
    return tag !== undefined && tag.hasNameForId(id, name);
  };
  /* registers a componentId and registers it on its tag */


  StyleSheet.prototype.deferredInject = function deferredInject(id, cssRules) {
    /* don't inject when the id is already registered */
    if (this.tagMap[id] !== undefined) return;
    var clones = this.clones;

    for (var i = 0; i < clones.length; i += 1) {
      clones[i].deferredInject(id, cssRules);
    }

    this.getTagForId(id).insertMarker(id);
    this.deferred[id] = cssRules;
  };
  /* injects rules for a given id with a name that will need to be cached */


  StyleSheet.prototype.inject = function inject(id, cssRules, name) {
    var clones = this.clones;

    for (var i = 0; i < clones.length; i += 1) {
      clones[i].inject(id, cssRules, name);
    }

    var tag = this.getTagForId(id);
    /* add deferred rules for component */

    if (this.deferred[id] !== undefined) {
      // Combine passed cssRules with previously deferred CSS rules
      // NOTE: We cannot mutate the deferred array itself as all clones
      // do the same (see clones[i].inject)
      var rules = this.deferred[id].concat(cssRules);
      tag.insertRules(id, rules, name);
      this.deferred[id] = undefined;
    } else {
      tag.insertRules(id, cssRules, name);
    }
  };
  /* removes all rules for a given id, which doesn't remove its marker but resets it */


  StyleSheet.prototype.remove = function remove(id) {
    var tag = this.tagMap[id];
    if (tag === undefined) return;
    var clones = this.clones;

    for (var i = 0; i < clones.length; i += 1) {
      clones[i].remove(id);
    }
    /* remove all rules from the tag */


    tag.removeRules(id);
    /* ignore possible rehydrated names */

    this.ignoreRehydratedNames[id] = true;
    /* delete possible deferred rules */

    this.deferred[id] = undefined;
  };

  StyleSheet.prototype.toHTML = function toHTML() {
    return this.tags.map(function (tag) {
      return tag.toHTML();
    }).join('');
  };

  StyleSheet.prototype.toReactElements = function toReactElements() {
    var id = this.id;
    return this.tags.map(function (tag, i) {
      var key = 'sc-' + id + '-' + i;
      return Object(react__WEBPACK_IMPORTED_MODULE_2__["cloneElement"])(tag.toElement(), {
        key: key
      });
    });
  };

  createClass(StyleSheet, null, [{
    key: 'master',
    get: function get$$1() {
      return master || (master = new StyleSheet().rehydrate());
    }
    /* NOTE: This is just for backwards-compatibility with jest-styled-components */

  }, {
    key: 'instance',
    get: function get$$1() {
      return StyleSheet.master;
    }
  }]);
  return StyleSheet;
}(); // 


var Keyframes = function () {
  function Keyframes(name, rules) {
    var _this = this;

    classCallCheck(this, Keyframes);

    this.inject = function (styleSheet) {
      if (!styleSheet.hasNameForId(_this.id, _this.name)) {
        styleSheet.inject(_this.id, _this.rules, _this.name);
      }
    };

    this.toString = function () {
      throw new StyledComponentsError(12, String(_this.name));
    };

    this.name = name;
    this.rules = rules;
    this.id = 'sc-keyframes-' + name;
  }

  Keyframes.prototype.getName = function getName() {
    return this.name;
  };

  return Keyframes;
}(); // 

/**
 * inlined version of
 * https://github.com/facebook/fbjs/blob/master/packages/fbjs/src/core/hyphenateStyleName.js
 */


var uppercasePattern = /([A-Z])/g;
var msPattern = /^ms-/;
/**
 * Hyphenates a camelcased CSS property name, for example:
 *
 *   > hyphenateStyleName('backgroundColor')
 *   < "background-color"
 *   > hyphenateStyleName('MozTransition')
 *   < "-moz-transition"
 *   > hyphenateStyleName('msTransition')
 *   < "-ms-transition"
 *
 * As Modernizr suggests (http://modernizr.com/docs/#prefixed), an `ms` prefix
 * is converted to `-ms-`.
 *
 * @param {string} string
 * @return {string}
 */

function hyphenateStyleName(string) {
  return string.replace(uppercasePattern, '-$1').toLowerCase().replace(msPattern, '-ms-');
} // 
// Taken from https://github.com/facebook/react/blob/b87aabdfe1b7461e7331abb3601d9e6bb27544bc/packages/react-dom/src/shared/dangerousStyleValue.js


function addUnitIfNeeded(name, value) {
  // https://github.com/amilajack/eslint-plugin-flowtype-errors/issues/133
  // $FlowFixMe
  if (value == null || typeof value === 'boolean' || value === '') {
    return '';
  }

  if (typeof value === 'number' && value !== 0 && !(name in _emotion_unitless__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])) {
    return value + 'px'; // Presumes implicit 'px' suffix for unitless numbers
  }

  return String(value).trim();
} // 

/**
 * It's falsish not falsy because 0 is allowed.
 */


var isFalsish = function isFalsish(chunk) {
  return chunk === undefined || chunk === null || chunk === false || chunk === '';
};

var objToCssArray = function objToCssArray(obj, prevKey) {
  var rules = [];
  var keys = Object.keys(obj);
  keys.forEach(function (key) {
    if (!isFalsish(obj[key])) {
      if (isPlainObject(obj[key])) {
        rules.push.apply(rules, objToCssArray(obj[key], key));
        return rules;
      } else if (isFunction(obj[key])) {
        rules.push(hyphenateStyleName(key) + ':', obj[key], ';');
        return rules;
      }

      rules.push(hyphenateStyleName(key) + ': ' + addUnitIfNeeded(key, obj[key]) + ';');
    }

    return rules;
  });
  return prevKey ? [prevKey + ' {'].concat(rules, ['}']) : rules;
};

function flatten(chunk, executionContext, styleSheet) {
  if (Array.isArray(chunk)) {
    var ruleSet = [];

    for (var i = 0, len = chunk.length, result; i < len; i += 1) {
      result = flatten(chunk[i], executionContext, styleSheet);
      if (result === null) continue;else if (Array.isArray(result)) ruleSet.push.apply(ruleSet, result);else ruleSet.push(result);
    }

    return ruleSet;
  }

  if (isFalsish(chunk)) {
    return null;
  }
  /* Handle other components */


  if (isStyledComponent(chunk)) {
    return '.' + chunk.styledComponentId;
  }
  /* Either execute or defer the function */


  if (isFunction(chunk)) {
    if (isStatelessFunction(chunk) && executionContext) {
      var _result = chunk(executionContext);

      if (false) {}

      return flatten(_result, executionContext, styleSheet);
    } else return chunk;
  }

  if (chunk instanceof Keyframes) {
    if (styleSheet) {
      chunk.inject(styleSheet);
      return chunk.getName();
    } else return chunk;
  }
  /* Handle objects */


  return isPlainObject(chunk) ? objToCssArray(chunk) : chunk.toString();
} // 


function css(styles) {
  for (var _len = arguments.length, interpolations = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    interpolations[_key - 1] = arguments[_key];
  }

  if (isFunction(styles) || isPlainObject(styles)) {
    // $FlowFixMe
    return flatten(interleave(EMPTY_ARRAY, [styles].concat(interpolations)));
  } // $FlowFixMe


  return flatten(interleave(styles, interpolations));
} // 


function constructWithOptions(componentConstructor, tag) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : EMPTY_OBJECT;

  if (!Object(react_is__WEBPACK_IMPORTED_MODULE_4__["isValidElementType"])(tag)) {
    throw new StyledComponentsError(1, String(tag));
  }
  /* This is callable directly as a template function */
  // $FlowFixMe: Not typed to avoid destructuring arguments


  var templateFunction = function templateFunction() {
    return componentConstructor(tag, options, css.apply(undefined, arguments));
  };
  /* If config methods are called, wrap up a new template function and merge options */


  templateFunction.withConfig = function (config) {
    return constructWithOptions(componentConstructor, tag, _extends({}, options, config));
  };
  /* Modify/inject new props at runtime */


  templateFunction.attrs = function (attrs) {
    return constructWithOptions(componentConstructor, tag, _extends({}, options, {
      attrs: Array.prototype.concat(options.attrs, attrs).filter(Boolean)
    }));
  };

  return templateFunction;
} // 
// Source: https://github.com/garycourt/murmurhash-js/blob/master/murmurhash2_gc.js


function murmurhash(c) {
  for (var e = c.length | 0, a = e | 0, d = 0, b; e >= 4;) {
    b = c.charCodeAt(d) & 255 | (c.charCodeAt(++d) & 255) << 8 | (c.charCodeAt(++d) & 255) << 16 | (c.charCodeAt(++d) & 255) << 24, b = 1540483477 * (b & 65535) + ((1540483477 * (b >>> 16) & 65535) << 16), b ^= b >>> 24, b = 1540483477 * (b & 65535) + ((1540483477 * (b >>> 16) & 65535) << 16), a = 1540483477 * (a & 65535) + ((1540483477 * (a >>> 16) & 65535) << 16) ^ b, e -= 4, ++d;
  }

  switch (e) {
    case 3:
      a ^= (c.charCodeAt(d + 2) & 255) << 16;

    case 2:
      a ^= (c.charCodeAt(d + 1) & 255) << 8;

    case 1:
      a ^= c.charCodeAt(d) & 255, a = 1540483477 * (a & 65535) + ((1540483477 * (a >>> 16) & 65535) << 16);
  }

  a ^= a >>> 13;
  a = 1540483477 * (a & 65535) + ((1540483477 * (a >>> 16) & 65535) << 16);
  return (a ^ a >>> 15) >>> 0;
} // 

/* eslint-disable no-bitwise */

/* This is the "capacity" of our alphabet i.e. 2x26 for all letters plus their capitalised
 * counterparts */


var charsLength = 52;
/* start at 75 for 'a' until 'z' (25) and then start at 65 for capitalised letters */

var getAlphabeticChar = function getAlphabeticChar(code) {
  return String.fromCharCode(code + (code > 25 ? 39 : 97));
};
/* input a number, usually a hash and convert it to base-52 */


function generateAlphabeticName(code) {
  var name = '';
  var x = void 0;
  /* get a char and divide by alphabet-length */

  for (x = code; x > charsLength; x = Math.floor(x / charsLength)) {
    name = getAlphabeticChar(x % charsLength) + name;
  }

  return getAlphabeticChar(x % charsLength) + name;
} // 


function hasFunctionObjectKey(obj) {
  // eslint-disable-next-line guard-for-in, no-restricted-syntax
  for (var key in obj) {
    if (isFunction(obj[key])) {
      return true;
    }
  }

  return false;
}

function isStaticRules(rules, attrs) {
  for (var i = 0; i < rules.length; i += 1) {
    var rule = rules[i]; // recursive case

    if (Array.isArray(rule) && !isStaticRules(rule, attrs)) {
      return false;
    } else if (isFunction(rule) && !isStyledComponent(rule)) {
      // functions are allowed to be static if they're just being
      // used to get the classname of a nested styled component
      return false;
    }
  }

  if (attrs.some(function (x) {
    return isFunction(x) || hasFunctionObjectKey(x);
  })) return false;
  return true;
} // 

/* combines hashStr (murmurhash) and nameGenerator for convenience */


var hasher = function hasher(str) {
  return generateAlphabeticName(murmurhash(str));
};
/*
 ComponentStyle is all the CSS-specific stuff, not
 the React-specific stuff.
 */


var ComponentStyle = function () {
  function ComponentStyle(rules, attrs, componentId) {
    classCallCheck(this, ComponentStyle);
    this.rules = rules;
    this.isStatic =  true && isStaticRules(rules, attrs);
    this.componentId = componentId;

    if (!StyleSheet.master.hasId(componentId)) {
      StyleSheet.master.deferredInject(componentId, []);
    }
  }
  /*
   * Flattens a rule set into valid CSS
   * Hashes it, wraps the whole chunk in a .hash1234 {}
   * Returns the hash to be injected on render()
   * */


  ComponentStyle.prototype.generateAndInjectStyles = function generateAndInjectStyles(executionContext, styleSheet) {
    var isStatic = this.isStatic,
        componentId = this.componentId,
        lastClassName = this.lastClassName;

    if (IS_BROWSER && isStatic && typeof lastClassName === 'string' && styleSheet.hasNameForId(componentId, lastClassName)) {
      return lastClassName;
    }

    var flatCSS = flatten(this.rules, executionContext, styleSheet);
    var name = hasher(this.componentId + flatCSS.join(''));

    if (!styleSheet.hasNameForId(componentId, name)) {
      styleSheet.inject(this.componentId, stringifyRules(flatCSS, '.' + name, undefined, componentId), name);
    }

    this.lastClassName = name;
    return name;
  };

  ComponentStyle.generateName = function generateName(str) {
    return hasher(str);
  };

  return ComponentStyle;
}(); // 


var LIMIT = 200;

var createWarnTooManyClasses = function createWarnTooManyClasses(displayName) {
  var generatedClasses = {};
  var warningSeen = false;
  return function (className) {
    if (!warningSeen) {
      generatedClasses[className] = true;

      if (Object.keys(generatedClasses).length >= LIMIT) {
        // Unable to find latestRule in test environment.

        /* eslint-disable no-console, prefer-template */
        console.warn('Over ' + LIMIT + ' classes were generated for component ' + displayName + '. \n' + 'Consider using the attrs method, together with a style object for frequently changed styles.\n' + 'Example:\n' + '  const Component = styled.div.attrs(props => ({\n' + '    style: {\n' + '      background: props.background,\n' + '    },\n' + '  }))`width: 100%;`\n\n' + '  <Component />');
        warningSeen = true;
        generatedClasses = {};
      }
    }
  };
}; // 


var determineTheme = function determineTheme(props, fallbackTheme) {
  var defaultProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : EMPTY_OBJECT; // Props should take precedence over ThemeProvider, which should take precedence over
  // defaultProps, but React automatically puts defaultProps on props.

  /* eslint-disable react/prop-types, flowtype-errors/show-errors */

  var isDefaultTheme = defaultProps ? props.theme === defaultProps.theme : false;
  var theme = props.theme && !isDefaultTheme ? props.theme : fallbackTheme || defaultProps.theme;
  /* eslint-enable */

  return theme;
}; // 


var escapeRegex = /[[\].#*$><+~=|^:(),"'`-]+/g;
var dashesAtEnds = /(^-|-$)/g;
/**
 * TODO: Explore using CSS.escape when it becomes more available
 * in evergreen browsers.
 */

function escape(str) {
  return str // Replace all possible CSS selectors
  .replace(escapeRegex, '-') // Remove extraneous hyphens at the start and end
  .replace(dashesAtEnds, '');
} // 


function isTag(target) {
  return typeof target === 'string' && ( false ? undefined : true);
} // 


function generateDisplayName(target) {
  // $FlowFixMe
  return isTag(target) ? 'styled.' + target : 'Styled(' + getComponentName(target) + ')';
}

var _TYPE_STATICS;

var REACT_STATICS = {
  childContextTypes: true,
  contextTypes: true,
  defaultProps: true,
  displayName: true,
  getDerivedStateFromProps: true,
  propTypes: true,
  type: true
};
var KNOWN_STATICS = {
  name: true,
  length: true,
  prototype: true,
  caller: true,
  callee: true,
  arguments: true,
  arity: true
};
var TYPE_STATICS = (_TYPE_STATICS = {}, _TYPE_STATICS[react_is__WEBPACK_IMPORTED_MODULE_4__["ForwardRef"]] = {
  $$typeof: true,
  render: true
}, _TYPE_STATICS);
var defineProperty$1 = Object.defineProperty,
    getOwnPropertyNames = Object.getOwnPropertyNames,
    _Object$getOwnPropert = Object.getOwnPropertySymbols,
    getOwnPropertySymbols = _Object$getOwnPropert === undefined ? function () {
  return [];
} : _Object$getOwnPropert,
    getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor,
    getPrototypeOf = Object.getPrototypeOf,
    objectPrototype = Object.prototype;
var arrayPrototype = Array.prototype;

function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
  if (typeof sourceComponent !== 'string') {
    // don't hoist over string (html) components
    var inheritedComponent = getPrototypeOf(sourceComponent);

    if (inheritedComponent && inheritedComponent !== objectPrototype) {
      hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
    }

    var keys = arrayPrototype.concat(getOwnPropertyNames(sourceComponent), // $FlowFixMe
    getOwnPropertySymbols(sourceComponent));
    var targetStatics = TYPE_STATICS[targetComponent.$$typeof] || REACT_STATICS;
    var sourceStatics = TYPE_STATICS[sourceComponent.$$typeof] || REACT_STATICS;
    var i = keys.length;
    var descriptor = void 0;
    var key = void 0; // eslint-disable-next-line no-plusplus

    while (i--) {
      key = keys[i];

      if ( // $FlowFixMe
      !KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && // $FlowFixMe
      !(targetStatics && targetStatics[key])) {
        descriptor = getOwnPropertyDescriptor(sourceComponent, key);

        if (descriptor) {
          try {
            // Avoid failures from read-only properties
            defineProperty$1(targetComponent, key, descriptor);
          } catch (e) {
            /* fail silently */
          }
        }
      }
    }

    return targetComponent;
  }

  return targetComponent;
} // 


function isDerivedReactComponent(fn) {
  return !!(fn && fn.prototype && fn.prototype.isReactComponent);
} // 
// Helper to call a given function, only once


var once = function once(cb) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      cb.apply(undefined, arguments);
    }
  };
}; // 


var ThemeContext = Object(react__WEBPACK_IMPORTED_MODULE_2__["createContext"])();
var ThemeConsumer = ThemeContext.Consumer;
/**
 * Provide a theme to an entire react component tree via context
 */

var ThemeProvider = function (_Component) {
  inherits(ThemeProvider, _Component);

  function ThemeProvider(props) {
    classCallCheck(this, ThemeProvider);

    var _this = possibleConstructorReturn(this, _Component.call(this, props));

    _this.getContext = Object(memoize_one__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])(_this.getContext.bind(_this));
    _this.renderInner = _this.renderInner.bind(_this);
    return _this;
  }

  ThemeProvider.prototype.render = function render() {
    if (!this.props.children) return null;
    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(ThemeContext.Consumer, null, this.renderInner);
  };

  ThemeProvider.prototype.renderInner = function renderInner(outerTheme) {
    var context = this.getContext(this.props.theme, outerTheme);
    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(ThemeContext.Provider, {
      value: context
    }, this.props.children);
  };
  /**
   * Get the theme from the props, supporting both (outerTheme) => {}
   * as well as object notation
   */


  ThemeProvider.prototype.getTheme = function getTheme(theme, outerTheme) {
    if (isFunction(theme)) {
      var mergedTheme = theme(outerTheme);

      if (false) {}

      return mergedTheme;
    }

    if (theme === null || Array.isArray(theme) || (typeof theme === 'undefined' ? 'undefined' : _typeof(theme)) !== 'object') {
      throw new StyledComponentsError(8);
    }

    return _extends({}, outerTheme, theme);
  };

  ThemeProvider.prototype.getContext = function getContext(theme, outerTheme) {
    return this.getTheme(theme, outerTheme);
  };

  return ThemeProvider;
}(react__WEBPACK_IMPORTED_MODULE_2__["Component"]); // 


var CLOSING_TAG_R = /^\s*<\/[a-z]/i;

var ServerStyleSheet = function () {
  function ServerStyleSheet() {
    classCallCheck(this, ServerStyleSheet);
    /* The master sheet might be reset, so keep a reference here */

    this.masterSheet = StyleSheet.master;
    this.instance = this.masterSheet.clone();
    this.sealed = false;
  }
  /**
   * Mark the ServerStyleSheet as being fully emitted and manually GC it from the
   * StyleSheet singleton.
   */


  ServerStyleSheet.prototype.seal = function seal() {
    if (!this.sealed) {
      /* Remove sealed StyleSheets from the master sheet */
      var index = this.masterSheet.clones.indexOf(this.instance);
      this.masterSheet.clones.splice(index, 1);
      this.sealed = true;
    }
  };

  ServerStyleSheet.prototype.collectStyles = function collectStyles(children) {
    if (this.sealed) {
      throw new StyledComponentsError(2);
    }

    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(StyleSheetManager, {
      sheet: this.instance
    }, children);
  };

  ServerStyleSheet.prototype.getStyleTags = function getStyleTags() {
    this.seal();
    return this.instance.toHTML();
  };

  ServerStyleSheet.prototype.getStyleElement = function getStyleElement() {
    this.seal();
    return this.instance.toReactElements();
  };

  ServerStyleSheet.prototype.interleaveWithNodeStream = function interleaveWithNodeStream(readableStream) {
    var _this = this;

    {
      throw new StyledComponentsError(3);
    }
    /* the tag index keeps track of which tags have already been emitted */

    var instance = this.instance;
    var instanceTagIndex = 0;
    var streamAttr = SC_STREAM_ATTR + '="true"';
    var transformer = new stream.Transform({
      transform: function appendStyleChunks(chunk,
      /* encoding */
      _, callback) {
        var tags = instance.tags;
        var html = '';
        /* retrieve html for each new style tag */

        for (; instanceTagIndex < tags.length; instanceTagIndex += 1) {
          var tag = tags[instanceTagIndex];
          html += tag.toHTML(streamAttr);
        }
        /* force our StyleSheets to emit entirely new tags */


        instance.sealAllTags();
        var renderedHtml = chunk.toString();
        /* prepend style html to chunk, unless the start of the chunk is a closing tag in which case append right after that */

        if (CLOSING_TAG_R.test(renderedHtml)) {
          var endOfClosingTag = renderedHtml.indexOf('>');
          this.push(renderedHtml.slice(0, endOfClosingTag + 1) + html + renderedHtml.slice(endOfClosingTag + 1));
        } else this.push(html + renderedHtml);

        callback();
      }
    });
    readableStream.on('end', function () {
      return _this.seal();
    });
    readableStream.on('error', function (err) {
      _this.seal(); // forward the error to the transform stream


      transformer.emit('error', err);
    });
    return readableStream.pipe(transformer);
  };

  return ServerStyleSheet;
}(); // 


var StyleSheetContext = Object(react__WEBPACK_IMPORTED_MODULE_2__["createContext"])();
var StyleSheetConsumer = StyleSheetContext.Consumer;

var StyleSheetManager = function (_Component) {
  inherits(StyleSheetManager, _Component);

  function StyleSheetManager(props) {
    classCallCheck(this, StyleSheetManager);

    var _this = possibleConstructorReturn(this, _Component.call(this, props));

    _this.getContext = Object(memoize_one__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])(_this.getContext);
    return _this;
  }

  StyleSheetManager.prototype.getContext = function getContext(sheet, target) {
    if (sheet) {
      return sheet;
    } else if (target) {
      return new StyleSheet(target);
    } else {
      throw new StyledComponentsError(4);
    }
  };

  StyleSheetManager.prototype.render = function render() {
    var _props = this.props,
        children = _props.children,
        sheet = _props.sheet,
        target = _props.target;
    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(StyleSheetContext.Provider, {
      value: this.getContext(sheet, target)
    },  false ? undefined : children);
  };

  return StyleSheetManager;
}(react__WEBPACK_IMPORTED_MODULE_2__["Component"]);

 false ? undefined : void 0; // 

var identifiers = {};
/* We depend on components having unique IDs */

function generateId(_ComponentStyle, _displayName, parentComponentId) {
  var displayName = typeof _displayName !== 'string' ? 'sc' : escape(_displayName);
  /**
   * This ensures uniqueness if two components happen to share
   * the same displayName.
   */

  var nr = (identifiers[displayName] || 0) + 1;
  identifiers[displayName] = nr;

  var componentId = displayName + '-' + _ComponentStyle.generateName(displayName + nr);

  return parentComponentId ? parentComponentId + '-' + componentId : componentId;
} // $FlowFixMe


var StyledComponent = function (_Component) {
  inherits(StyledComponent, _Component);

  function StyledComponent() {
    classCallCheck(this, StyledComponent);

    var _this = possibleConstructorReturn(this, _Component.call(this));

    _this.attrs = {};
    _this.renderOuter = _this.renderOuter.bind(_this);
    _this.renderInner = _this.renderInner.bind(_this);

    if (false) {}

    return _this;
  }

  StyledComponent.prototype.render = function render() {
    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(StyleSheetConsumer, null, this.renderOuter);
  };

  StyledComponent.prototype.renderOuter = function renderOuter() {
    var styleSheet = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : StyleSheet.master;
    this.styleSheet = styleSheet; // No need to subscribe a static component to theme changes, it won't change anything

    if (this.props.forwardedComponent.componentStyle.isStatic) return this.renderInner();
    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(ThemeConsumer, null, this.renderInner);
  };

  StyledComponent.prototype.renderInner = function renderInner(theme) {
    var _props$forwardedCompo = this.props.forwardedComponent,
        componentStyle = _props$forwardedCompo.componentStyle,
        defaultProps = _props$forwardedCompo.defaultProps,
        displayName = _props$forwardedCompo.displayName,
        foldedComponentIds = _props$forwardedCompo.foldedComponentIds,
        styledComponentId = _props$forwardedCompo.styledComponentId,
        target = _props$forwardedCompo.target;
    var generatedClassName = void 0;

    if (componentStyle.isStatic) {
      generatedClassName = this.generateAndInjectStyles(EMPTY_OBJECT, this.props);
    } else {
      generatedClassName = this.generateAndInjectStyles(determineTheme(this.props, theme, defaultProps) || EMPTY_OBJECT, this.props);
    }

    var elementToBeCreated = this.props.as || this.attrs.as || target;
    var isTargetTag = isTag(elementToBeCreated);
    var propsForElement = {};

    var computedProps = _extends({}, this.props, this.attrs);

    var key = void 0; // eslint-disable-next-line guard-for-in

    for (key in computedProps) {
      if (false) {}

      if (key === 'forwardedComponent' || key === 'as') {
        continue;
      } else if (key === 'forwardedRef') propsForElement.ref = computedProps[key];else if (key === 'forwardedAs') propsForElement.as = computedProps[key];else if (!isTargetTag || Object(_emotion_is_prop_valid__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"])(key)) {
        // Don't pass through non HTML tags through to HTML elements
        propsForElement[key] = computedProps[key];
      }
    }

    if (this.props.style && this.attrs.style) {
      propsForElement.style = _extends({}, this.attrs.style, this.props.style);
    }

    propsForElement.className = Array.prototype.concat(foldedComponentIds, styledComponentId, generatedClassName !== styledComponentId ? generatedClassName : null, this.props.className, this.attrs.className).filter(Boolean).join(' ');
    return Object(react__WEBPACK_IMPORTED_MODULE_2__["createElement"])(elementToBeCreated, propsForElement);
  };

  StyledComponent.prototype.buildExecutionContext = function buildExecutionContext(theme, props, attrs) {
    var _this2 = this;

    var context = _extends({}, props, {
      theme: theme
    });

    if (!attrs.length) return context;
    this.attrs = {};
    attrs.forEach(function (attrDef) {
      var resolvedAttrDef = attrDef;
      var attrDefWasFn = false;
      var attr = void 0;
      var key = void 0;

      if (isFunction(resolvedAttrDef)) {
        // $FlowFixMe
        resolvedAttrDef = resolvedAttrDef(context);
        attrDefWasFn = true;
      }
      /* eslint-disable guard-for-in */
      // $FlowFixMe


      for (key in resolvedAttrDef) {
        attr = resolvedAttrDef[key];

        if (!attrDefWasFn) {
          if (isFunction(attr) && !isDerivedReactComponent(attr) && !isStyledComponent(attr)) {
            if (false) {}

            attr = attr(context);

            if (false) {}
          }
        }

        _this2.attrs[key] = attr;
        context[key] = attr;
      }
      /* eslint-enable */

    });
    return context;
  };

  StyledComponent.prototype.generateAndInjectStyles = function generateAndInjectStyles(theme, props) {
    var _props$forwardedCompo2 = props.forwardedComponent,
        attrs = _props$forwardedCompo2.attrs,
        componentStyle = _props$forwardedCompo2.componentStyle,
        warnTooManyClasses = _props$forwardedCompo2.warnTooManyClasses; // statically styled-components don't need to build an execution context object,
    // and shouldn't be increasing the number of class names

    if (componentStyle.isStatic && !attrs.length) {
      return componentStyle.generateAndInjectStyles(EMPTY_OBJECT, this.styleSheet);
    }

    var className = componentStyle.generateAndInjectStyles(this.buildExecutionContext(theme, props, attrs), this.styleSheet);
    if (false) {}
    return className;
  };

  return StyledComponent;
}(react__WEBPACK_IMPORTED_MODULE_2__["Component"]);

function createStyledComponent(target, options, rules) {
  var isTargetStyledComp = isStyledComponent(target);
  var isClass = !isTag(target);
  var _options$displayName = options.displayName,
      displayName = _options$displayName === undefined ? generateDisplayName(target) : _options$displayName,
      _options$componentId = options.componentId,
      componentId = _options$componentId === undefined ? generateId(ComponentStyle, options.displayName, options.parentComponentId) : _options$componentId,
      _options$ParentCompon = options.ParentComponent,
      ParentComponent = _options$ParentCompon === undefined ? StyledComponent : _options$ParentCompon,
      _options$attrs = options.attrs,
      attrs = _options$attrs === undefined ? EMPTY_ARRAY : _options$attrs;
  var styledComponentId = options.displayName && options.componentId ? escape(options.displayName) + '-' + options.componentId : options.componentId || componentId; // fold the underlying StyledComponent attrs up (implicit extend)

  var finalAttrs = // $FlowFixMe
  isTargetStyledComp && target.attrs ? Array.prototype.concat(target.attrs, attrs).filter(Boolean) : attrs;
  var componentStyle = new ComponentStyle(isTargetStyledComp ? // fold the underlying StyledComponent rules up (implicit extend)
  // $FlowFixMe
  target.componentStyle.rules.concat(rules) : rules, finalAttrs, styledComponentId);
  /**
   * forwardRef creates a new interim component, which we'll take advantage of
   * instead of extending ParentComponent to create _another_ interim class
   */

  var WrappedStyledComponent = void 0;

  var forwardRef = function forwardRef(props, ref) {
    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(ParentComponent, _extends({}, props, {
      forwardedComponent: WrappedStyledComponent,
      forwardedRef: ref
    }));
  };

  forwardRef.displayName = displayName;
  WrappedStyledComponent = react__WEBPACK_IMPORTED_MODULE_2___default.a.forwardRef(forwardRef);
  WrappedStyledComponent.displayName = displayName; // $FlowFixMe

  WrappedStyledComponent.attrs = finalAttrs; // $FlowFixMe

  WrappedStyledComponent.componentStyle = componentStyle; // $FlowFixMe

  WrappedStyledComponent.foldedComponentIds = isTargetStyledComp ? // $FlowFixMe
  Array.prototype.concat(target.foldedComponentIds, target.styledComponentId) : EMPTY_ARRAY; // $FlowFixMe

  WrappedStyledComponent.styledComponentId = styledComponentId; // fold the underlying StyledComponent target up since we folded the styles
  // $FlowFixMe

  WrappedStyledComponent.target = isTargetStyledComp ? target.target : target; // $FlowFixMe

  WrappedStyledComponent.withComponent = function withComponent(tag) {
    var previousComponentId = options.componentId,
        optionsToCopy = objectWithoutProperties(options, ['componentId']);
    var newComponentId = previousComponentId && previousComponentId + '-' + (isTag(tag) ? tag : escape(getComponentName(tag)));

    var newOptions = _extends({}, optionsToCopy, {
      attrs: finalAttrs,
      componentId: newComponentId,
      ParentComponent: ParentComponent
    });

    return createStyledComponent(tag, newOptions, rules);
  }; // $FlowFixMe


  Object.defineProperty(WrappedStyledComponent, 'defaultProps', {
    get: function get$$1() {
      return this._foldedDefaultProps;
    },
    set: function set$$1(obj) {
      // $FlowFixMe
      this._foldedDefaultProps = isTargetStyledComp ? Object(merge_anything__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"])(target.defaultProps, obj) : obj;
    }
  });

  if (false) {} // $FlowFixMe


  WrappedStyledComponent.toString = function () {
    return '.' + WrappedStyledComponent.styledComponentId;
  };

  if (isClass) {
    hoistNonReactStatics(WrappedStyledComponent, target, {
      // all SC-specific things should not be hoisted
      attrs: true,
      componentStyle: true,
      displayName: true,
      foldedComponentIds: true,
      styledComponentId: true,
      target: true,
      withComponent: true
    });
  }

  return WrappedStyledComponent;
} // 
// Thanks to ReactDOMFactories for this handy list!


var domElements = ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'big', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'marquee', 'menu', 'menuitem', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr', // SVG
'circle', 'clipPath', 'defs', 'ellipse', 'foreignObject', 'g', 'image', 'line', 'linearGradient', 'marker', 'mask', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'stop', 'svg', 'text', 'tspan']; // 

var styled = function styled(tag) {
  return constructWithOptions(createStyledComponent, tag);
}; // Shorthands for all valid HTML Elements


domElements.forEach(function (domElement) {
  styled[domElement] = styled(domElement);
}); // 

var GlobalStyle = function () {
  function GlobalStyle(rules, componentId) {
    classCallCheck(this, GlobalStyle);
    this.rules = rules;
    this.componentId = componentId;
    this.isStatic = isStaticRules(rules, EMPTY_ARRAY);

    if (!StyleSheet.master.hasId(componentId)) {
      StyleSheet.master.deferredInject(componentId, []);
    }
  }

  GlobalStyle.prototype.createStyles = function createStyles(executionContext, styleSheet) {
    var flatCSS = flatten(this.rules, executionContext, styleSheet);
    var css = stringifyRules(flatCSS, '');
    styleSheet.inject(this.componentId, css);
  };

  GlobalStyle.prototype.removeStyles = function removeStyles(styleSheet) {
    var componentId = this.componentId;

    if (styleSheet.hasId(componentId)) {
      styleSheet.remove(componentId);
    }
  }; // TODO: overwrite in-place instead of remove+create?


  GlobalStyle.prototype.renderStyles = function renderStyles(executionContext, styleSheet) {
    this.removeStyles(styleSheet);
    this.createStyles(executionContext, styleSheet);
  };

  return GlobalStyle;
}(); // 
// place our cache into shared context so it'll persist between HMRs


if (IS_BROWSER) {
  window.scCGSHMRCache = {};
}

function createGlobalStyle(strings) {
  for (var _len = arguments.length, interpolations = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    interpolations[_key - 1] = arguments[_key];
  }

  var rules = css.apply(undefined, [strings].concat(interpolations));
  var id = 'sc-global-' + murmurhash(JSON.stringify(rules));
  var style = new GlobalStyle(rules, id);

  var GlobalStyleComponent = function (_React$Component) {
    inherits(GlobalStyleComponent, _React$Component);

    function GlobalStyleComponent(props) {
      classCallCheck(this, GlobalStyleComponent);

      var _this = possibleConstructorReturn(this, _React$Component.call(this, props));

      var _this$constructor = _this.constructor,
          globalStyle = _this$constructor.globalStyle,
          styledComponentId = _this$constructor.styledComponentId;

      if (IS_BROWSER) {
        window.scCGSHMRCache[styledComponentId] = (window.scCGSHMRCache[styledComponentId] || 0) + 1;
      }
      /**
       * This fixes HMR compatibility. Don't ask me why, but this combination of
       * caching the closure variables via statics and then persisting the statics in
       * state works across HMR where no other combination did. ¯\_(ツ)_/¯
       */


      _this.state = {
        globalStyle: globalStyle,
        styledComponentId: styledComponentId
      };
      return _this;
    }

    GlobalStyleComponent.prototype.componentWillUnmount = function componentWillUnmount() {
      if (window.scCGSHMRCache[this.state.styledComponentId]) {
        window.scCGSHMRCache[this.state.styledComponentId] -= 1;
      }
      /**
       * Depending on the order "render" is called this can cause the styles to be lost
       * until the next render pass of the remaining instance, which may
       * not be immediate.
       */


      if (window.scCGSHMRCache[this.state.styledComponentId] === 0) {
        this.state.globalStyle.removeStyles(this.styleSheet);
      }
    };

    GlobalStyleComponent.prototype.render = function render() {
      var _this2 = this;

      if (false) {}

      return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(StyleSheetConsumer, null, function (styleSheet) {
        _this2.styleSheet = styleSheet || StyleSheet.master;
        var globalStyle = _this2.state.globalStyle;

        if (globalStyle.isStatic) {
          globalStyle.renderStyles(STATIC_EXECUTION_CONTEXT, _this2.styleSheet);
          return null;
        } else {
          return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(ThemeConsumer, null, function (theme) {
            // $FlowFixMe
            var defaultProps = _this2.constructor.defaultProps;

            var context = _extends({}, _this2.props);

            if (typeof theme !== 'undefined') {
              context.theme = determineTheme(_this2.props, theme, defaultProps);
            }

            globalStyle.renderStyles(context, _this2.styleSheet);
            return null;
          });
        }
      });
    };

    return GlobalStyleComponent;
  }(react__WEBPACK_IMPORTED_MODULE_2___default.a.Component);

  GlobalStyleComponent.globalStyle = style;
  GlobalStyleComponent.styledComponentId = id;
  return GlobalStyleComponent;
} // 


var replaceWhitespace = function replaceWhitespace(str) {
  return str.replace(/\s|\\n/g, '');
};

function keyframes(strings) {
  /* Warning if you've used keyframes on React Native */
  if (false) {}

  for (var _len = arguments.length, interpolations = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    interpolations[_key - 1] = arguments[_key];
  }

  var rules = css.apply(undefined, [strings].concat(interpolations));
  var name = generateAlphabeticName(murmurhash(replaceWhitespace(JSON.stringify(rules))));
  return new Keyframes(name, stringifyRules(rules, name, '@keyframes'));
} // 


var withTheme = function withTheme(Component$$1) {
  var WithTheme = react__WEBPACK_IMPORTED_MODULE_2___default.a.forwardRef(function (props, ref) {
    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(ThemeConsumer, null, function (theme) {
      // $FlowFixMe
      var defaultProps = Component$$1.defaultProps;
      var themeProp = determineTheme(props, theme, defaultProps);

      if (false) {}

      return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Component$$1, _extends({}, props, {
        theme: themeProp,
        ref: ref
      }));
    });
  });
  hoistNonReactStatics(WithTheme, Component$$1);
  WithTheme.displayName = 'WithTheme(' + getComponentName(Component$$1) + ')';
  return WithTheme;
}; // 

/* eslint-disable */


var __DO_NOT_USE_OR_YOU_WILL_BE_HAUNTED_BY_SPOOKY_GHOSTS = {
  StyleSheet: StyleSheet
}; // 

/* Warning if you've imported this file on React Native */

if (false) {}
/* Warning if there are several instances of styled-components */


if (false) {} //


/* harmony default export */ __webpack_exports__["c"] = (styled);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("8oxB")))

/***/ }),

/***/ "yLpj":
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ })

}]);
//# sourceMappingURL=commons-296b3894477ec6f8c793.js.map