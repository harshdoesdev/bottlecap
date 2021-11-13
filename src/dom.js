/* tejas.js | tejas.js Contributors | MIT License */

const doc = document;
const selectorRegex = /([.#])/;
const ns = 'http://www.w3.org/2000/svg';

const parseSelector = selector => {
  const tokens = selector.split(selectorRegex);
  let id = '', className = '';

  for (let i = 1; i < tokens.length; i += 2) {
    switch (tokens[i]) {
      case '.':
        className += ` ${tokens[i + 1]}`;
        break;
      case '#':
        id = tokens[i + 1];
    }
  }

  return {
    tag: tokens[0] || 'div',
    className: className.trim(),
    id
  };
};

/**
 * Create a new DOM element
 * @param {string} selector - CSS style selector
 * @param {boolean} isSvg - if true, create a SVG element
 */
export const el = (selector, isSvg = false) => {
  const { tag, id, className } = parseSelector(selector);
  const element = isSvg ? doc.createElementNS(ns, tag) : doc.createElement(tag);

  if (id) 
    element.id = id;

  if (className) {
    if (isSvg) {
      attr(element, 'class', className);
    } else {
      element.className = className;
    }
  }

  return element;
};

/**
 * Create a new document fragment.
 */
export const frag = () => doc.createDocumentFragment();

/**
 * Wrapper to querySelector.
 * @param {string | string[]} selectors - parameter to ctx.querySelector
 * @param {} ctx - default to document
 */
export const qs = (selectors, ctx = doc) => ctx.querySelector(selectors);

/**
 * Wrapper to querySelectorAll.
 * @param {string | string[]} selectors - parameter to ctx.querySelector
 * @param {} ctx - default to document
 */
export const qsa = (selectors, ctx = doc) => ctx.querySelectorAll(selectors);

/**
 * Set style of an element.
 * @param {HTMLElement} element - element whose style should be set
 * @param {CSSStyleDeclaration} styleObj
 */
export const style = (element, styleObj) => Object.assign(element.style, styleObj);

export const attr = (element, attributeName, value) => {
  if (value === undefined)
    return element.getAttribute(attributeName);
  
  if (value === false) {
    element.removeAttribute(attributeName);
  } else {
    element.setAttribute(attributeName, value);
  }
};

/**
 * Setup an event listener.
 * @param {HTMLElement} element
 * @param {string} type - event type
 * @param {function} handler - event handler
 */
export const on = (element, type, handler) => element.addEventListener(type, handler, false);

/**
 * Unset an event listener.
 * @param {HTMLElement} element
 * @param {string} type - event type
 * @param {function} handler - event handler
 */
export const off = (element, type, handler) => element.removeEventListener(type, handler, false);

/**
 * Check if the context is ready and call app.
 * @param {function} app - called when context is ready.
 */
export const ready = app => {
  if (/complete|loaded|interactive/.test(doc.readyState) && doc.body) {
    setTimeout(app, 1);
  } else {
    on(doc, 'DOMContentLoaded', app);
  }
};
