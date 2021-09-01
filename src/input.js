import { on } from './dom.js';

const KEYBOARD = {
  LEFT: 'ArrowLeft',
  RIGHT: 'ArrowRight',
  UP: 'ArrowUp',
  DOWN: 'ArrowDown',
  SPACEBAR: ' ',
  ESCAPE: 'ESCAPE',
  ENTER: 'ENTER',
  W: 'W',
  A: 'A',
  S: 'S',
  D: 'D'
};

const KEYSTATE = {};

export const isKeyDown = key => KEYSTATE[key];

const handleKeyDown = e => {
  if(e.defaultPrevented)
    return;
  KEYSTATE[e.key] = true;
  e.preventDefault();
};

const handleKeyUp = e => {
  KEYSTATE[e.key] = false;
};

on(window, 'keydown', handleKeyDown);
on(window, 'keyup', handleKeyUp);
