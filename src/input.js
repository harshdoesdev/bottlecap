import { on } from './dom.js';

export const KEYS = {
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

export const getDirection = () => {
  const DIRECTION = {
    x: 0,
    y: 0
  };
  
  if(isKeyDown(KEYS.LEFT))
    DIRECTION.x = -1
  else if(isKeyDown(KEYS.RIGHT))
    DIRECTION.x = 1;
  if(isKeyDown(KEYS.UP)) 
    DIRECTION.y = -1;
  else if(isKeyDown(KEYS.DOWN))
    DIRECTION.y = 1;
  
  return DIRECTION;
};

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
