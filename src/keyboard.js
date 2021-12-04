import { on } from './dom.js';
import { Vec2 } from './math.js';

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
  W: 'w',
  A: 'a',
  S: 's',
  D: 'd',
  E: 'e',
  X: 'x',
  Z: 'z'
};

const KEYSTATE = {};

/*
 * check if a key is down
 * @param {} key
 */

export const keyDown = key => !!KEYSTATE[key];

/*
 * get direction for movement of player
 * @return {direction} {x, y}
 * example:
 * update(dt) {
 *    const direction = getDirection();
 *    player.x += direction.x * player.speed;
 *    player.y += direction.y * player.speed;
 * }
 */

export const getDirection = () => {
  
  const DIRECTION = Vec2.create();
  
  if(keyDown(KEYS.LEFT) || keyDown(KEYS.A))
    DIRECTION.x = -1
  else if(keyDown(KEYS.RIGHT) || keyDown(KEYS.D))
    DIRECTION.x = 1;
  
  if(keyDown(KEYS.UP) || keyDown(KEYS.W)) 
    DIRECTION.y = -1;
  else if(keyDown(KEYS.DOWN) || keyDown(KEYS.S))
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
