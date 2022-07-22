/** @module DOM */
/* Tejas | Tejas Contributors | MIT License */
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
export const el = selector => {
    const { tag, id, className } = parseSelector(selector);
    const element = doc.createElement(tag);
    if (id)
        element.id = id;
    if (className)
        element.className = className;
    return element;
};
export const svg = selector => {
    const { tag, id, className } = parseSelector(selector);
    const element = doc.createElementNS(ns, tag);
    if (id)
        element.id = id;
    if (className)
        attr(element, 'class', className);
    return element;
};
export const frag = () => doc.createDocumentFragment();
export const text = (data = '') => doc.createTextNode(data);
export const qs = (selectors, ctx = doc) => ctx.querySelector(selectors);
export const qsa = (selectors, ctx = doc) => ctx.querySelectorAll(selectors);
export const setStyle = (element, styleObj) => Object.assign(element.style, styleObj);
export const attr = (element, attributeName, value) => {
    if (value === undefined)
        return element.getAttribute(attributeName);
    if (value === false) {
        element.removeAttribute(attributeName);
    }
    else {
        element.setAttribute(attributeName, value);
    }
};
export const on = (element, type, handler) => element.addEventListener(type, handler, false);
export const off = (element, type, handler) => element.removeEventListener(type, handler, false);
export const ready = app => {
    if (/complete|loaded|interactive/.test(doc.readyState) && doc.body) {
        setTimeout(app, 1);
    }
    else {
        on(doc, 'DOMContentLoaded', app);
    }
};
