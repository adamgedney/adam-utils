(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("adam-utils", [], factory);
	else if(typeof exports === 'object')
		exports["adam-utils"] = factory();
	else
		root["adam-utils"] = factory();
})(this, function() {
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Fn Index: 
 *  array_toCSV
*/

/**
 * Format array to comma separated string
 * @param {array} array 
 */
var array_toCSV = exports.array_toCSV = function array_toCSV(array) {
  if (array.length) {
    var str = "";
    array.forEach(function (t, i) {
      if (array.length - 1 !== i) str += t + ", ";else str += t;
    });

    return str;
  } else return "N/A";
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Fn Index: 
 *  async_waitForVar
*/

/**
 * Waits for a var to be available.
 * Defaults optional timeout to 10 sec.
 * Usage:
 * async_waitForVar(() => myVarToTest, () => {
 *  // THis is the resume callback. It runs once the var is no longer undefined
 * }, 10000, 250);
 */
var async_waitForVar = exports.async_waitForVar = function async_waitForVar() {
  var tryVar = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {
    return false;
  };
  var resume = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
  var timeout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5000;
  var rate = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 250;

  var elapsedTime = 0;
  var varCheck = setInterval(function () {
    if (typeof tryVar() !== 'undefined') {
      clearInterval(varCheck);
      resume();
    } else {
      if (elapsedTime >= timeout) {
        // Resume anyway so we don't hang the interface. 
        // Let undefined be handled by the caller
        clearInterval(varCheck);
        resume();
      } else {
        elapsedTime = elapsedTime + rate;
      }
    }
  }, rate);
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Fn Index: 
 *  date_humanToUTC
 *  date_MMddYYYY
 *  date_yyyymmdd
 * date_ddMonthyyTime
 */

var date_humanToUTC = exports.date_humanToUTC = function date_humanToUTC(dt) {
  return Date.parse(dt);
};

/**
* Converts date string to MM/dd/YYYY string format
* @param dt
* @param separator
*/
var date_MMddYYYY = exports.date_MMddYYYY = function date_MMddYYYY(dt) {
  var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "/";
  //TODO clean this function up
  var date = new Date(dt);

  if (isNaN(date.getTime())) {
    date = new Date(parseInt(dt));
  }
  try {
    var day = date.getUTCDate().toString();
    var month = (date.getUTCMonth() + 1).toString();
    // Months use 0 index.

    var dateString = (month[1] ? month : '0' + month[0]) + separator + (day[1] ? day : '0' + day[0]) + separator + date.getUTCFullYear();
    //@todo fix TBD hack
    if (isNaN(Date.parse(dateString))) return "TBD";else return dateString;
  } catch (e) {
    console.log(e);
    return "TBD";
  }
};

/**
	 * Converts date string to yyyy/mm/dd string format
	 * @param dt
	 * @param separator
	 */
var date_yyyymmdd = exports.date_yyyymmdd = function date_yyyymmdd(dt) {
  var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "/";
  //TODO clean this function up
  var date = new Date(dt);

  if (isNaN(date.getTime())) {
    date = new Date(parseInt(dt));
  }

  try {
    var day = date.getUTCDate().toString();
    var month = (date.getUTCMonth() + 1).toString();
    // Months use 0 index.

    return date.getUTCFullYear() + separator + (month[1] ? month : '0' + month[0]) + separator + (day[1] ? day : '0' + day[0]);
  } catch (e) {}
};

/**
	 * Converts date string to ddMonthyyTime
	 * @param UNIX_timestamp
	 */
var date_ddMonthyyTime = exports.date_ddMonthyyTime = function date_ddMonthyyTime(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return a.getDate() + ' ' + months[a.getMonth()] + ' ' + a.getFullYear() + ' ' + a.getHours() + ':' + a.getMinutes() + ':' + a.getSeconds();
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Fn Index: 
 *  evt_listen
 *  evt_trigger
*/

/** 
 * Basic event listener hook, callback style
*/
var evt_listen = exports.evt_listen = function evt_listen(name, cb) {
  document.addEventListener(name, cb);
};

/**
 * Basic event trigger
 * @param {*} name 
 * @param {*} data 
 */
var evt_trigger = exports.evt_trigger = function evt_trigger(name) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  document.dispatchEvent(new CustomEvent(name, data));
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * Fn Index: 
 *  prefs_merge
 *  prefs_createInitial
*/

/**
 * Curried : Combines existing localStored preferences with the incoming changes
 * @param {*} lsPrefs 
 */
var prefs_merge = exports.prefs_merge = function prefs_merge(lsPrefs) {
  return function (prop, checked, viewId) {
    // Check if the view exists yet in the stored preferences
    var hasViewPref = lsPrefs.filter(function (view) {
      return view && view.view === viewId;
    }).length > 0;

    if (hasViewPref) {
      lsPrefs = lsPrefs.map(function (view) {

        // The view exists, merge props
        if (viewId === view.view) {
          var props = view.data.props || [];
          /**
           * pref.data.props[] needs to be checked if the current key is 
           * already there, then updated or else push the current key into the 
           * array & return the new prefs object 
           */
          if (_.findWhere(props, { key: prop })) {
            props = props.map(function (prefProp) {
              return prefProp.key === prop ? _extends({}, prefProp, { display: checked }) : prefProp;
            });
          } else {
            props.push({
              key: prop,
              display: checked
            });
          }
          view.data.props = props;
        }

        return view;
      });
    } else {
      // This creates the new view's props being added
      lsPrefs.push({
        view: viewId,
        data: {
          props: [{
            key: prop,
            display: checked
          }]
        }
      });
    }

    return lsPrefs;
  };
};

/**
 * Curried : Structures the initial props localstorage item
 * @param {*} selectedView 
 */
var prefs_createInitial = exports.prefs_createInitial = function prefs_createInitial(selectedView) {
  return function (prop, checked) {
    return [{
      view: selectedView.id,
      data: {
        props: selectedView.props.map(function (viewProp) {
          return viewProp.key === prop ? _extends({}, viewProp, { display: checked }) : viewProp;
        })
      }
    }];
  };
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Fn Index: 
 *  form_parse
*/

/**
 * Given a form element, its values get parsed and converted to an object.
 * @todo need to build in  dot syntax element name handling, creating multidimensional objects
 */
var form_parse = exports.form_parse = function form_parse(formClassName) {
  var form = document.querySelector("." + formClassName);
  if (!form) {
    return false;
  }

  var elements = form.elements;

  return [].reduce.call(elements, function (data, element) {
    if (element.name) {
      data[element.name] = element.value;
    }

    return data;
  }, {});
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Fn Index: 
 *  storage_getItem
 *  storage_setItem
*/

/**
 * Utility fn for getting localstorage data & try/catching it
 * getLocalStoreItem("oh.prefs.props")
 */
var storage_getItem = exports.storage_getItem = function storage_getItem(key) {
  var item = localStorage.getItem(key);

  if (item) {
    try {
      item = JSON.parse(item);
    } catch (e) {
      item = false;
    }
  }

  return item;
};

/**
 * Sets the storage item after JSON.stringifying it
 * @param {*} key 
 * @param {*} data 
 */
var storage_setItem = exports.storage_setItem = function storage_setItem(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Fn Index: 
 *  log
 *  l
*/

/** 
 * This shorthand will only log on localhost
*/
var log = exports.log = window.location.hostname === "localhost" ? console.log : function () {};

var l = exports.l = log;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Fn Index: 
 *  num_isEven
*/

var num_isEven = exports.num_isEven = function num_isEven(num) {
  return num % 2 === 0;
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Fn Index: 
 *  obj_dotToLiteral
 *  obj_deepMerge
 *  obj_createDeepFromDotNames
*/

/**
 * Return a string property accessor value to the actual object value
 * @param str
 * @param obj
 */
var obj_dotToLiteral = exports.obj_dotToLiteral = function obj_dotToLiteral(str, obj) {
  return str.split('.').reduce(function (o, i) {
    return o ? o[i] : {};
  }, obj);
};

/**
	 * Merge nested objects:
	 * Source: https://github.com/jashkenas/underscore/issues/88
	 * @param target
	 * @param source
	 * @returns {*}
	 */
var obj_deepMerge = exports.obj_deepMerge = function obj_deepMerge(target, source) {
  for (var key in source) {
    var original = target[key];
    var next = source[key];
    if (original && next && (typeof next === 'undefined' ? 'undefined' : _typeof(next)) == "object") {
      appUtils.deepMerge(original, next);
    } else {
      target[key] = next;
    }
  }
  return target;
};

/** 
 * Converts an object using dot syntax property names to a deep object.
 * Created by Maikel, 10.23.17
 * ie. 
 *  { "parent.child.grand" : "test val"} becomes
 *  {
 *    parent : {
 *      child : {
 *        grand : "test val"
 *      }
 *    }
 *  }
*/
var obj_createDeepFromDotNames = exports.obj_createDeepFromDotNames = function obj_createDeepFromDotNames(obj) {
  var finalObj = {};

  Object.keys(obj).forEach(function (key) {
    var tmpObj = finalObj;
    var lastPart = '';
    var keyParts = key.split('.');

    for (var i = 0; i < keyParts.length - 1; i++) {
      var currentPart = keyParts[i];
      if (!tmpObj[currentPart]) {
        tmpObj[currentPart] = {};
      }
      tmpObj = tmpObj[currentPart];
    }
    tmpObj[keyParts[keyParts.length - 1]] = obj[key];
  });
  return finalObj;
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Fn Index: 
 *  slug_unmake
 *  slug_make
*/

/**
 * Unmakes a slug into a capitalized, readable string
 * @param slug
 * @returns {1828|string}
 */
var slug_unmake = exports.slug_unmake = function slug_unmake(slug) {
  var s = slug.split('-'),
      capStr = '';

  // Uppercase first letter
  s.forEach(function (val) {
    capStr += val[0].toUpperCase() + val.slice(1) + ' ';
  });

  return capStr.trim();
};

/**
 * https://gist.github.com/mathewbyrne/1280286
 * @param {*} text 
 */
var slug_make = exports.slug_make = function slug_make(text) {
  return text.toString().toLowerCase().replace(/\s+/g, '-') // Replace spaces with -
  .replace(/[^\w\-]+/g, '') // Remove all non-word chars
  .replace(/\-\-+/g, '-') // Replace multiple - with single -
  .replace(/^-+/, '') // Trim - from start of text
  .replace(/-+$/, '');
}; // Trim - from end of text

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Fn Index: 
 *  speech_playMessage
 *  speech_listen
*/

var speech_playMessage = exports.speech_playMessage = function speech_playMessage() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Click the microphone icon to tell me what you\'d like to do";
  var voice = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "Tessa";

  if ('speechSynthesis' in window) {
    var msg = new SpeechSynthesisUtterance(message);
    msg.rate = 1.2;

    window.speechSynthesis.onvoiceschanged = function () {
      var voices = window.speechSynthesis.getVoices();
      // personas = ['Tessa','Moira','Fiona','Daniel','Karen','Melina','Bad News','Bells','Boing','Cellos','Good News','Pipe Organ','Whisper','Zarvox'];

      for (var i = 0; i < voices.length; i++) {
        if (voices[i].name === voice) {
          msg.voice = voice;
        }
      }

      window.speechSynthesis.speak(msg);
    };
  }
};

/**
 * When triggered it begins listening for speech commands, relaying them through the callback
 */
var speech_listen = exports.speech_listen = function speech_listen(cb) {
  if ('webkitSpeechRecognition' in window) {
    var recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.start();

    recognition.onstart = function () {
      console.log('Started speaking');
    };

    recognition.onresult = function (event) {
      var final_transcript = '';
      var interim_transcript = '';

      for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final_transcript += event.results[i][0].transcript;
        } else {
          interim_transcript += event.results[i][0].transcript;
        }
      }

      cb(interim_transcript, final_transcript);
    };
    recognition.onerror = function (event) {
      console.log('Recognition error', event);
    };
    recognition.onend = function () {
      console.log('Finished speaking');
    };
  }
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Fn Index: 
 *  string_capFirstLetter
 *  string_validate
*/

/**
 * Just captializes the first letter of a string
 * @param string
 * @returns {string}
 */
var string_capFirstLetter = exports.string_capFirstLetter = function string_capFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

/**
 * Validates a string against a regex pattern
 * @param str
 * @param regEx
 * @returns {boolean}
 */
var string_validate = exports.string_validate = function string_validate(str, regEx) {
  var patt = new RegExp(regEx);

  return patt.test(str);
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Fn Index: 
 *  url_set
 *  url_get
 *  url_makeQueryString
 *  url_writeQueryString
 *  url_clearQueryString
 *  url_readQueryString
 *  url_parseParams
 *  url_getParam
 *  url_getPageParams
 *  url_makeObjFromQueryString
 */

var url_set = exports.url_set = function url_set(path) {
  window.location.href = path;
};

var url_get = exports.url_get = function url_get() {
  return window.location.href;
};

/**
 * Makes a query string from a specifically formatted object
 *        {
 *          date : {
 *           start : 23423429898,
 *           end : 243852437598
 *          },
 *          something : 'A string of some sort',
 *        }
 * @param {*} queryObject 
 */
var url_makeQueryString = exports.url_makeQueryString = function url_makeQueryString(queryObject) {

  // Remove anything with a null value
  // Handles single values and range values
  Object.keys(queryObject).forEach(function (key) {
    return (queryObject[key] == null || queryObject[key].hasOwnProperty('start') && queryObject[key].hasOwnProperty('end') && queryObject[key].start == null && queryObject[key].end == null) && delete queryObject[key];
  });

  var queryString = _.map(queryObject, function (v, k) {
    var attribute = k,
        value = v,
        tmp_query = '';

    // Handle array values by using key name as attribute and each value separately
    if (_.isArray(value)) {
      value.forEach(function (val) {
        tmp_query = tmp_query + '&' + attribute + '=' + val;
      });
    } else if (value.hasOwnProperty('start') && value.hasOwnProperty('end')) {
      tmp_query = attribute + '--start=' + value.start + '&' + attribute + '--end=' + value.end;
    } else {
      tmp_query = attribute + '=' + value;
    }

    return tmp_query;
  }).reduce(function (sum, query) {

    //Handle missing &
    if (query.charAt(0) !== '&') {
      query = '&' + query;
    }

    // Combine query strings
    return sum + query;
  }, '');

  // Handle the ? character at the beginning of the string
  if (queryString.charAt(0) === '&') {
    queryString = queryString.replace(/^&/, '?');
  } else if (queryString.charAt(0) !== '&' || queryString.charAt(0) !== '?') {
    queryString = '?' + queryString;
  }

  return queryString;
};

/**
 * Writes the query string to the url
 * @param queryString
 * @param options
 * @private
 */
var url_writeQueryString = exports.url_writeQueryString = function url_writeQueryString(queryString) {
  // @todo add url_encode and base^4 encode and decode to the write system
  // Only allow if the config file specifies
  if (options.writeQueryStringToURL && (queryString || queryString === null)) {
    var path = window.location.href.split('?')[0].split(window.location.host)[1];

    if (queryString === null) {
      queryString = '';
    }

    var replaceURL = (path + queryString + '&' + url_getPageParams()).replace(/&+$/, "");

    if (options.clearPaginationQueryString) {
      replaceURL = path + queryString;
    }

    url_set(replaceURL);
  }
};

/**
 * Removes everything from the url
 */
var url_clearQueryString = exports.url_clearQueryString = function url_clearQueryString() {
  url_set(window.location.href.split('?')[0].split(window.location.host)[1].replace(/&+$/, ""));
};

/**
 * Reads the query string from a url
 */
var url_readQueryString = exports.url_readQueryString = function url_readQueryString() {
  return window.location.href.split('?')[1] || '';
};

/**
 * From: http://stackoverflow.com/questions/23481979/function-to-convert-url-hash-parameters-into-object-key-value-pairs
 * @param str
 * @returns {{}}
 */
var url_parseParams = exports.url_parseParams = function url_parseParams() {
  var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  var pieces = str.split("&"),
      data = {},
      i,
      parts;
  // process each query pair
  for (i = 0; i < pieces.length; i++) {
    parts = pieces[i].split("=");
    if (parts.length < 2) {
      parts.push("");
    }
    data[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
  }

  return data;
};

/**
 * Fetches 
 * @returns {string}
 */
var url_getParam = exports.url_getParam = function url_getParam(param) {
  var tmpParams = url_parseParams(url_readQueryString());
  var params = tmpParams.hasOwnProperty(param) ? tmpParams[param] : {};
  var str = '';

  for (var key in params) {
    str += key + '=' + params[key] + '&';
  }

  return url_parseParams(str.slice(0, -1))[param];
};

/**
 * Gets the pagination query params from the url to preserve them on write
 */
var url_getPageParams = exports.url_getPageParams = function url_getPageParams() {
  var skip = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "skip";
  var take = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "take";
  var page = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "page";

  var params = _.pick(url_parseParams(url_readQueryString()), [skip, take, page]);
  var str = '';

  for (var key in params) {
    str += key + '=' + params[key] + '&';
  }

  return str.slice(0, -1); // removes the last ampersand
  //return params;
};

/**
 * Converts a query string to a query object.
 * @param str
 */
var url_makeObjFromQueryString = exports.url_makeObjFromQueryString = function url_makeObjFromQueryString(str) {
  var queryString = decodeURI(str).split("&"),
      queryParams = {},
      segment = void 0,
      value = void 0,
      key = void 0;

  for (var i = 0; i < queryString.length; i++) {
    segment = queryString[i].split('=');
    key = segment[0];
    value = segment[1] && segment[1].charAt(0) === '[' ? decodeURIComponent(segment[1]) : segment[1];

    // Handle sort params nested object
    if (key && key.indexOf('sort-') > -1) {
      if (!queryParams.hasOwnProperty('sort')) {
        queryParams.sort = {};
      }

      queryParams.sort[key.split('sort-')[1]] = value;
    } else {
      //Filter params

      if (key && queryParams.hasOwnProperty(key)) {
        if (_.isArray(queryParams[key])) {
          queryParams[key].push(value); // Add the new value
        } else {
          queryParams[key] = [queryParams[key]]; // Extract the string value and transform to an array
          queryParams[key].push(value); //Add the new value
        }
      } else {
        if (key) {
          queryParams[key] = value; // First run, add the string
        }
      }
    }
  }

  return queryParams;
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _strings = __webpack_require__(12);

Object.keys(_strings).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _strings[key];
    }
  });
});

var _dates = __webpack_require__(2);

Object.keys(_dates).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _dates[key];
    }
  });
});

var _objects = __webpack_require__(9);

Object.keys(_objects).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _objects[key];
    }
  });
});

var _localstorage = __webpack_require__(6);

Object.keys(_localstorage).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _localstorage[key];
    }
  });
});

var _events = __webpack_require__(3);

Object.keys(_events).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _events[key];
    }
  });
});

var _url = __webpack_require__(13);

Object.keys(_url).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _url[key];
    }
  });
});

var _forms = __webpack_require__(5);

Object.keys(_forms).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _forms[key];
    }
  });
});

var _speech = __webpack_require__(11);

Object.keys(_speech).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _speech[key];
    }
  });
});

var _logs = __webpack_require__(7);

Object.keys(_logs).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _logs[key];
    }
  });
});

var _arrays = __webpack_require__(0);

Object.keys(_arrays).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _arrays[key];
    }
  });
});

var _slugs = __webpack_require__(10);

Object.keys(_slugs).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _slugs[key];
    }
  });
});

var _async = __webpack_require__(1);

Object.keys(_async).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _async[key];
    }
  });
});

var _numbers = __webpack_require__(8);

Object.keys(_numbers).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _numbers[key];
    }
  });
});

var _filteredlistPreferences = __webpack_require__(4);

Object.keys(_filteredlistPreferences).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _filteredlistPreferences[key];
    }
  });
});

/***/ })
/******/ ]);
});