!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("presentation-dom",[],t):"object"==typeof exports?exports["presentation-dom"]=t():e["presentation-dom"]=t()}(this,function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/dist/",n(n.s=0)}([function(e,t,n){"use strict";var r=function(e){return e&&e.__esModule?e:{default:e}}(n(1));const o=r.default.query;e.exports=r.default,e.exports.$=o},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=e=>"string"==typeof e||!!e&&"object"==typeof e&&"[object String]"===Object.prototype.toString.call(e);class o{constructor(){}static getViewportHeight(){return window.innerHeight}static getViewportWidth(){return window.innerWidth}static setValue(e,t,n){if(e){t=t||"";const r=this.selector(e);return(!r||1!==r.nodeType||"select"!==r.nodeName&&"SELECT"!==r.nodeName)&&(!r||1!==r.nodeType||"input"!==r.nodeName&&"INPUT"!==r.nodeName&&"textarea"!==r.nodeName&&"TEXTAREA"!==r.nodeName?r&&1===r.nodeType&&(n?r.innerText=t:r.innerHTML=t):r.value=t),r}return null}static getValue(e){if(e){const t=this.selector(e);if(t&&1===t.nodeType&&("input"===t.nodeName||"INPUT"===t.nodeName||"textarea"===t.nodeName||"TEXTAREA"===t.nodeName||"select"===t.nodeName||"SELECT"===t.nodeName))return t.value;if(t&&1===t.nodeType)return t.innerHTML}return null}static selector(e){return e?r(e)?document.querySelector(e):e:null}static selectors(e){return e?r(e)?document.querySelectorAll(e):e:null}static query(e,t){if(e){let n=document;t&&(n=o.selector(t));const s=r(e)?n.querySelectorAll(e):e;return 1===s.length?s[0]:s}return null}static hide(e){const t=this.selector(e);return t&&(t.style.display="none",t.style.visibility="hidden"),t}static show(e,t){const n=this.selector(e);return n&&(n.style.display=t||"block",n.style.visibility="visible"),n}static setClass(e,t){const n=this.selector(e);return n&&n.setAttribute("class",t),n}static addClass(e,t){const n=this.selector(e);return n&&n.classList.add(t),n}static removeClass(e,t){const n=this.selector(e);return n&&n.classList.remove(t),n}static replaceClass(e,t,n){const r=this.selector(e);return r&&r.classList.replace(t,n),r}static containsClass(e,t){const n=this.selector(e);return!!n&&n.classList.contains(t)}static empty(e){return this.setValue(e,"",!1),e}static injectTemplate(e,t){const n=this.selector(e),r=this.selector(t);if(n&&r){const e=document.importNode(n.content,!0);r.appendChild(e)}return r}}t.default=o}])});
//# sourceMappingURL=presentation-dom.js.map