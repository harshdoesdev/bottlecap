import { on } from './dom.js';

export const KEYS = {
  LEFT: 'ArrowLeft',
  RIGHT: 'ArrowRight',
  UP: 'ArrowUp',
  DOWN: 'ArrowDown',
  SPACEBAR: ' ',
  ESCAPE: 'Escape',
  ENTER: 'Enter',
  CTRL: 'Control',
  TAB: 'Tab',
  ALT: 'Alt',
  W: 'W',
  A: 'A',
  S: 'S',
  D: 'D'
};

const KEYSTATE = {};

/*
 * check if a key is down
 * @param {} key
 */

export const isKeyDown = key => KEYSTATE[key];

/*
 * get direction for movement of player
 */

export const getDirection = () => {
  
  const DIRECTION = {
    x: 0,
    y: 0
  };
  
  if(isKeyDown(KEYS.LEFT) || isKeyDown(KEYS.A))
    DIRECTION.x = -1
  else if(isKeyDown(KEYS.RIGHT) || isKeyDown(KEYS.D))
    DIRECTION.x = 1;
  
  if(isKeyDown(KEYS.UP) || isKeyDown(KEYS.W)) 
    DIRECTION.y = -1;
  else if(isKeyDown(KEYS.DOWN) || isKeyDown(KEYS.S))
    DIRECTION.y = 1;
  
  return DIRECTION;

};

const handleKeyDown = e => {

  if(e.defaultPrevented)
    return;
  
  KEYSTATE[e.key] = true;
  
  e.preventDefault();

};

const handleKeyUp = e => KEYSTATE[e.key] = false;

on(window, 'keydown', handleKeyDown);
on(window, 'keyup', handleKeyUp);
