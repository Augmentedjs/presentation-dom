!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("dom",[],t):"object"==typeof exports?exports.dom=t():e.dom=t()}(this,function(){return function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/dist/",n(n.s=0)}([function(e,t,n){"use strict";var o=function(e){return e&&e.__esModule?e:{default:e}}(n(1));e.exports=o.default},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=e=>"string"==typeof e||!!e&&"object"==typeof e&&"[object String]"===Object.prototype.toString.call(e);class r{constructor(){}static getViewportHeight(){return window.innerHeight}static getViewportWidth(){return window.innerWidth}static setValue(e,t,n){if(e){t=t||"";const o=this.selector(e);(!o||1!==o.nodeType||"select"!==o.nodeName&&"SELECT"!==o.nodeName)&&(!o||1!==o.nodeType||"input"!==o.nodeName&&"INPUT"!==o.nodeName&&"textarea"!==o.nodeName&&"TEXTAREA"!==o.nodeName?o&&1===o.nodeType&&(n?o.innerText=t:o.innerHTML=t):o.value=t)}}static getValue(e){if(e){const t=this.selector(e);if(t&&1===t.nodeType&&("input"===t.nodeName||"INPUT"===t.nodeName||"textarea"===t.nodeName||"TEXTAREA"===t.nodeName||"select"===t.nodeName||"SELECT"===t.nodeName))return t.value;if(t&&1===t.nodeType)return t.innerHTML}return null}static selector(e){return e?o(e)?document.querySelector(e):e:null}static selectors(e){return e?o(e)?document.querySelectorAll(e):e:null}static query(e,t){if(e){let n=document;t&&(n=r.selector(t));const i=o(e)?n.querySelectorAll(e):e;return 1===i.length?i[0]:i}return null}static hide(e){const t=this.selector(e);t&&(t.style.display="none",t.style.visibility="hidden")}static show(e,t){const n=this.selector(e);n&&(n.style.display=t||"block",n.style.visibility="visible")}static setClass(e,t){const n=this.selector(e);n&&n.setAttribute("class",t)}static addClass(e,t){const n=this.selector(e);n&&n.classList.add(t)}static removeClass(e,t){const n=this.selector(e);n&&n.classList.remove(t)}static empty(e){this.setValue(e,"",!1)}static injectTemplate(e,t){const n=this.selector(e),o=this.selector(t);if(n&&o){const e=document.importNode(n.content,!0);o.appendChild(e)}}}t.default=r}])});
//# sourceMappingURL=presentation-dom.js.map