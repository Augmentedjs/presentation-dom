import Dom from "./dom.js";

/**
 * Augmented jQuery-like selectors usinge native selectors</br/>
 * Will return a nodelist for all selections unless only one is found.
 * @method $
 * @borrows Dom.query
 * @example
 * $("#myElement");
 * $("section#main header");
 *   - or start from Element:
 * $("header", mainSectionEl);
 */
const $ = Dom.query;

module.exports = Dom;
module.exports.$ = $;
