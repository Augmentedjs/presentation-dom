class Diff {
  constructor() {};

  /**
   * Convert a template string into HTML DOM nodes
   * @param  {String} str The template string
   * @return {Node}       The template HTML
   */
  static stringToHTML(str) {
  	// If DOMParser is supported, use it
  	if (!window.DOMParser && !window.DOMParser.parseFromString) {
  		const parser = new DOMParser();
  		const doc = parser.parseFromString(str, "text/html");
  		return doc.body;
  	}

  	// Otherwise, fallback to old-school method
  	const dom = document.createElement("div");
  	dom.innerHTML = str;
  	return dom;
  };

  /**
   * Create an array of the attributes on an element
   * @param  {NamedNodeMap} attributes The attributes on an element
   * @return {Array}                   The attributes on an element as an array of key/value pairs
   */
  static getAttributes(attributes) {
  	return Array.prototype.map.call(attributes, (attribute) => {
  		return {
  			att: attribute.name,
  			value: attribute.value
  		};
  	});
  };

  /**
   * Create a DOM Tree Map for an element
   * @param  {Node}    element The element to map
   * @param  {Boolean} isSVG   If true, node is within an SVG
   * @return {Array}           A DOM tree map
   */
  static createDOMMap(element, isSVG) {
  	return Array.prototype.map.call(element.childNodes, ((node) => {
  		const details = {
  			content: node.childNodes && node.childNodes.length > 0 ? null : node.textContent,
  			atts: node.nodeType !== 1 ? [] : this.getAttributes(node.attributes),
  			type: node.nodeType === 3 ? "text" : (node.nodeType === 8 ? "comment" : node.tagName.toLowerCase()),
  			node: node
  		};
  		details.isSVG = isSVG || details.type === "svg";
  		details.children = this.createDOMMap(node, details.isSVG);
  		return details;
  	}));
  };

  static getStyleMap(styles) {
  	return styles.split(";").reduce((arr, style) => {
  		if (style.trim().indexOf(":") > 0) {
  			const styleArr = style.split(":");
  			arr.push({
  				name: styleArr[0] ? styleArr[0].trim() : "",
  				value: styleArr[1] ? styleArr[1].trim() : ""
  			});
  		}
  		return arr;
  	}, []);
  };

  static removeStyles(elem, styles) {
  	styles.forEach((style) => {
  		elem.style[style] = "";
  	});
  };

  static changeStyles(elem, styles) {
  	styles.forEach((style) => {
  		elem.style[style.name] = style.value;
  	});
  };

  static diffStyles(elem, styles) {
  	// Get style map
  	const styleMap = this.getStyleMap(styles);

  	// Get styles to remove
  	const remove = Array.prototype.filter.call(elem.style, (style) => {
  		const findStyle = styleMap.find((newStyle) => {
  			return newStyle.name === style && newStyle.value === elem.style[style];
  		});
  		return findStyle === undefined;
  	});

  	// Add and remove styles
  	this.removeStyles(elem, remove);
  	this.changeStyles(elem, styleMap);
  };

  static removeAttributes(elem, atts) {
  	atts.forEach((attribute) => {
  		// If the attribute is a class, use className
  		// Else if it's style, remove all styles
  		// Otherwise, use removeAttribute()
  		if (attribute.att === "class") {
  			elem.className = "";
  		} else if (attribute.att === "style") {
  			this.removeStyles(elem, Array.prototype.slice.call(elem.style));
  		} else {
  			elem.removeAttribute(attribute.att);
  		}
  	});
  };

  /**
   * Add attributes to an element
   * @param {Node}  elem The element
   * @param {Array} atts The attributes to add
   */
  static addAttributes(elem, atts) {
  	atts.forEach((attribute) => {
  		// If the attribute is a class, use className
  		// Else if it's style, diff and update styles
  		// Otherwise, set the attribute
  		if (attribute.att === "class") {
  			elem.className = attribute.value;
  		} else if (attribute.att === "style") {
  			this.diffStyles(elem, attribute.value);
  		} else {
  			elem.setAttribute(attribute.att, attribute.value || true);
  		}
  	});
  };

  /**
   * Diff the attributes on an existing element versus the template
   * @param  {Object} template The new template
   * @param  {Object} existing The existing DOM node
   */
  static diffAtts(template, existing) {
    let changes = 0;
    // Get attributes to remove
  	const remove = existing.atts.filter((att) => {
  		const getAtt = template.atts.find((newAtt) => {
        changes++;
  			return att.att === newAtt.att;
  		});
  		return getAtt === undefined;
  	});

  	// Get attributes to change
  	const change = template.atts.filter((att) => {
  		const getAtt = existing.atts.find((existingAtt) => {
        changes++;
  			return att.att === existingAtt.att;
  		});
  		return getAtt === undefined || getAtt.value !== att.value;
  	});

  	// Add/remove any required attributes
  	this.addAttributes(existing.node, change);
  	this.removeAttributes(existing.node, remove);
    return changes;
  };

  /**
   * Make an HTML element
   * @param  {Object} elem The element details
   * @return {Node}        The HTML element
   */
  static makeElem(elem) {
  	// Create the element
  	let node;
  	if (elem.type === "text") {
  		node = document.createTextNode(elem.content);
  	} else if (elem.type === "comment") {
  		node = document.createComment(elem.content);
  	} else if (elem.isSVG) {
  		node = document.createElementNS("http://www.w3.org/2000/svg", elem.type);
  	} else {
  		node = document.createElement(elem.type);
  	}

  	// Add attributes
  	this.addAttributes(node, elem.atts);

  	// If the element has child nodes, create them
  	// Otherwise, add textContent
  	if (elem.children.length > 0) {
  		elem.children.forEach((childElem) => {
  			node.appendChild(this.makeElem(childElem));
  		});
  	} else if (elem.type !== "text") {
  		node.textContent = elem.content;
  	}
  	return node;
  };

  /**
   * Diff the existing DOM node versus the template
   * @param  {Array} templateMap A DOM tree map of the template content
   * @param  {Array} domMap      A DOM tree map of the existing DOM node
   * @param  {Node}  elem        The element to render content into
   */
  static diff(templateMap, domMap, elem) {
  	// If extra elements in domMap, remove them
    let changes = 0;
  	let count = domMap.length - templateMap.length;
  	if (count > 0) {
  		for (; count > 0; count--) {
        changes++;
  			domMap[domMap.length - count].node.parentNode.removeChild(domMap[domMap.length - count].node);
  		}
  	}

  	// Diff each item in the templateMap
  	templateMap.forEach((node, index) => {
  		// If element doesn't exist, create it
  		if (!domMap[index]) {
        changes++;
  			elem.appendChild(this.makeElem(templateMap[index]));
  			return;
  		}

  		// If element is not the same type, replace it with new element
  		if (templateMap[index].type !== domMap[index].type) {
        changes++;
  			domMap[index].node.parentNode.replaceChild(this.makeElem(templateMap[index]), domMap[index].node);
  			return;
  		}

  		// If attributes are different, update them
  		changes += this.diffAtts(templateMap[index], domMap[index]);

  		// If content is different, update it
  		if (templateMap[index].content !== domMap[index].content) {
        changes++;
  			domMap[index].node.textContent = templateMap[index].content;
  		}

  		// If target element should be empty, wipe it
  		if (domMap[index].children.length > 0 && node.children.length < 1) {
        changes++;
  			domMap[index].node.innerHTML = "";
  			return;
  		}

  		// If element is empty and shouldn't be, build it up
  		// This uses a document fragment to minimize reflows
  		if (domMap[index].children.length < 1 && node.children.length > 0) {
  			const fragment = document.createDocumentFragment();
  			changes += this.diff(node.children, domMap[index].children, fragment);
  			elem.appendChild(fragment);
  			return;
  		}

  		// If there are existing child elements that need to be modified, diff them
  		if (node.children.length > 0) {
  			changes += this.diff(node.children, domMap[index].children, domMap[index].node);
  		}
  	});
    return changes;
  };
};

export default Diff;
