// pull from Next as a module
const isString = (val) => {
  return (typeof val === "string") || ((!!val && typeof val === "object") && Object.prototype.toString.call(val) === "[object String]");
};

/**
 * DOM related functions
 */
class Dom {
  constructor() {
  };

  /**
   * Gets the height of the browser viewport
   * @returns {number} The height of the viewport
   * @static
   */
  static getViewportHeight() {
    return window.innerHeight;
  };
  /**
   * Gets the width of the browser viewport
   * @returns {number} The width of the viewport
   * @static
   */
  static getViewportWidth() {
    return window.innerWidth;
  };
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
      value = (value) ? value : "";
      const myEl = this.selector(el);
      if (myEl && (myEl.nodeType === 1) && (myEl.nodeName === "select" || myEl.nodeName === "SELECT")) {
        // Select box
        //_logger.debug("Select box (not supported) set to - " + value);
      } else if (myEl && (myEl.nodeType === 1) &&
          (myEl.nodeName === "input" || myEl.nodeName === "INPUT" ||
          myEl.nodeName === "textarea" || myEl.nodeName === "TEXTAREA")) {
        myEl.value = value;
      } else if (myEl && (myEl.nodeType === 1)) {
        if (onlyText){
          myEl.innerText = value;
        } else {
          myEl.innerHTML = value;
        }
      }
      return myEl;
    }
    return null;
  };
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
      if (myEl && (myEl.nodeType === 1) &&
          (myEl.nodeName === "input" || myEl.nodeName === "INPUT" ||
          myEl.nodeName === "textarea" || myEl.nodeName === "TEXTAREA" ||
          myEl.nodeName === "select" || myEl.nodeName === "SELECT")) {
        return myEl.value;
      } else if (myEl && (myEl.nodeType === 1)) {
        return myEl.innerHTML;
      }
    }
    return null;
  };
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
  };
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
  };
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
  };
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
  };
  /**
   * Shows an element
   * @param {Node} el Element or string of element selector
   * @param {string} display Value to set for 'display' property (optional)
   * @static
   */
  static show(el, display) {
    const myEl = this.selector(el);
    if (myEl) {
      myEl.style.display = (display) ? display : "block";
      myEl.style.visibility = "visible";
    }
    return myEl;
  };
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
  };
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
  };
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
  };
  /**
   * Empty a element container
   * @param {Node} el Element or string of element selector
   * @static
   */
  static empty(el) {
    this.setValue(el, "", false);
    return el;
  };
  /**
   * injectTemplate method - Injects a template element at a mount point
   * @param {string} template The template selector
   * @param {Node} mount The mount point as Document.Element or String
   * @static
   */
  static injectTemplate(template, mount) {
    const t = this.selector(template), el = this.selector(mount);
    if (t && el) {
      const clone = document.importNode(t.content, true);
      el.appendChild(clone);
    }
    return el;
  };
};

export default Dom;
