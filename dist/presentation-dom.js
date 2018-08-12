(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("presentation-dom", [], factory);
	else if(typeof exports === 'object')
		exports["presentation-dom"] = factory();
	else
		root["presentation-dom"] = factory();
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
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// pull from Next as a module
const isString = val => {
  return typeof val === "string" || !!val && typeof val === "object" && Object.prototype.toString.call(val) === "[object String]";
};

/**
 * DOM related functions
 */
class Dom {
  constructor() {}

  /**
   * Gets the height of the browser viewport
   * @returns {number} The height of the viewport
   * @static
   */
  static getViewportHeight() {
    return window.innerHeight;
  }
  /**
   * Gets the width of the browser viewport
   * @returns {number} The width of the viewport
   * @static
   */
  static getViewportWidth() {
    return window.innerWidth;
  }
  /**
   * Sets the value of an element<br/>
   * Will detect the correct method to do so by element type
   * @param {Node} el Element or string of element selector
   * @param {string} value Value to set (or HTML)
   * @param {boolean} onlyText Value will set as text only
   * @static
   */
  static setValue(el, value, onlyText) {
    if (el) {
      value = value ? value : "";
      const myEl = this.selector(el);
      if (myEl && myEl.nodeType === 1 && (myEl.nodeName === "select" || myEl.nodeName === "SELECT")) {
        // Select box
        //_logger.debug("Select box (not supported) set to - " + value);
      } else if (myEl && myEl.nodeType === 1 && (myEl.nodeName === "input" || myEl.nodeName === "INPUT" || myEl.nodeName === "textarea" || myEl.nodeName === "TEXTAREA")) {
        myEl.value = value;
      } else if (myEl && myEl.nodeType === 1) {
        if (onlyText) {
          myEl.innerText = value;
        } else {
          myEl.innerHTML = value;
        }
      }
      return myEl;
    }
    return null;
  }
  /**
   * Gets the value of an element<br/>
   * Will detect the correct method to do so by element type
   * @param {Node} el Element or string of element selector
   * @returns {string} Returns the value of the element (or HTML)
   * @static
   */
  static getValue(el) {
    if (el) {
      const myEl = this.selector(el);
      if (myEl && myEl.nodeType === 1 && (myEl.nodeName === "input" || myEl.nodeName === "INPUT" || myEl.nodeName === "textarea" || myEl.nodeName === "TEXTAREA" || myEl.nodeName === "select" || myEl.nodeName === "SELECT")) {
        return myEl.value;
      } else if (myEl && myEl.nodeType === 1) {
        return myEl.innerHTML;
      }
    }
    return null;
  }
  /**
   * Selector function<br/>
   * Supports full query selection
   * @param {string} query Element or string of element selector
   * @returns {Node} Returns the element (or first of type)
   * @static
   */
  static selector(query) {
    if (query) {
      return isString(query) ? document.querySelector(query) : query;
    }
    return null;
  }
  /**
   * Selectors function<br/>
   * Supports full query selection
   * @param {string} query Element or string of element selector
   * @returns {NodeList} Returns all the nodes selected
   * @static
   */
  static selectors(query) {
    if (query) {
      return isString(query) ? document.querySelectorAll(query) : query;
    }
    return null;
  }
  /**
   * Query function<br/>
   * Supports full query selection but acts like jQuery
   * @param {string} query Element or string of element selector
   * @param {Node} el Element to start from (optional)
   * @returns {NodeList|Node} Returns all the nodes selected
   * @static
   */
  static query(query, el) {
    if (query) {
      let d = document;
      if (el) {
        d = Dom.selector(el);
      }
      const nodelist = isString(query) ? d.querySelectorAll(query) : query;

      if (nodelist.length === 1) {
        return nodelist[0];
      }
      return nodelist;
    }
    return null;
  }
  /**
   * Hides an element
   * @param {Node} el Element or string of element selector
   * @static
   */
  static hide(el) {
    const myEl = this.selector(el);
    if (myEl) {
      myEl.style.display = "none";
      myEl.style.visibility = "hidden";
    }
    return myEl;
  }
  /**
   * Shows an element
   * @param {Node} el Element or string of element selector
   * @param {string} display Value to set for 'display' property (optional)
   * @static
   */
  static show(el, display) {
    const myEl = this.selector(el);
    if (myEl) {
      myEl.style.display = display ? display : "block";
      myEl.style.visibility = "visible";
    }
    return myEl;
  }
  /**
   * Sets the class attribute (completely)
   * @param {Node} el Element or string of element selector
   * @param {string} cls the class value
   * @static
   */
  static setClass(el, cls) {
    const myEl = this.selector(el);
    if (myEl) {
      myEl.setAttribute("class", cls);
    }
    return myEl;
  }
  /**
   * Adds a class attribute
   * @param {Node} el Element or string of element selector
   * @param {string} cls the class value
   * @static
   */
  static addClass(el, cls) {
    const myEl = this.selector(el);
    if (myEl) {
      myEl.classList.add(cls);
      //console.debug(`addClass ${cls} to ${el}`);
    }
    return myEl;
  }
  /**
   * Remove a class attribute
   * @param {Node} el Element or string of element selector
   * @param {string} cls the class value
   * @static
   */
  static removeClass(el, cls) {
    const myEl = this.selector(el);
    if (myEl) {
      myEl.classList.remove(cls);
      //console.debug(`removeClass ${cls} to ${el}`);
    }
    return myEl;
  }

  /**
   * Replace a class attribute with a new one
   * @param {Node} el Element or string of element selector
   * @param {string} oldCls the old class value
   * @param {string} newCls the new class value
   * @static
   */
  static replaceClass(el, oldCls, newCls) {
    const myEl = this.selector(el);
    if (myEl) {
      myEl.classList.replace(oldCls, newCls);
    }
    return myEl;
  }
  /**
   * Empty a element container
   * @param {Node} el Element or string of element selector
   * @static
   */
  static empty(el) {
    this.setValue(el, "", false);
    return el;
  }
  /**
   * injectTemplate method - Injects a template element at a mount point
   * @param {string} template The template selector
   * @param {Node} mount The mount point as Document.Element or String
   * @static
   */
  static injectTemplate(template, mount) {
    const t = this.selector(template),
          el = this.selector(mount);
    if (t && el) {
      const clone = document.importNode(t.content, true);
      el.appendChild(clone);
    }
    return el;
  }
};

exports.default = Dom;

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _dom = __webpack_require__(/*! ./dom.js */ "./src/dom.js");

var _dom2 = _interopRequireDefault(_dom);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Augmented jQuery-like selectors usinge native selectors</br/>
 * Will return a nodelist for all selections unless only one is found.
 * @method $
 * @borrows Dom.query
 * @example
 * $("#myElement");
 * $("section#main header");
 * - or start from Element:
 * $("header", mainSectionEl);
 */
const $ = _dom2.default.query;

module.exports = _dom2.default;
module.exports.$ = $;

/***/ })

/******/ });
});
//# sourceMappingURL=presentation-dom.js.map