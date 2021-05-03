/* tez.js | Created By Harsh Singh | MIT License */

const doc = document;

export const qs = (sel, ctx = doc) => ctx.querySelector(sel);

export const qsa = (sel, ctx = doc) => ctx.querySelectorAll(sel);

export const style = (el, obj) => Object.assign(el.style, obj);

export const attr = (el, name, val) => {

  if(typeof val === 'undefined') {
    
    return el.getAttribute(name);
  
  }

  el.setAttribute(name, val);

};

export const on = (el, evt, hand) => el.addEventListener(evt, hand, false);

export const off = (el, evt, hand) => el.removeEventListener(evt, hand, false);

export const ready = app => {

  if (/complete|loaded|interactive/.test(doc.readyState) && doc.body) {

    setTimeout(app, 1);

  } else {

    on(doc, 'DOMContentLoaded', app);

  }

};
